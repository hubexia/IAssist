import { Router } from "express";

import {
  getAllAssistants,
  getAssistantById,
  createOrUpdateAssistantProfile,
  toggleOnlineStatus,
} from "./assistant.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/", protect, getAllAssistants);
router.post(
  "/profile",
  protect,
  restrictTo("assistant"),
  createOrUpdateAssistantProfile,
);
router.patch(
  "/status/toggle",
  protect,
  restrictTo("assistant"),
  toggleOnlineStatus,
);
router.get("/:id", protect, getAssistantById);

export default router;
