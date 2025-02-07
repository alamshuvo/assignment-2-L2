import { StatusCodes } from 'http-status-codes'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createStudentIntoDB(req?.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    sucess: true,
    message: 'user created Sucessfully',
    data: result,
  })
})

export const UserController = {
  createUser,
}
