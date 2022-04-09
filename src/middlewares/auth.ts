import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
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

  try {
    const { sub } = verify(token, secret) as JwtPayload;

    request.user = { id: parseInt(sub) };

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}

export default authMiddleware;
