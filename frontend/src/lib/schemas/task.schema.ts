import z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .min(5, "Title must be at least 5 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),

  deadline: z.string().min(1, "Deadline is required"),
  budget: z
    .string()
    .min(1, "Budget is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Budget must be a positive number",
    ),

});

export type TaskFormData = z.infer<typeof taskSchema>;
