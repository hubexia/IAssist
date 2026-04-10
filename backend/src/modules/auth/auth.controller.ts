import { Request, Response } from "express";
import { User } from "./auth.model";
import { signToken } from "../../utils/jwt";
import { sendSuccess, sendError } from "../../utils/response";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, role, city } = req.body;

    if (!firstName || !lastName || !email || !password || !role || !city) {
      sendError(res, "All fields are required", 400);
      return;
    }

    const existing = await User.findOne({ email });
    if (existing) {
      sendError(res, "Email already in use", 400);
      return;
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordHash: password,
      role,
      city,
    });

    const token = signToken({ id: user._id, role: user.role });

    sendSuccess(res, { token }, "Registration successful", 201);
  } catch (error) {
    sendError(res, "Registration failed", 500);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, "Email and password are required", 400);
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      sendError(res, "Invalid credentials", 401);
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      sendError(res, "Invalid credentials", 401);
      return;
    }

    const token = signToken({ id: user._id, role: user.role });

    sendSuccess(res, { token, role: user.role }, "Login successful");
  } catch (error) {
    sendError(res, "Login failed", 500);
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select("-passwordHash");
    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }
    sendSuccess(res, user, "User fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch user", 500);
  }
};
