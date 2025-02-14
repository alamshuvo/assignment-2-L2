import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import config from '../config'
import { TErrorHandaler } from '../interface/error.type'
import AppError from '../errors/AppError'
import handleCastError from '../errors/handleCastError'
import handleDuplicateError from '../errors/handleDuplicateError'
import handleValidationError from '../errors/handleValidationError'
import handleZodError from '../errors/handleZodError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'something went wrong'

  let errorSources: TErrorHandaler = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ]
  if (err instanceof ZodError) {
    const simpliFiedError = handleZodError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'ValidationError') {
    const simpliFiedError = handleValidationError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.name === 'CastError') {
    const simpliFiedError = handleCastError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err?.code === 11000) {
    const simpliFiedError = handleDuplicateError(err)
    statusCode = simpliFiedError?.statusCode
    message = simpliFiedError?.message
    errorSources = simpliFiedError?.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ]
  }

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    errorSources: config.node_env === 'development' ? errorSources : null,
    err,
    stack: config.node_env === 'development' ? err?.stack : null,
  })
}
export default globalErrorHandler

//patrern
/*
sucess
mesage
errorSource:[
path:"",
message:"",
],
stack
*/
