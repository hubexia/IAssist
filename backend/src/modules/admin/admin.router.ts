import { Router } from "express";
import {
  seedAdmin,
  getAllUsers,
  getAllAssistants,
  approveAssistant,
  rejectAssistant,
  getAllTasks,
  getAllPayments,
} from "./admin.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = Router();

//remove after first use
router.post("/seed", seedAdmin);


router.get("/users", protect, restrictTo("admin"), getAllUsers);
router.get("/assistants", protect, restrictTo("admin"), getAllAssistants);
router.patch(
  "/assistants/:id/approve",
  protect,
  restrictTo("admin"),
  approveAssistant,
);
router.patch(
  "/assistants/:id/reject",
  protect,
  restrictTo("admin"),
  rejectAssistant,
);
router.get("/tasks", protect, restrictTo("admin"), getAllTasks);
router.get("/payments", protect, restrictTo("admin"), getAllPayments);

export default router;
