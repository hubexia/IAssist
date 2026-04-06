import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long")
    .max(20, "First name must be at most 20 characters long"),
  lastName: z
    .string()
    .min(3, "Last name must be at least 3 characters long")
    .max(20, "Last name must be at most 20 characters long"),
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const loginSchema = z.object({
  email: z.email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export type LoginSchemaType = z.infer<typeof loginSchema>;
