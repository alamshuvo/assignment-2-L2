// import { JwtPayload } from 'jsonwebtoken';
import { TUser } from '../modules/users/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: CustomJwtPayload;
    }
  }
}

export interface CustomJwtPayload extends TUser {
  role: string;
  userEmail: string;
  userId: string;
}
