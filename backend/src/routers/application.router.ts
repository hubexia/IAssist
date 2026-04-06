import { Router } from "express";
import { zodValidationMiddleware } from "../middlewares/zodValidation.middleware.js";
import {
  CreateApplicationSchema,
  UpdateApplicationStatusSchema,
} from "../schemas/application.schema.js";
import ApplicationController from "../controllers/application.controller.js";

const applicationRouter = Router();
const applicationController = new ApplicationController();

applicationRouter.get("/applications", (req, res) =>
  applicationController.getApplications(req, res),
);

applicationRouter.post(
  "/applications",
  zodValidationMiddleware(CreateApplicationSchema),
  (req, res) => applicationController.createApplication(req, res),
);

applicationRouter.patch(
  "/applications/:applicationId/accept",
  zodValidationMiddleware(UpdateApplicationStatusSchema),
  (req, res) => applicationController.acceptApplication(req, res),
);

applicationRouter.patch(
  "/applications/:applicationId/reject",
  zodValidationMiddleware(UpdateApplicationStatusSchema),
  (req, res) => applicationController.rejectApplication(req, res),
);

export default applicationRouter;
