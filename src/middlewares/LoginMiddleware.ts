import * as Joi from 'joi';
import { NextFunction, Request, Response } from 'express';

class LoginValidator {
  //
  private static loginSchema = Joi.object({
    //
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
      'any.required': '"email" is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': '"password" length must be at least 6 characters long',
      'any.required': '"password" is required',
      'string.base': '"password" must be a string',
    }),
  });

  public static validateBody(req: Request, res: Response, next: NextFunction): void | Response {
    //
    const { error }: Joi.ValidationResult = LoginValidator.loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ status: 'INVALID_VALUE', message: error.details[0].message });
    }

    next();
  }
}

export { LoginValidator };
