import { Response } from "express";
import { Payment } from "./payment.model";
import { Task } from "../tasks/task.model";
import { sendSuccess, sendError } from "../../utils/response";
import { AuthRequest } from "../../middleware/auth.middleware";
import { ENV } from "../../config/env";
import axios from "axios";

export const initializePayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskId } = req.body;

    if (!taskId) {
      sendError(res, "Task ID is required", 400);
      return;
    }

    const task = await Task.findById(taskId).populate("clientId");
    if (!task) {
      sendError(res, "Task not found", 404);
      return;
    }

    if (task.clientId._id.toString() !== req.user?.id) {
      sendError(res, "Only the client can initialize payment for this task", 403);
      return;
    }

    if (task.status !== "assigned") {
      sendError(res, "Task must be assigned before payment can be initialized", 400);
      return;
    }

    if (!task.assignedAssistantId) {
      sendError(res, "No assistant assigned to this task", 400);
      return;
    }

    const existingPayment = await Payment.findOne({ taskId, status: "pending" });
    if (existingPayment) {
      sendSuccess(res, existingPayment, "Payment already initialized");
      return;
    }

    // Get client email
    const clientUser = task.clientId as any;
    const email = clientUser.email;

    // Initialize payment with Paystack
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: task.offeredPrice * 100, 
        metadata: {
          taskId: task._id.toString(),
          clientId: req.user?.id,
          assistantId: task.assignedAssistantId.toString(),
        },
      },
      {
        headers: {
          Authorization: `Bearer ${ENV.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { authorization_url, reference } = paystackResponse.data.data;

    // Save payment record
    const payment = await Payment.create({
      taskId,
      clientId: req.user?.id,
      assistantId: task.assignedAssistantId,
      amount: task.offeredPrice,
      reference,
    });

    sendSuccess(res, {
      payment,
      paymentUrl: authorization_url,
      reference,
    }, "Payment initialized successfully", 201);
  } catch (error) {
    sendError(res, "Could not initialize payment", 500);
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { reference } = req.body;

    if (!reference) {
      sendError(res, "Payment reference is required", 400);
      return;
    }

    const payment = await Payment.findOne({ reference });
    if (!payment) {
      sendError(res, "Payment not found", 404);
      return;
    }

    if (payment.status === "success") {
      sendSuccess(res, payment, "Payment already verified");
      return;
    }

    // Verify with Paystack
    const paystackResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${ENV.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status } = paystackResponse.data.data;

    if (status === "success") {
      payment.status = "success";
      await payment.save();

      // Update task to in_progress
      await Task.findByIdAndUpdate(payment.taskId, { status: "in_progress" });

      sendSuccess(res, payment, "Payment verified successfully");
    } else {
      payment.status = "failed";
      await payment.save();
      sendError(res, "Payment verification failed", 400);
    }
  } catch (error) {
    sendError(res, "Could not verify payment", 500);
  }
};