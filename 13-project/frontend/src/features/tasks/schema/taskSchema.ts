import { z } from "zod";
export const taskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;
