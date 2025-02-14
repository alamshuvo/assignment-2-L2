import { z } from 'zod'
import { userStatus } from './user.const'

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().max(20, { message: 'name cannot be more than 20 char' }),
    email: z.string(),
    password: z
      .string()
      .max(20, { message: 'password cannot be more than 20 char' }),
    role: z.enum(['user', 'admin']).default('user'),
    isDeleted: z.boolean().optional().default(false),
    status: z.enum(['in-progress', 'blocked']).default('in-progress'),
    profileImage: z.string().optional(),
  }),
})
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
  }),
})

const changeValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
})

export const UserValidation = {
  userValidationSchema,
  changeValidationSchema,
  updateUserValidationSchema,
}
