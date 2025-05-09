import * as z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Name must be less than 100 characters"),

  price: z.coerce
    .number()
    .positive("Price must be positive")
    .min(1, "Minimum price is Rs 1")
    .max(999999.99, "Price too high"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),

  image: z.string().url("Invalid URL format").optional().or(z.literal("")),
});


