import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';
import { LoginSchemas } from './schemas/LoginSchemas';

class LoginValidator {

  public static validateBody(req: Request, res: Response, next: NextFunction): void | Response {
    //
    const { email, password } = req.body;

    const { error }: Joi.ValidationResult = LoginSchemas.validate({ email, password });

    if (error) {
      return res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
    }

    next();
  }
}

export { LoginValidator };
