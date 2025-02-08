import mongoose from 'mongoose'
import { TUser } from './user.interface'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import { sendImageToCloudinary } from '../../utils/sendImgToClodudinary'

const createStudentIntoDB = async (file:any,data: TUser) => {
  const userData: Partial<TUser> = {
    name: data?.name,
    email: data?.email,
    password: data?.password,
    role: data?.role,
    isDeleted: data?.isDeleted,
    status: data?.status
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const path = file?.path;
    const imageName = `${data?.name} ${data?.role}`
    const {secure_url} = await sendImageToCloudinary(path,imageName)
    userData.profileImage = secure_url
    
    const result = await User.create([userData], { session })
    console.log(result[0]);
    if (!result.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'failed to create User')
    }
    await session.commitTransaction()
    await session.endSession()
    return result
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    console.log(error)
    throw new Error('Failed to Create Student Rollback')
  }
}

const changeStatus = async (id: string, payLoad: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payLoad, { new: true })
  return result
}
export const userService = {
  createStudentIntoDB,
  changeStatus,
}
