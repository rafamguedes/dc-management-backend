import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { bodySchema, paramsSchema, bodyEditSchema } from './schemas/UserSchemas';

// Constant
const INVALID_VALUE = 'INVALID_VALUE';

class UserValidator {
  
  public static validateBody(req: Request, res: Response, next: NextFunction): void | Response {

    const { username, role, email, password, image } = req.body;

    const { error }: Joi.ValidationResult = bodySchema.validate({ username, role, email, password, image });

    if (error) {
      return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    }

    next();
  }


  public static validateParams(req: Request, res: Response, next: NextFunction): void | Response {

    const { error }: Joi.ValidationResult = paramsSchema.validate({ id: req.params.id });

    if (error) {
      return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    }

    next();
  }


  public static validateUpdateBody(req: Request, res: Response, next: NextFunction): void | Response {

    const { username, role, email, image } = req.body;

    const { error }: Joi.ValidationResult = bodyEditSchema.validate({ username, role, email, image });

    if (error) {
      return res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    }

    next();
  }
}

export { UserValidator };