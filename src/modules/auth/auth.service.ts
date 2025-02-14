import { StatusCodes } from 'http-status-codes'
import AppError from '../../errors/AppError'
import { User } from '../users/user.model'
import { TLoginUser } from './auth.interface'
import { createToken, verifyToken } from './auth.utils'
import config from '../../config'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sendEmail } from '../../utils/sendEmail'
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

const changePassword = async (
  user: JwtPayload,
  payload: { oldPassword: string; newPassword: string }
) => {
  const userExist = await User.isUserExistsByEmail(user?.userEmail)
  if (!userExist) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      'this user is not found in database'
    )
  }
  // checking if the user is already delete
  const isUserBlocked = userExist?.status?.toString()
  if (isUserBlocked === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'this is user blocked')
  }
  // checking if the password is correct
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.oldPassword,
    userExist?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.NOT_FOUND, 'password is not matched')
  }
  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.salt_round)
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await User.findOneAndUpdate(
    { id: userExist?.id }, // Correct filter
    {
      password: newHashedPassword,
      passwordChangeAt: new Date(),
    },
    { new: true } // Returns updated document
  )
  return null
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decode = verifyToken(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload
  const { userEmail, iat } = decode
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'this user is not found')
  }
  const userStatus = user?.status?.type
  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'this user is blocked')
  }
  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChange(
      user?.passwordChangeAt.type,
      iat as number
    )
  ) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized !')
  }
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  }
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_expires_in as string
  )
  return { accessToken }
}

const forgetPassword = async (email: string) => {
  const user = await User.isUserExistsByEmail(email)
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found')
  }
  const userStatus = user?.status.type
  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !!')
  }
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  }
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '15m'
  )
  const resetUiLink = `${config.reset_Password_ui_link}?email=${user.email}&token=${resetToken}`
  sendEmail(user?.email, resetUiLink, '15m')
}
export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
}
