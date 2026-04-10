import { Response } from "express";
import { User } from "../auth/auth.model";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { sendSuccess, sendError } from "../../utils/response";

export const getUserProfile = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    if (!user) {
      sendError(res, "User not found", 404);
      return;
    }
    sendSuccess(res, user, "User fetched successfully");
  } catch (error) {
    sendError(res, "Could not fetch user", 500);
  }
};
