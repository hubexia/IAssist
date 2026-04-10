import { Router } from "express";
import { createReview, getReviewsByAssistant } from "./review.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, createReview);
router.get("/:assistantId", protect, getReviewsByAssistant);

export default router;
