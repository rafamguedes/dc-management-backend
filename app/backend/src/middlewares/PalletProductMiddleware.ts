import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { 
  bodySchema, 
  paramsSchema, 
  palletParamsSchema, 
  productParamsSchema,
  daysParamsSchema,
  bodyEditSchema,
  bulkCreateSchema
} from './schemas/PalletProductSchemas';

const INVALID_VALUE = 'INVALID_VALUE';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { palletId, productId, quantity, expiryDate, manufactureDate } = req.body;

  const { error }: Joi.ValidationResult = bodySchema.validate({ 
    palletId, 
    productId, 
    quantity, 
    expiryDate, 
    manufactureDate 
  });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  // Additional validation: expiry date must be after manufacture date
  if (expiryDate && manufactureDate && new Date(expiryDate) <= new Date(manufactureDate)) {
    res.status(400).json({ 
      status: INVALID_VALUE, 
      message: 'Expiry date must be after manufacture date' 
    });
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

const validatePalletParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = palletParamsSchema.validate({ palletId: req.params.palletId });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateProductParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = productParamsSchema.validate({ productId: req.params.productId });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateDaysParams = (req: Request, res: Response, next: NextFunction): void => {
  const days = req.params.days || req.query.days || 7;
  const { error }: Joi.ValidationResult = daysParamsSchema.validate({ days: Number(days) });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  // Set the validated days value
  req.params.days = String(Number(days));
  next();
};

const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { quantity, expiryDate, manufactureDate } = req.body;

  const { error }: Joi.ValidationResult = bodyEditSchema.validate({ 
    quantity, 
    expiryDate, 
    manufactureDate 
  });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  // Additional validation: expiry date must be after manufacture date (if both provided)
  if (expiryDate && manufactureDate && new Date(expiryDate) <= new Date(manufactureDate)) {
    res.status(400).json({ 
      status: INVALID_VALUE, 
      message: 'Expiry date must be after manufacture date' 
    });
    return;
  }

  next();
};

const validateBulkCreate = (req: Request, res: Response, next: NextFunction): void => {
  const { palletProducts } = req.body;

  const { error }: Joi.ValidationResult = bulkCreateSchema.validate({ palletProducts });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  // Additional validation for each pallet product
  for (const palletProduct of palletProducts) {
    if (palletProduct.expiryDate && palletProduct.manufactureDate && 
        new Date(palletProduct.expiryDate) <= new Date(palletProduct.manufactureDate)) {
      res.status(400).json({ 
        status: INVALID_VALUE, 
        message: `Expiry date must be after manufacture date for pallet ${palletProduct.palletId} and product ${palletProduct.productId}` 
      });
      return;
    }
  }

  next();
};

export const PalletProductValidator = {
  validateBody,
  validateParams,
  validatePalletParams,
  validateProductParams,
  validateDaysParams,
  validateUpdateBody,
  validateBulkCreate
};
