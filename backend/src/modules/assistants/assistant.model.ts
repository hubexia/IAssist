import mongoose, { Schema, Document } from "mongoose";
import {
  PENDING_VERIFICATION,
  APPROVED,
  REJECTED_VERIFICATION,
} from "../../utils/constants";

export interface IAssistant extends Document {
  userId: mongoose.Types.ObjectId;
  bio?: string;
  skills?: string[];
  city:string;
  isOnline: boolean;
  isActive: boolean;
  rating: number;
  completedTaskCount: number;
  verificationStatus:
    | typeof PENDING_VERIFICATION
    | typeof APPROVED
    | typeof REJECTED_VERIFICATION;
}

const AssistantSchema = new Schema<IAssistant>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String },
    skills: [{ type: String }],
    city: { type: String, required: true },
    isOnline: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    completedTaskCount: { type: Number, default: 0 },
    verificationStatus: {
      type: String,
      enum: [PENDING_VERIFICATION, APPROVED, REJECTED_VERIFICATION],
      default: PENDING_VERIFICATION,
    },
  },
  { timestamps: true },
);

export const Assistant = mongoose.model<IAssistant>(
  "Assistant",
  AssistantSchema,
);
