import type { Request, Response } from "express";
import TaskService from "../services/task.service.js";
import UserService from "../services/user.service.js";
import type { ITaskStatus } from "../interfaces/task.interface.js";

export default class TaskController {
  private taskService = new TaskService();
  private userService = new UserService();

  constructor() {}

  getTasks(req: Request, res: Response) {
    res.json({ status: "success", data: this.taskService.getTasks() });
  }

  getTaskById(req: Request, res: Response) {
    const taskId = req.params.taskId as string;

    if (!taskId) {
      return res
        .status(400)
        .json({ status: "error", message: "Task ID is required" });
    }

    if (!this.taskService.getTaskById(taskId)) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found" });
    }

    res.json({
      status: "success",
      data: this.taskService.getTaskById(taskId),
    });
  }

  createTask(req: Request, res: Response) {
    if (!this.userService.getUserById(req.body.clientId)) {
      return res
        .status(400)
        .json({ status: "error", message: "Client does not exist" });
    }

    this.taskService.createTask(req.body);

    res
      .status(201)
      .json({ status: "success", message: "Task created successfully" });
  }

  changeTaskStatus(req: Request, res: Response) {
    const taskId = req.params.taskId as string;

    if (!taskId) {
      return res
        .status(400)
        .json({ status: "error", message: "Task ID is required" });
    }

    const task = this.taskService.getTaskById(taskId);

    if (!task) {
      return res
        .status(404)
        .json({ status: "error", message: "Task not found" });
    }

    const newStatus = req.body.status as ITaskStatus;

    this.taskService.changeTaskStatus(taskId, newStatus);
  }
}
