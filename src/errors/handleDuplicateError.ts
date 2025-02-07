import { TErrorHandaler, TGenericErrorResponse } from "../interface/error.type";




const handleDuplicateError = (err: {
  path: any;
  message: any;
}): TGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedValue = match && match[1];
  const errorSources: TErrorHandaler = [
    {
      path: '',
      message: `${extractedValue} is already exist`,
    },
  ];

  return {
    statusCode: 400,
    message: 'Duplicate key Error Error',
    errorSources,
  };
};

export default handleDuplicateError;
