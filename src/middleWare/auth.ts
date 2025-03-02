import { NextFunction, Request, Response } from 'express';

import { TUserRole } from '../modules/users/user.interface';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/users/user.model';
import { CustomJwtPayload } from '../interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    
    // Check if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as CustomJwtPayload;

      const { userEmail, role, userId } = decoded;

      // Check if the user exists
      const user = await User.isUserExistsByEmail(userEmail);
      if (!user) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'This user is not found');
      }

      // Check if the user is blocked
      if (user?.status?.type === 'blocked') {
        throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
      }

      // Check if the user has the required role
      if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
      }

      // Attach user details to the request
      req.user = { userEmail, userId, role, name: user.name, id: user.id, email: user.email, password: user.password, isDeleted: user.isDeleted, status: user.status };

      next();
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid or expired token');
    }
  });
};

export default auth;
