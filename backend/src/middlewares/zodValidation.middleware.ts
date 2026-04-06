import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export function zodValidationMiddleware(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((err: any) => ({
          path: err.path.join("."),
          message: `${err.message}`,
        }));
        res.status(400).json({
          message: errorMessages,
          status: "error",
        });
      } else {
        res.status(500).json({
          message: "Internal server error",
          status: "error",
        });
      }
    }
  };
}
