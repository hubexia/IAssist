import express from "express";
import authRouter from "./routers/auth.router.js";
import taskRouter from "./routers/task.router.js";
import userRouter from "./routers/user.router.js";
import applicationRouter from "./routers/application.router.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Todo: Add authentication middleware to protect routes
// Todo: Create a database connection and replace in-memory data storage with database operations
//Todo: Move business logic from controllers to services for better separation of concerns

app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/applications", applicationRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
