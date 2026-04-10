import "./config/env";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db";
import { ENV } from "./config/env";
import authRoutes from "./modules/auth/auth.router";
import userRoutes from "./modules/users/user.router";
import assistantRoutes from "./modules/assistants/assistant.router";
import taskRoutes from "./modules/tasks/task.router";
import offerRoutes from "./modules/offers/offer.router";
import paymentRoutes from "./modules/payments/payment.router";
import reviewRoutes from "./modules/reviews/review.router";
import adminRoutes from "./modules/admin/admin.router";
import multer from "multer";

const app = express();
const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

app.use(cors());
app.use(express.json());

// Socket.io connection
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join a task room
  socket.on("join_task", (taskId: string) => {
    socket.join(taskId);
    console.log(`Socket ${socket.id} joined task room: ${taskId}`);
  });

  // Leave a task room
  socket.on("leave_task", (taskId: string) => {
    socket.leave(taskId);
    console.log(`Socket ${socket.id} left task room: ${taskId}`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "IAssist API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/assistants", assistantRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);

// Multer error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ success: false, message: err.message });
  }
  return res.status(500).json({ success: false, message: "Something went wrong" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const start = async () => {
  await connectDB();
  httpServer.listen(ENV.PORT, () => {
    console.log(`IAssist server running on port ${ENV.PORT}`);
  });
};

start();