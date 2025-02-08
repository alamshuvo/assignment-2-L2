import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'
import config from '../../config'

const loginUser = async (payload: TLoginUser) => {
  const userExist = await User.isUserExistsByEmail(payload?.email);

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
    throw new AppError(StatusCodes.NOT_FOUND, 'password is not matched')
  }
  const jwtPayload = {
    userEmail: userExist?.email,
    role: userExist?.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string
  )
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiries_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

export const AuthService = {
  loginUser,
}
