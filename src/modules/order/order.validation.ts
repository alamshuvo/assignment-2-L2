import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  car: z.string().nonempty("Car is required"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1")
    .nonnegative("Quantity must be non-negative"),
  totalPrice: z
    .number()
    .min(0, "Total price must be at least 0")
    .nonnegative("Total price must be non-negative"),
});

export default orderValidationSchema;