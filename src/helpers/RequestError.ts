import { ErrorWithStatus } from '../types/error.type';

type Messages = {
  [x: number]: string;
};
const messages: Messages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbbiden',
  404: 'Not found',
  409: 'Conflict',
};

export const RequestError = (
  status: number,
  message = messages[status],
): ErrorWithStatus => {
  const error = new Error(message) as ErrorWithStatus;
  error.status = status;
  return error;
};
