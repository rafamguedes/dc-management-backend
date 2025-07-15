import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { LoginSchemas } from './schemas/LoginSchemas';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  const { error }: Joi.ValidationResult = LoginSchemas.validate({ email, password });

  if (error) {
    res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
    return;
  }

  next();
};

export const LoginValidator = {
  validateBody
};
