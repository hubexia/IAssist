import { Router } from "express";
import { initializePayment, verifyPayment } from "./payment.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/initialize", protect, restrictTo("client"), initializePayment);
router.post("/verify", protect, restrictTo("client"), verifyPayment);

export default router;
