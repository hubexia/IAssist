import mongoose, { Document, Schema } from "mongoose";

export interface IReview extends Document {
  taskId: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  revieweeId: mongoose.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    reviewerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    revieweeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true },
);

// Prevent duplicate reviews per task per reviewer
ReviewSchema.index({ taskId: 1, reviewerId: 1 }, { unique: true });

export const Review = mongoose.model<IReview>("Review", ReviewSchema);
