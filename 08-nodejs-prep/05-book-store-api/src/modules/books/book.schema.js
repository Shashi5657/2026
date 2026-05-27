import { z } from "zod";

export const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    author: z.string().min(1).optional(),
    price: z.number().min(1).optional(),
    stock: z.number().min(0).optional(),
    publishedDate: z.coerce.date().optional(),
  }),
});
