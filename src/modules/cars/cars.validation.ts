import { z } from 'zod'

const carsValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    brand: z.string(),

    model: z.string(),
    year: z
      .number()
      .int('Year must be an integer')
      .positive('Year must be a positive number')
      .min(1886, 'Year must be 1886 or later') // Minimum year for modern cars
      .max(new Date().getFullYear(), 'Year cannot be in the future'),
    price: z.number().positive('Price must be a positive number').min(0),
    category: z.enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible']),
    description: z.string().min(5, 'Description is required'),
    quantity: z
      .number()
      .positive('quantity must be positive number')
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative'),
    inStock: z.boolean(),
  }),
})

const updateCarsValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    model: z
      .string()
      .min(4, { message: 'model name must be 4 char or longer' })
      .trim()
      .optional(),
    year: z
      .number()
      .int('Year must be an integer')
      .positive('Year must be a positive number')
      .min(1886, 'Year must be 1886 or later') // Minimum year for modern cars
      .max(new Date().getFullYear(), 'Year cannot be in the future')
      .optional(),
    price: z
      .number()
      .positive('Price must be a positive number')
      .min(0)
      .optional(),
    category: z
      .enum(['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'])
      .optional(),
    description: z.string().min(5, 'Description is required').optional(),
    quantity: z
      .number()
      .positive('quantity must be positive number')
      .int('Quantity must be an integer')
      .min(0, 'Quantity cannot be negative')
      .optional(),
    inStock: z.boolean().optional(),
  }),
})
export const carsValidation = {
  carsValidationSchema,
  updateCarsValidationSchema,
}
