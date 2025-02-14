import { StatusCodes } from 'http-status-codes'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const file = req.file

  const result = await userService.createStudentIntoDB(file, req?.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    sucess: true,
    message: 'user created Sucessfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await userService.changeStatus(id, req.body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user status change sucessfully',
    data: result,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user retrived sucessfully',
    data: result,
  })
})
const getSingleUser = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await userService.getSingleUser(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'single user retirved sucessfuylly',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const id = req?.params.id
  const data = req?.body
  const result = await userService.updateUser(id, data)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'update single user data',
    data: result,
  })
})
const deleteUser = catchAsync(async (req, res) => {
  const id = req?.params.id
  const result = await userService.deleteUser(id)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    sucess: true,
    message: 'user deleted sucessfully',
    data: result,
  })
})
export const UserController = {
  createUser,
  changeStatus,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
