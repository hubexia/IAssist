import { Request, Response } from "express";
import { User } from "../auth/auth.model";
import { Assistant } from "../assistants/assistant.model";
import { Task } from "../tasks/task.model";
import { Payment } from "../payments/payment.model";
import { sendSuccess, sendError } from "../../utils/response";
import { APPROVED, REJECTED } from "../../utils/constants";

// Seed first admin then disable this route after first use
export const seedAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const existing = await User.findOne({ role: "admin" });
    if (existing) {
      sendError(res, "Admin already exists", 400);
      return;
    }

    const admin = await User.create({
      firstName: "IAssist",
      lastName: "Admin",
      email: req.body.email || "admin@iassist.com",
      passwordHash: req.body.password || "Admin1234!",
      role: "admin",
    });

    sendSuccess(
      res,
      { id: admin._id, email: admin.email },
      "Admin created successfully",
      201,
    );
  } catch (error) {
    sendError(res, "Could not create admin", 500);
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find().select("-passwordHash");
    sendSuccess(res, users, "Users fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch users", 500);
  }
};

// Get all assistants with their profiles
export const getAllAssistants = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const assistants = await Assistant.find().populate(
      "userId",
      "-passwordHash",
    );
    sendSuccess(res, assistants, "Assistants fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch assistants", 500);
  }
};

// Approve assistant
export const approveAssistant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const assistant = await Assistant.findById(req.params.id);
    if (!assistant) {
      sendError(res, "Assistant profile not found", 404);
      return;
    }

    assistant.verificationStatus = APPROVED;
    assistant.isActive = true;
    await assistant.save();

    sendSuccess(res, assistant, "Assistant approved successfully");
  } catch (error) {
    sendError(res, "Could not approve assistant", 500);
  }
};

// Reject assistant
export const rejectAssistant = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const assistant = await Assistant.findById(req.params.id);
    if (!assistant) {
      sendError(res, "Assistant profile not found", 404);
      return;
    }

    assistant.verificationStatus = REJECTED;
    assistant.isActive = false;
    await assistant.save();

    sendSuccess(res, assistant, "Assistant rejected successfully");
  } catch (error) {
    sendError(res, "Could not reject assistant", 500);
  }
};

// Get all tasks
export const getAllTasks = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const tasks = await Task.find()
      .populate("clientId", "-passwordHash")
      .populate("assignedAssistantId", "-passwordHash");
    sendSuccess(res, tasks, "Tasks fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch tasks", 500);
  }
};

// Get all payments
export const getAllPayments = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const payments = await Payment.find()
      .populate("clientId", "-passwordHash")
      .populate("assistantId", "-passwordHash")
      .populate("taskId");
    sendSuccess(res, payments, "Payments fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch payments", 500);
  }
};
