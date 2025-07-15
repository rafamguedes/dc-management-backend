import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { 
  bodySchema, 
  paramsSchema, 
  slotParamsSchema, 
  typeParamsSchema, 
  qrCodeParamsSchema,
  qrCodeSmallParamsSchema,
  bodyEditSchema,
  assignSlotSchema
} from './schemas/PalletSchemas';

const INVALID_VALUE = 'INVALID_VALUE';

const validateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { type, slotId, userId, productId } = req.body;

  const { error }: Joi.ValidationResult = bodySchema.validate({ type, slotId, userId, productId });

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

const validateSlotParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = slotParamsSchema.validate({ slotId: req.params.slotId });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateTypeParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = typeParamsSchema.validate({ type: req.params.type });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateQrCodeParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = qrCodeParamsSchema.validate({ qrCode: req.params.qrCode });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateQrCodeSmallParams = (req: Request, res: Response, next: NextFunction): void => {
  const { error }: Joi.ValidationResult = qrCodeSmallParamsSchema.validate({ qrCodeSmall: req.params.qrCodeSmall });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateUpdateBody = (req: Request, res: Response, next: NextFunction): void => {
  const { type, slotId, qrCode, qrCodeSmall } = req.body;

  const { error }: Joi.ValidationResult = bodyEditSchema.validate({ type, slotId, qrCode, qrCodeSmall });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

const validateAssignSlot = (req: Request, res: Response, next: NextFunction): void => {
  const { slotId } = req.body;

  const { error }: Joi.ValidationResult = assignSlotSchema.validate({ slotId });

  if (error) {
    res.status(400).json({ status: INVALID_VALUE, message: error.details[0].message });
    return;
  }

  next();
};

export const PalletValidator = {
  validateBody,
  validateParams,
  validateSlotParams,
  validateTypeParams,
  validateQrCodeParams,
  validateQrCodeSmallParams,
  validateUpdateBody,
  validateAssignSlot
};
