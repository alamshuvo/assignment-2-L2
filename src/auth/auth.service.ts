import { StatusCodes } from 'http-status-codes'
import AppError from '../errors/AppError'
import { User } from '../modules/users/user.model'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'

const loginUser = async (payload: TLoginUser) => {
  const userExist = await User.isUserExistsByEmail(payload?.email)
  if (!userExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this user is not found in database'
    )
  }
  // checking if the passwoord is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    userExist?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.NOT_FOUND,"password is not matched")
    
  }
  const jwtPayload = {
    userEmail:userExist?.email,
    role:userExist?.role
  }
  const accessToken = createToken(jwtPayload,'secret','10d'
    
  );
  const refreshToken = createToken(jwtPayload,'ssss','365d')
  return {
    accessToken,refreshToken
  }
}

export const AuthService = {
  loginUser,
}
