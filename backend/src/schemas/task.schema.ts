import { z } from "zod";
import { COMPLETED, IN_PROGRESS, OPEN } from "../constants.js";
import { CANCELLED } from "node:dns";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  clientId: z.string().min(1, "Client ID is required"),
  offeredPrice: z.number().positive("Offered price must be a positive number"),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;

export const ChangeTaskStatusSchema = z.object({
  status: z.enum(
    [OPEN, IN_PROGRESS, COMPLETED, CANCELLED],
    `Status must be one of: ${OPEN}, ${IN_PROGRESS}, ${COMPLETED}, ${CANCELLED}`,
  ),
});
