import { StatusCodes } from 'http-status-codes'
import config from '../config'
import { catchAsync } from '../utils/catchAsync'
import sendResponse from '../utils/sendResponse'
import { AuthService } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const body = req?.body
  const result = await AuthService.loginUser(body);
  console.log(result,"login er controller tekhe");
  const { refreshToken, accessToken } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  })
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"user is loged in sucessfully",
    data:{
        accessToken
    }
  })
})



export const authController = {
    loginUser
}