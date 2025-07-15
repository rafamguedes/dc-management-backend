import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { 
  bodySchema, 
  paramsSchema, 
  codeParamsSchema, 
  unitParamsSchema, 
  bodyEditSchema 
} from './schemas/ProductSchemas';

const INVALID_VALUE = 'INVALID_VALUE';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { code, name, description, unit } = req.body;

  const { error }: Joi.ValidationResult = bodySchema.validate({ code, name, description, unit });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = paramsSchema.validate({ id: req.params.id });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateCodeParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = codeParamsSchema.validate({ code: req.params.code });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateUnitParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = unitParamsSchema.validate({ unit: req.params.unit });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { code, name, description, unit } = req.body;

  const { error }: Joi.ValidationResult = bodyEditSchema.validate({ code, name, description, unit });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

export const ProductValidator = {
  validateBody,
  validateParams,
  validateCodeParams,
  validateUnitParams,
  validateUpdateBody
};
