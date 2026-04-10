import { Router } from "express";
import { getUserProfile } from "./user.controller";
import { protect } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/:id", protect, getUserProfile);

export default router;
