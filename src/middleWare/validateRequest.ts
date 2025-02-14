import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import { catchAsync } from '../utils/catchAsync'

const validateRequest = (scehme: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    await scehme.parseAsync({
      body: req.body,
      cookies: req.cookies,
    })
    next()
  })
}
export default validateRequest
