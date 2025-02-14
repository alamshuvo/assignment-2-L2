import { Model } from 'mongoose'
import { USER_ROLE } from './user.const'

export interface TUser {
  name: string
  id: string
  email: string
  password: string
  passwordChangeAt?: { type: Date }
  role: {
    type: string
    enum: ['user' | 'admin']
  }
  isDeleted: {
    type: boolean
    default: false
  }
  status: {
    type: string
    enum: ['in-progress' | 'blocked']
    default: 'in-progress'
  },
  profileImage?:string
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>
  isJWTIssuedBeforePasswordChange(
    passwordChagedTimestap: Date,
    jwtissuedTimeStap: number
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
