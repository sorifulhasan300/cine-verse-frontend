import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string().min(1, "Category name is required").max(100, "Category name must be less than 100 characters"),
  description: z.string().optional(),
});