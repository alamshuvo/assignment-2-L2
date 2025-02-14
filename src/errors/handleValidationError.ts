import mongoose from 'mongoose'
import { TErrorHandaler, TGenericErrorResponse } from '../interface/error.type'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorHandaler = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      }
    }
  )

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  }
}

export default handleValidationError
