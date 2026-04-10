import { Router } from "express";
import {
  createOffer,
  getOffers,
  getOfferById,
  acceptOffer,
  rejectOffer,
} from "./offer.controller";
import { protect, restrictTo } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/", protect, restrictTo("assistant"), createOffer);
router.get("/", protect, getOffers);
router.get("/:id", protect, getOfferById);
router.patch("/:id/accept", protect, restrictTo("client"), acceptOffer);
router.patch("/:id/reject", protect, restrictTo("client"), rejectOffer);

export default router;
