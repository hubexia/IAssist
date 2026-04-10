import { Router } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  cancelTask,
  startTask,
  completeTask,
} from "./task.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/upload.middleware";

const router = Router();

router.post(
  "/",
  protect,
  restrictTo("client"),
  upload.array("media", 5),
  createTask,
);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.delete("/:id", protect, restrictTo("client"), cancelTask);
router.patch("/:id/start", protect, restrictTo("assistant"), startTask);
router.patch("/:id/complete", protect, restrictTo("assistant"), completeTask);

export default router;
