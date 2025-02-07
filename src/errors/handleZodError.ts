import { ZodError, ZodIssue } from 'zod';
import { TErrorHandaler, TGenericErrorResponse } from '../interface/error.type';


const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorHandaler = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  return {
    statusCode: 400,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodError;
