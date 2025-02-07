import mongoose from 'mongoose'
import { TUser } from './user.interface'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import { StatusCodes } from 'http-status-codes'

const createStudentIntoDB = async (data: TUser) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const result = await User.create([data], { session })
    if (!result.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create User')
    }
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log(error);
    throw new Error('Failed to Create Student Rollback')
  }
}

export const userService = {
  createStudentIntoDB,
}
