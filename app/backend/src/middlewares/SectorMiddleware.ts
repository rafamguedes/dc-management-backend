import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { bodySchema, paramsSchema, bodyEditSchema } from './schemas/SectorSchemas';

const INVALID_VALUE = 'INVALID_VALUE';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description } = req.body;

  const { error }: Joi.ValidationResult = bodySchema.validate({ name, description });

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

const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { name, description } = req.body;

  const { error }: Joi.ValidationResult = bodyEditSchema.validate({ name, description });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

export const SectorValidator = {
  validateBody,
  validateParams,
  validateUpdateBody
};
