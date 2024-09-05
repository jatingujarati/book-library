import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-validation';

import APIError from '../utils/APIError';

/**
 * Get validation error message
 */
const getErrorMessages = (error: ValidationError) => {
  const { details } = error;
  if (details.params) return details.params[0].message;
  if (details.query) return details.query[0].message;
  if (details.body) return details.body[0].message;
};

/**
 * Error handler. Send stacktrace only during development
 */
export const handler = (err: APIError, req: Request, res: Response, next: NextFunction) => {
  let message = err.message || 'Something went wrong. Please try again later.';

  if (process.env.NODE_ENV === 'development') {
    if (err.stack) console.log(err.stack);
    if (err.errors) console.log(err.errors);
  }

  return res.status(err.status).json({
    status: err.status,
    message,
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};

/**
 * If error is not an instanceOf APIError, convert it.
 */
export const converter = (err: any, req: Request, res: Response, next: NextFunction) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new APIError({ status: 422, message: getErrorMessages(err) || 'Validation error occurred.' });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({ status: err.status || 500, message: err.message || 'Something went wrong. Please try again later.', stack: err.stack, isPublic: false });
  }

  return handler(convertedError, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({ message: 'API not found', status: 404 });
  return handler(err, req, res, next);
};
