import type { Request, Response } from "express";
import UserService from "../services/user.service.js";
import type { CreateApplicationSchemaType } from "../schemas/application.schema.js";
import TaskService from "../services/task.service.js";
import ApplicationService from "../services/application.service.js";

export default class ApplicationController {
  private userService = new UserService();
  private taskService = new TaskService();
  private applicationService = new ApplicationService();

  constructor() {}

  createApplication(req: Request, res: Response) {
    const data = req.body as CreateApplicationSchemaType;

    if (!this.userService.verifyUserExistByEmail(data.clientId)) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!this.taskService.getTaskById(data.taskId)) {
      return res.status(404).json({ message: "Task not found" });
    }

    this.applicationService.createApplication(data);

    return res
      .status(201)
      .json({ message: "Application created successfully" });
  }

  getApplications(req: Request, res: Response) {
    res.status(200).json(this.applicationService.getApplications());
  }

  rejectApplication(req: Request, res: Response) {
    const applicationId = req.params.applicationId as string;
    const clientId = req.body.clientId as string;

    if (!this.userService.getUserById(clientId)) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!applicationId) {
      return res
        .status(400)
        .json({ status: "error", message: "Application ID is required" });
    }

    this.applicationService.rejectApplication(applicationId);

    return res.status(200).json({
      status: "success",
      message: "Application rejected successfully",
    });
  }

  acceptApplication(req: Request, res: Response) {
    const applicationId = req.params.applicationId as string;

    const clientId = req.body.clientId as string;

    if (!this.userService.getUserById(clientId)) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (!applicationId) {
      return res
        .status(400)
        .json({ status: "error", message: "Application ID is required" });
    }

    this.applicationService.acceptApplication(applicationId);

    return res.status(200).json({
      status: "success",
      message: "Application accepted successfully",
    });
  }
}
