import SequelizePallet from '../database/models/SequelizePallet';
import { IResponse } from '../interfaces/IResponse';
import { IPallet } from '../interfaces/IPallet';
import SequelizeUser from '../database/models/SequelizeUser';
import SequelizeProduct from '../database/models/SequelizeProduct';
import SequelizeSlot from '../database/models/SequelizeSlot';
import { Op } from 'sequelize';
import * as QRCode from 'qrcode';

export class PalletService {
  private PALLET_NOT_FOUND = 'Pallet not found';
  private PALLET_ALREADY_EXISTS = 'Pallet already exists, please try a different QR code';
  private ERROR_CREATING_PALLET = 'Failed to create pallet, please try again';
  private ERROR_FETCHING_PALLETS = 'Failed to get pallets, please try again';
  private ERROR_UPDATING_PALLET = 'Failed to update pallet, please try again';
  private ERROR_DELETING_PALLET = 'Failed to delete pallet, please try again';

  private palletModel = SequelizePallet;
  private userModel = SequelizeUser;
  private productModel = SequelizeProduct;
  private slotModel = SequelizeSlot;

  public async findAll(): Promise<IResponse<IPallet[]>> {
    try {
      const pallets = await this.palletModel.findAll();
      
      if (!pallets || pallets.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No pallets found' } };
      }

      return { status: 'SUCCESSFUL', data: pallets };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findById(id: number): Promise<IResponse<IPallet | null>> {
    try {
      const pallet = await this.palletModel.findByPk(id);
      
      if (!pallet) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: pallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findBySlot(slotId: number): Promise<IResponse<IPallet[]>> {
    try {
      const pallets = await this.palletModel.findAll({ where: { slotId } });
      
      if (!pallets || pallets.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No pallets found in this slot' } };
      }
      
      return { status: 'SUCCESSFUL', data: pallets };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findByType(type: 'master' | 'single'): Promise<IResponse<IPallet[]>> {
    try {
      const pallets = await this.palletModel.findAll({ where: { type } });
      
      if (!pallets || pallets.length === 0) {
        return { status: 'NOT_FOUND', data: { message: `No ${type} pallets found` } };
      }
      
      return { status: 'SUCCESSFUL', data: pallets };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findByQrCode(qrCode: string): Promise<IResponse<IPallet | null>> {
    try {
      const pallet = await this.palletModel.findOne({ where: { qrCode } });
      
      if (!pallet) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: pallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findByQrCodeSmall(qrCodeSmall: string): Promise<IResponse<IPallet | null>> {
    try {
      const pallet = await this.palletModel.findOne({ where: { qrCodeSmall } });
      
      if (!pallet) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: pallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async findUnassigned(): Promise<IResponse<IPallet[]>> {
    try {
      const pallets = await this.palletModel.findAll({ where: { slotId: null } });
      
      if (!pallets || pallets.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No unassigned pallets found' } };
      }
      
      return { status: 'SUCCESSFUL', data: pallets };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PALLETS } };
    }
  }

  public async create(palletData: { 
    type: 'master' | 'single'; 
    slotId?: number | null;
    userId?: number | null;
    productId?: number | null;
  }): Promise<IResponse<IPallet>> {
    try {
      // Validate user if provided
      if (palletData.userId) {
        const user = await this.userModel.findByPk(palletData.userId);
        if (!user) {
          return { status: 'NOT_FOUND', data: { message: 'User not found' } };
        }
      }

      // Validate product if provided
      if (palletData.productId) {
        const product = await this.productModel.findByPk(palletData.productId);
        if (!product) {
          return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
        }
      }

      // Validate and check slot availability if provided
      if (palletData.slotId) {
        const slot = await this.slotModel.findByPk(palletData.slotId);
        if (!slot) {
          return { status: 'NOT_FOUND', data: { message: 'Slot not found' } };
        }
        if (slot.status !== 'available') {
          return { status: 'CONFLICT', data: { message: 'Slot is not available' } };
        }
      }

      // Generate simple QR codes (text format instead of SVG to avoid potential issues)
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      const qrCodeText = `PAL-${palletData.type.toUpperCase()}-${timestamp}-${randomSuffix}`;
      const qrCodeSmallText = `PAL-SM-${timestamp}-${randomSuffix}`;

      const dataToCreate = {
        type: palletData.type,
        slotId: palletData.slotId || null,
        userId: palletData.userId || null,
        productId: palletData.productId || null,
        qrCode: qrCodeText,
        qrCodeSmall: qrCodeSmallText,
      };
      
      const newPallet = await this.palletModel.create(dataToCreate);
      
      if (!newPallet) {
        return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PALLET } };
      }

      // Update slot status if a slot was assigned
      if (palletData.slotId) {
        await this.slotModel.update(
          { status: 'occupied' },
          { where: { id: palletData.slotId } }
        );
      }
      
      return { status: 'CREATED', data: newPallet.get() };
    } catch (error) {
      console.error('Error creating pallet:', error);
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PALLET } };
    }
  }

  public async update(
    id: number, 
    palletData: Partial<{ type: 'master' | 'single'; slotId?: number | null; qrCode: string; qrCodeSmall: string }>
  ): Promise<IResponse<IPallet | null>> {
    try {
      // Check if trying to update QR codes to existing ones
      if (palletData.qrCode || palletData.qrCodeSmall) {
        const existingPallet = await this.palletModel.findOne({ 
          where: { 
            [Op.or]: [
              ...(palletData.qrCode ? [{ qrCode: palletData.qrCode }] : []),
              ...(palletData.qrCodeSmall ? [{ qrCodeSmall: palletData.qrCodeSmall }] : [])
            ]
          } 
        });
        
        if (existingPallet && existingPallet.id !== id) {
          return { status: 'CONFLICT', data: { message: this.PALLET_ALREADY_EXISTS } };
        }
      }

      const [affectedRows] = await this.palletModel.update(
        palletData,
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }

      const updatedPallet = await this.palletModel.findByPk(id);
      return { status: 'SUCCESSFUL', data: updatedPallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
    }
  }

  public async assignToSlot(id: number, slotId: number): Promise<IResponse<IPallet | null>> {
    try {
      const [affectedRows] = await this.palletModel.update(
        { slotId },
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }

      const updatedPallet = await this.palletModel.findByPk(id);
      return { status: 'SUCCESSFUL', data: updatedPallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
    }
  }

  public async unassignFromSlot(id: number): Promise<IResponse<IPallet | null>> {
    try {
      const [affectedRows] = await this.palletModel.update(
        { slotId: null },
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }

      const updatedPallet = await this.palletModel.findByPk(id);
      return { status: 'SUCCESSFUL', data: updatedPallet };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PALLET } };
    }
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const deletedRows = await this.palletModel.destroy({ where: { id } });
      
      if (deletedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PALLET_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: true };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_PALLET } };
    }
  }
}
