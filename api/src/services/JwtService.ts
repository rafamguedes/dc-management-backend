import { sign, verify, JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secretKey';

const createToken = (payload: JwtPayload): string => {
  return sign(payload, JWT_SECRET, { expiresIn: '1h', algorithm: 'HS256' });
};

const verifyToken = (token: string): JwtPayload => {
  return verify(token, JWT_SECRET) as JwtPayload;
};

const splitToken = (authorization: string): string => {
  return authorization.split(' ')[1];
};

export const JwtService = {
  createToken,
  verifyToken,
  splitToken
};