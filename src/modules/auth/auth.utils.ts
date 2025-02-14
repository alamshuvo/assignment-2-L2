import Jwt, { JsonWebTokenError, SignOptions } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: Record<string, unknown>,
  secret: string,
  expiresIn: string
) => {
  return Jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions)
}

export const verifyToken = (token: string, secret: string) => {
  return Jwt.verify(token, secret) as JsonWebTokenError
}
