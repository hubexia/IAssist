import { Response } from "express";
import { Review } from "./review.model";
import { Task } from "../tasks/task.model";
import { Assistant } from "../assistants/assistant.model";
import { sendSuccess, sendError } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createReview = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { taskId, revieweeId, rating, comment } = req.body;

    if (!taskId || !revieweeId || !rating) {
      sendError(res, "Task ID, reviewee ID and rating are required", 400);
      return;
    }

    if (rating < 1 || rating > 5) {
      sendError(res, "Rating must be between 1 and 5", 400);
      return;
    }

    const task = await Task.findById(taskId);
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    if (task.status !== "completed") {
      sendError(
        res,
        "Task must be completed before a review can be submitted",
        400,
      );
      return;
    }

    const isClient = task.clientId.toString() === req.user?.id;
    const isAssistant = task.assignedAssistantId?.toString() === req.user?.id;

    if (!isClient && !isAssistant) {
      sendError(res, "You are not part of this task", 403);
      return;
    }

    const existingReview = await Review.findOne({
      taskId,
      reviewerId: req.user?.id,
    });
    if (existingReview) {
      sendError(res, "You have already reviewed this task", 400);
      return;
    }

    const review = await Review.create({
      taskId,
      reviewerId: req.user?.id,
      revieweeId,
      rating,
      comment,
    });

    const assistantProfile = await Assistant.findOne({ userId: revieweeId });
    if (assistantProfile) {
      const allReviews = await Review.find({ revieweeId });
      const avgRating =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
      assistantProfile.rating = Math.round(avgRating * 10) / 10;
      await assistantProfile.save();
    }

    sendSuccess(res, review, "Review submitted successfully", 201);
  } catch (error) {
    sendError(res, "Could not submit review", 500);
  }
};

export const getReviewsByAssistant = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const reviews = await Review.find({ revieweeId: req.params.assistantId })
      .populate("reviewerId", "-passwordHash")
      .populate("taskId");

    sendSuccess(res, reviews, "Reviews fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch reviews", 500);
  }
};
