import { z } from 'zod'
import { Orderstatus } from './order.const'

// const orderValidationSchema = z.object({
//   body: z.object({
//     user: z.string(),
//     car: z.array(z.string()).nonempty('At least one car is required'),
//     quantity: z
//       .number({
//         required_error: 'Quantity is required',
//         invalid_type_error: 'Quantity must be a number',
//       })
//       .int('Quantity must be an integer')
//       .min(1, 'Quantity must be at least 1')
//       .nonnegative('Quantity must be non-negative'),
//     status: z.enum(['pending', 'cancled', 'paid'], {
//       errorMap: () => ({ message: 'Invalid status value' }),
//     }),
//   }),
// })

const orderValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    car: z.array(
      z.object({
        car: z.string(),
        quantity: z
          .number({
            required_error: 'Quantity is required',
            invalid_type_error: 'Quantity must be a number',
          })
          .int('Quantity must be an integer')
          .min(1, 'Quantity must be at least 1')
          .nonnegative('Quantity must be non-negative'),
      })
    ).nonempty('At least one car is required'),
    status: z.enum(['pending', 'canceled', 'paid'], {
      errorMap: () => ({ message: 'Invalid status value' }),
    }),
    totalPrice:z.number().optional()
  }),
});

const orderValidationUpdateSchema = z.object({
  body: z.object({
    status: z.enum([...Orderstatus] as [string, ...string[]]),
  }),
})
export const orderValidation = {
  orderValidationSchema,
  orderValidationUpdateSchema,
}
