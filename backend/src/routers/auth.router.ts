import express from "express";
import AuthController from "../controllers/auth.controller.js";
import { zodValidationMiddleware } from "../middlewares/zodValidation.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRouter = express.Router();

const authController = new AuthController();

authRouter.post(
  "/register",
  zodValidationMiddleware(registerSchema),
  (req, res) => authController.register(req, res) 
);

authRouter.post(
  "/login",
  zodValidationMiddleware(loginSchema),
  (req, res) => authController.login(req, res)
);

export default authRouter;
