import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { 
  bodySchema, 
  paramsSchema, 
  aisleParamsSchema, 
  statusParamsSchema, 
  floorParamsSchema, 
  bodyEditSchema, 
  statusUpdateSchema 
} from './schemas/SlotSchemas';

const INVALID_VALUE = 'INVALID_VALUE';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { aisleId, code, floor, status } = req.body;

  const { error }: Joi.ValidationResult = bodySchema.validate({ aisleId, code, floor, status });

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

const validateAisleParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = aisleParamsSchema.validate({ aisleId: req.params.aisleId });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateStatusParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = statusParamsSchema.validate({ status: req.params.status });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateFloorParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = floorParamsSchema.validate({ floor: req.params.floor });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { aisleId, code, floor, status } = req.body;

  const { error }: Joi.ValidationResult = bodyEditSchema.validate({ aisleId, code, floor, status });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateStatusUpdate = (req: Request, res: Response, next: NextFunction): void => {
  const { status } = req.body;

  const { error }: Joi.ValidationResult = statusUpdateSchema.validate({ status });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

export const SlotValidator = {
  validateBody,
  validateParams,
  validateAisleParams,
  validateStatusParams,
  validateFloorParams,
  validateUpdateBody,
  validateStatusUpdate
};
