import { z } from "zod";
import { ACCEPTED, PENDING, REJECTED } from "../constants.js";

export const CreateApplicationSchema = z.object({
  message: z.string().optional(),
  proposedPrice: z.string(),
  taskId: z.string(),
  assistantId: z.string(),
  clientId: z.string(),
  status: z.enum([PENDING, ACCEPTED, REJECTED]),
  createdAt: z.string(),
});

export type CreateApplicationSchemaType = z.infer<
  typeof CreateApplicationSchema
>;

export const UpdateApplicationStatusSchema = z.object({
  status: z.enum(
    [ACCEPTED, REJECTED],
    "Status must be either accepted or rejected",
  ),
  clientId: z.string(),
});
