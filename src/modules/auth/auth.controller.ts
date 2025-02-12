import { StatusCodes } from 'http-status-codes'
import config from '../../config'
import { catchAsync } from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const body = req?.body
  const result = await AuthService.loginUser(body);
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
const changePassword = catchAsync(async(req,res)=>{
  const body =req.body;
  const result = await AuthService.changePassword(req.user,body)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:'user change password sucesssfully',
    data:null
  })
})
const refreshToken = catchAsync(async(req,res)=>{
  const {refreshToken} = req.cookies;
  const result = await AuthService.refreshToken(refreshToken)
  sendResponse(res,{
    statusCode:StatusCodes.OK,
    sucess:true,
    message:"Acess token is retirived sucessfully",
    data:result
  })
})



export const authController = {
    loginUser,
    changePassword,
    refreshToken
    
    
}