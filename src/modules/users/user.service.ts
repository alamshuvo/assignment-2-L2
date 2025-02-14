import mongoose from 'mongoose'
import { TUser } from './user.interface'
import { User } from './user.model'
import AppError from '../../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import { sendImageToCloudinary } from '../../utils/sendImgToClodudinary'
import { generateUserId } from './user.utils'

const createStudentIntoDB = async (file: any, data: TUser) => {
  const userData: Partial<TUser> = {
    name: data?.name,
    email: data?.email,
    password: data?.password,
    role: data?.role,
    isDeleted: data?.isDeleted,
    status: data?.status,
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const path = file?.path
    const imageName = `${data?.name} ${data?.role}`
    // const a = (await sendImageToCloudinary(
    //   path as string,
    //   imageName
    // )) as cloudyneryResponse

    // userData.profileImage = { type: a?.secure_url as string }
    const newUserId = await generateUserId('user')
    userData.id = newUserId
    const {secure_url} = await sendImageToCloudinary(path,imageName);
    userData.profileImage = secure_url;
//     const response = await sendImageToCloudinary(path, imageName)
//  console.log(response);
//     if (response && typeof response === 'object' && 'secure_url' in response) {
//       userData.profileImage = { type: response.secure_url };
//     } else {
//       throw new Error('Cloudinary response is invalid')
//     }
  
    const result = await User.create([userData], { session })
   
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

const getAllUser = async () => {
  const result = await User.find()

  return result
}

const getSingleUser = async (id: string) => {
  const result = User.findById(id)
  return result
}
const updateUser = async (id: string, data: Partial<TUser>) => {
  const result = User.findByIdAndUpdate(id, data, { new: true })
  return result
}

const deleteUser = async (id: string) => {
  const result = User.findByIdAndDelete(id)
  return result
}
export const userService = {
  createStudentIntoDB,
  changeStatus,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
