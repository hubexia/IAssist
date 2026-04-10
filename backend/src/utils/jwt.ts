import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export const signToken = (payload: object): string => {
  return jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): jwt.JwtPayload | string => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
