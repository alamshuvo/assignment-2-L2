import { NextFunction, Request, Response } from 'express'
import { TUserRole } from '../modules/users/user.interface'
import { catchAsync } from '../utils/catchAsync'
import AppError from '../errors/AppError'
import { StatusCodes } from 'http-status-codes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { User } from '../modules/users/user.model'

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    // cheeck if the token is send from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized')
    }
    //check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      async function (err, decode) {
        if (err) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized')
        }

        const { userEmail, role } = decode as JwtPayload

        const user = await User.isUserExistsByEmail(userEmail)
        if (!user) {
          throw new AppError(StatusCodes.BAD_REQUEST, 'This user is not found')
        }
        const userStatus = user?.status?.type
        if (userStatus === 'blocked') {
          throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked')
        }

        if (requiredRole && !requiredRole.includes(role)) {
          throw new AppError(StatusCodes.UNAUTHORIZED, 'you are not authorized')
        }
        req.user = decode as JwtPayload
        next()
      }
    )
  })
}

export default auth
