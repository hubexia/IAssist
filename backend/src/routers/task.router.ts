import express from "express";
import { zodValidationMiddleware } from "../middlewares/zodValidation.middleware.js";
import { CreateTaskSchema } from "../schemas/task.schema.js";
import TaskController from "../controllers/task.controller.js";

const taskController = new TaskController();

const taskRouter = express.Router();

taskRouter.post("/", zodValidationMiddleware(CreateTaskSchema), (req, res) => {
  taskController.createTask(req, res);
});

taskRouter.get("/", (req, res) => taskController.getTasks(req, res));

taskRouter.get("/:taskId", (req, res) => taskController.getTaskById(req, res));

taskRouter.patch("/:taskId", (req, res) => {
  taskController.changeTaskStatus(req, res);
});

export default taskRouter;
