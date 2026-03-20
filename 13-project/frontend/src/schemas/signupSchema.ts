import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Minimum 3 characters"),

    email: z.email(),

    password: z.string().min(6, "Minimum 6 characters"),

    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
