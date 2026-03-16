import { z } from "zod";

export const signupSchema = z.object({
  name: z.string("Full name is required"),
  email: z.email("Email is required"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
