import { email, z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and number",
      ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(1),
  }),
});
