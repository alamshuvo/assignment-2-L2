import mongoose from 'mongoose'
import { TErrorHandaler, TGenericErrorResponse } from '../interface/error.type'

const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorResponse => {
  const errorSources: TErrorHandaler = [
    {
      path: err?.path,
      message: err?.message,
    },
  ]

  return {
    statusCode: 400,
    message: 'invalid Id',
    errorSources,
  }
}

export default handleCastError
