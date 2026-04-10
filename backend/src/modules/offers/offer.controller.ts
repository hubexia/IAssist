import { Response } from "express";
import { Offer } from "./offer.model";
import { Task } from "../tasks/task.model";
import { Assistant } from "../assistants/assistant.model";
import { sendSuccess, sendError } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { io } from "../../index";

export const createOffer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId, proposedPrice, message } = req.body;

    if (!taskId || !proposedPrice) {
      sendError(res, "Task ID and proposed price are required", 400);
      return;
    }

    const task = await Task.findById(taskId);
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    const assistantProfile = await Assistant.findOne({ userId: req.user?.id });
    if (!assistantProfile) {
      sendError(res, "You need to create an assistant profile first", 403);
      return;
    }
    if (!assistantProfile.isActive) {
      sendError(res, "Your account is not yet approved by admin", 403);
      return;
    }

    if (!["open", "negotiating"].includes(task.status)) {
      sendError(res, "Task is not open for offers", 400);
      return;
    }

    const existingOffer = await Offer.findOne({
      taskId,
      assistantId: req.user?.id,
      status: "pending",
    });
    if (existingOffer) {
      sendError(res, "You already have a pending offer for this task", 400);
      return;
    }

    const offer = await Offer.create({
      taskId,
      assistantId: req.user?.id,
      clientId: task.clientId,
      proposedPrice,
      message,
    });

    if (task.status === "open") {
      task.status = "negotiating";
      await task.save();
    }

    
    io.to(taskId).emit("new_offer", {
      offerId: offer._id,
      assistantId: req.user?.id,
      proposedPrice,
      message,
    });

    sendSuccess(res, offer, "Offer sent successfully", 201);
  } catch (error) {
    sendError(res, "Could not create offer", 500);
  }
};

export const getOffers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.query;
    let filter: object = {};

    if (taskId) {
      filter = { taskId };
    } else if (req.user?.role === "assistant") {
      filter = { assistantId: req.user?.id };
    } else if (req.user?.role === "client") {
      filter = { clientId: req.user?.id };
    }

    const offers = await Offer.find(filter)
      .populate("taskId")
      .populate("assistantId", "-passwordHash")
      .populate("clientId", "-passwordHash");

    sendSuccess(res, offers, "Offers fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch offers", 500);
  }
};

export const getOfferById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("taskId")
      .populate("assistantId", "-passwordHash")
      .populate("clientId", "-passwordHash");

    if (!offer) {
      sendError(res, "Offer not found", 404);
      return;
    }

    sendSuccess(res, offer, "Offer fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch offer", 500);
  }
};

export const acceptOffer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      sendError(res, "Offer not found", 404);
      return;
    }

    if (offer.clientId.toString() !== req.user?.id) {
      sendError(res, "Only the client can accept this offer", 403);
      return;
    }

    if (offer.status !== "pending") {
      sendError(res, "Offer is no longer pending", 400);
      return;
    }

    offer.status = "accepted";
    await offer.save();

    await Offer.updateMany(
      { taskId: offer.taskId, _id: { $ne: offer._id }, status: "pending" },
      { status: "rejected" }
    );

    await Task.findByIdAndUpdate(offer.taskId, {
      assignedAssistantId: offer.assistantId,
      status: "assigned",
    });

    io.to(offer.taskId.toString()).emit("offer_accepted", {
      offerId: offer._id,
      assistantId: offer.assistantId,
    });

    sendSuccess(res, offer, "Offer accepted successfully");
  } catch (error) {
    sendError(res, "Could not accept offer", 500);
  }
};

export const rejectOffer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) {
      sendError(res, "Offer not found", 404);
      return;
    }

    if (offer.clientId.toString() !== req.user?.id) {
      sendError(res, "Only the client can reject this offer", 403);
      return;
    }

    if (offer.status !== "pending") {
      sendError(res, "Offer is no longer pending", 400);
      return;
    }

    offer.status = "rejected";
    await offer.save();

    io.to(offer.taskId.toString()).emit("offer_rejected", {
      offerId: offer._id,
      assistantId: offer.assistantId,
    });

    sendSuccess(res, offer, "Offer rejected successfully");
  } catch (error) {
    sendError(res, "Could not reject offer", 500);
  }
};