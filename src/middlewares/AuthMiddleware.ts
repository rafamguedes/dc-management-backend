import { NextFunction, Request, Response } from 'express';
import { JwtService } from '../utils/JwtService';

const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';

class Authenticate {
  //
  public static authToken(req: Request, res: Response, next: NextFunction) {
    //
    const { authorization } = req.headers;
    
    if (!authorization) {
      return res.status(401).json({ message: TOKEN_NOT_FOUND });
    }

    try {
      const token = JwtService.splitToken(authorization);
      const payload = JwtService.verifyToken(token);
      res.locals.user = payload;
    } catch (error) {
      console.log('Error validating token: ', error);
      return res.status(401).json({ message: INVALID_TOKEN });
    }

    next();
  }
}

export { Authenticate };
