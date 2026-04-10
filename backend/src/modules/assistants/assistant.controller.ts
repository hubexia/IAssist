import { Request, Response } from "express";
import { Assistant } from "./assistant.model";
import { User } from "../auth/auth.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendSuccess, sendError } from "../../utils/response";

export const getAllAssistants = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  try {
    const assistants = await Assistant.find({
      verificationStatus: "approved",
    }).populate("userId", "-passwordHash");
    sendSuccess(res, assistants, "Assistants fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch assistants", 500);
  }
};

export const getAssistantById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const assistant = await Assistant.findOne({
      userId: req.params.id,
    }).populate("userId", "-passwordHash");
    if (!assistant) {
      sendError(res, "Assistant not found", 404);
      return;
    }
    sendSuccess(res, assistant, "Assistant fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch assistant", 500);
  }
};

export const createOrUpdateAssistantProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { bio, skills, city } = req.body;
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user || user.role !== "assistant") {
      sendError(res, "Only assistants can create a profile", 403);
      return;
    }

    const profile = await Assistant.findOneAndUpdate(
      { userId },
      { bio, skills, city: city || user.city },
      { upsert: true, new: true }
    );

    sendSuccess(res, profile, "Assistant profile updated successfully");
  } catch (error) {
    sendError(res, "Could not update assistant profile", 500);
  }
};

export const toggleOnlineStatus = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const profile = await Assistant.findOne({ userId: req.user?.id });
    if (!profile) {
      sendError(res, "Assistant profile not found", 404);
      return;
    }

    profile.isOnline = !profile.isOnline;
    await profile.save();

    sendSuccess(res, { isOnline: profile.isOnline }, "Online status updated");
  } catch (error) {
    sendError(res, "Could not update status", 500);
  }
};
