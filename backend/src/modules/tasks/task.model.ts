import mongoose, { Document, Schema } from "mongoose";
import {
  OPEN,
  NEGOTIATING,
  ASSIGNED,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
} from "../../utils/constants";

export interface ITask extends Document {
  clientId: mongoose.Types.ObjectId;
  assignedAssistantId?: mongoose.Types.ObjectId | null;
  title: string;
  description: string;
  category: string;
  city: string;
  offeredPrice: number;
  dueDate?: Date;
  media?: string[];
  status:
    | typeof OPEN
    | typeof NEGOTIATING
    | typeof ASSIGNED
    | typeof IN_PROGRESS
    | typeof COMPLETED
    | typeof CANCELLED;
  createdAt: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assignedAssistantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    offeredPrice: { type: Number, required: true },
    dueDate: { type: Date },
    category: { type: String, required: true },
    city: { type: String, required: true },
    dueDate: { type: Date },
    media: [{ type: String }],
    status: {
      type: String,
      enum: [OPEN, NEGOTIATING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED],
      default: OPEN,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model<ITask>("Task", TaskSchema);
