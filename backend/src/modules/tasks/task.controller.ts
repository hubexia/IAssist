import { Response } from "express";
import { Task } from "./task.model";
import { sendSuccess, sendError } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { Assistant } from "../assistants/assistant.model";

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, offeredPrice, category, city, dueDate } = req.body;

    if (!title || !description || !offeredPrice || !category || !city) {
      sendError(res, "Title, description, category, city and price are required", 400);
      return;
    }

    const mediaUrls: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file: any) => {
        mediaUrls.push(file.path || file.secure_url);
      });
    }

    const task = await Task.create({
      clientId: req.user?.id,
      title,
      description,
      category,
      city,
      offeredPrice: Number(offeredPrice),
      dueDate,
      media: mediaUrls,
    });

    sendSuccess(res, task, "Task created successfully", 201);
  } catch (error) {
    sendError(res, "Could not create task", 500);
  }
};
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type } = req.query;
    let filter: any = {};

    if (type === "my-tasks") {
      filter = { clientId: req.user?.id };
    } else if (type === "open") {
      filter = { status: "open" };

      // If assistant, filter by their city automatically
      if (req.user?.role === "assistant") {
        const assistantProfile = await Assistant.findOne({ userId: req.user?.id });
        if (assistantProfile?.city) {
          filter.city = assistantProfile.city;
        }
      }
    }

    const tasks = await Task.find(filter).populate("clientId", "-passwordHash");
    sendSuccess(res, tasks, "Tasks fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch tasks", 500);
  }
};
export const getTaskById = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "clientId",
      "-passwordHash",
    );
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }
    sendSuccess(res, task, "Task fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch task", 500);
  }
};

export const cancelTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    if (task.clientId.toString() !== req.user?.id) {
      sendError(
        res,
        "Only the client who created this task can cancel it",
        403,
      );
      return;
    }

    if (["completed", "cancelled"].includes(task.status)) {
      sendError(res, "Task is already completed or cancelled", 400);
      return;
    }

    task.status = "cancelled";
    await task.save();

    sendSuccess(res, task, "Task cancelled successfully");
  } catch (error) {
    sendError(res, "Could not cancel task", 500);
  }
};

export const startTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    if (task.assignedAssistantId?.toString() !== req.user?.id) {
      sendError(res, "Only the assigned assistant can start this task", 403);
      return;
    }

    if (task.status !== "assigned") {
      sendError(res, "Task must be assigned before it can be started", 400);
      return;
    }

    // Check assistant is approved
    const assistantProfile = await Assistant.findOne({ userId: req.user?.id });
    if (!assistantProfile || !assistantProfile.isActive) {
      sendError(res, "Your account is not yet approved by admin", 403);
      return;
    }

    task.status = "in_progress";
    await task.save();

    sendSuccess(res, task, "Task started successfully");
  } catch (error) {
    sendError(res, "Could not start task", 500);
  }
};

export const completeTask = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    if (task.assignedAssistantId?.toString() !== req.user?.id) {
      sendError(res, "Only the assigned assistant can complete this task", 403);
      return;
    }

    if (task.status !== "in_progress") {
      sendError(
        res,
        "Task must be in progress before it can be completed",
        400,
      );
      return;
    }

    task.status = "completed";
    await task.save();

    sendSuccess(res, task, "Task marked as completed");
  } catch (error) {
    sendError(res, "Could not complete task", 500);
  }
};
