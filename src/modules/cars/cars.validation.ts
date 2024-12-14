import { z } from 'zod'

const carsValidationSchema = z.object({
  brand: z
    .string()
    .min(3, { message: 'brand name must be 3 characters or long' })
    .trim(),
  model: z
    .string()
    .min(4, { message: 'model name must be 4 char or longer' })
    .trim(),
  year: z
    .number()
    .int('Year must be an integer')
    .positive('Year must be a positive number')
    .min(1886, 'Year must be 1886 or later') // Minimum year for modern cars
    .max(new Date().getFullYear(), 'Year cannot be in the future'),
  price: z.number().positive('Price must be a positive number').min(0),
  category: z.enum(
    ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'],
    'Invalid category'
  ),
  description: z.string().min(5, 'Description is required'),
  quantity: z
    .number()
    .positive('quantity must be positive number')
    .int('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative'),
  inStock: z.boolean(),
})

export default carsValidationSchema
