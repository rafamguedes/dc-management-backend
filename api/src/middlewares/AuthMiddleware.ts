import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../services/JwtService';

const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';

const authToken = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401).json({ message: TOKEN_NOT_FOUND });
    return;
  }

  try {
    const token = JwtService.splitToken(authorization);
    const payload = JwtService.verifyToken(token);
    res.locals.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: INVALID_TOKEN });
  }
};

export const Authenticate = {
  authToken
};
