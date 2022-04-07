import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/appError';

function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.status).json({
      error: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    error: 'Internal server error',
  });
}

export default errorHandler;
