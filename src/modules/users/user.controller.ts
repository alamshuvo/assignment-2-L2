import { StatusCodes } from 'http-status-codes'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const file = req.file;

  const result = await userService.createStudentIntoDB(file,req?.body)
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    sucess: true,
    message: 'user created Sucessfully',
    data: result,
  })
})

const changeStatus = catchAsync(async(req,res)=>{
  const id = req.params.id;
  const result = await userService.changeStatus(id,req.body)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"user status change sucessfully",
    data:result
  })
})

export const UserController = {
  createUser,
  changeStatus
}
