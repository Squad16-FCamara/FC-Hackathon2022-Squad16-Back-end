import { NextFunction, Request, Response } from 'express';
import { decode, JwtPayload, verify } from 'jsonwebtoken';
import AppError from '../errors/appError';

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const [, token] = request.headers.authorization.split(' ');

  if (!token) {
    throw new AppError('Token not provided');
  }

  const secret = process.env.AUTH_SECRET || 'secret';
  const { sub } = verify(token, secret) as JwtPayload;

  request.user = { id: parseInt(sub) };

  return next();
}

export default authMiddleware;
