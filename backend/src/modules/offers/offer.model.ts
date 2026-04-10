import mongoose, { Document, Schema } from "mongoose";
import { PENDING, ACCEPTED, REJECTED } from "../../utils/constants";

export interface IOffer extends Document {
  taskId: mongoose.Types.ObjectId;
  assistantId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  proposedPrice: number;
  message?: string;
  status: typeof PENDING | typeof ACCEPTED | typeof REJECTED;
  createdAt: Date;
}

const OfferSchema = new Schema<IOffer>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    assistantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    proposedPrice: { type: Number, required: true },
    message: { type: String },
    status: {
      type: String,
      enum: [PENDING, ACCEPTED, REJECTED],
      default: PENDING,
    },
  },
  { timestamps: true },
);

export const Offer = mongoose.model<IOffer>("Offer", OfferSchema);
