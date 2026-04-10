import mongoose, { Document, Schema } from "mongoose";
import {
  PAYMENT_PENDING,
  PAYMENT_SUCCESS,
  PAYMENT_FAILED,
} from "../../utils/constants";

export interface IPayment extends Document {
  taskId: mongoose.Types.ObjectId;
  clientId: mongoose.Types.ObjectId;
  assistantId: mongoose.Types.ObjectId;
  amount: number;
  status:
    | typeof PAYMENT_PENDING
    | typeof PAYMENT_SUCCESS
    | typeof PAYMENT_FAILED;
  reference: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    taskId: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    clientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    assistantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: [PAYMENT_PENDING, PAYMENT_SUCCESS, PAYMENT_FAILED],
      default: PAYMENT_PENDING,
    },
    reference: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
