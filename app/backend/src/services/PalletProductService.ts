import { Op } from 'sequelize';
import SequelizePalletProduct from '../database/models/SequelizePalletProduct';
import SequelizePallet from '../database/models/SequelizePallet';
import SequelizeProduct from '../database/models/SequelizeProduct';
import { IPalletProductModel } from '../interfaces/IPalletProductModel';
import { IPalletProduct, IPalletProductCreate, IPalletProductUpdate, IPalletProductWithDetails } from '../interfaces/IPalletProduct';
import { IResponse } from '../interfaces/IResponse';

export class PalletProductService implements IPalletProductModel {
  private palletProductModel = SequelizePalletProduct;

  async findAll(): Promise<IResponse<IPalletProduct[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findById(id: number): Promise<IResponse<IPalletProduct | null>> {
    try {
      const palletProduct = await this.palletProductModel.findByPk(id);

      if (!palletProduct) {
        return {
          status: 'NOT_FOUND',
          data: null,
        };
      }

      return {
        status: 'SUCCESSFUL',
        data: palletProduct,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: null,
      };
    }
  }

  async findByPalletId(palletId: number): Promise<IResponse<IPalletProduct[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        where: { palletId },
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findByProductId(productId: number): Promise<IResponse<IPalletProduct[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        where: { productId },
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findWithDetails(): Promise<IResponse<IPalletProductWithDetails[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        include: [
          {
            model: SequelizePallet,
            as: 'pallet',
            attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
          },
          {
            model: SequelizeProduct,
            as: 'product',
            attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts as IPalletProductWithDetails[],
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findByPalletIdWithDetails(palletId: number): Promise<IResponse<IPalletProductWithDetails[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        where: { palletId },
        include: [
          {
            model: SequelizePallet,
            as: 'pallet',
            attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
          },
          {
            model: SequelizeProduct,
            as: 'product',
            attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts as IPalletProductWithDetails[],
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findByProductIdWithDetails(productId: number): Promise<IResponse<IPalletProductWithDetails[]>> {
    try {
      const palletProducts = await this.palletProductModel.findAll({
        where: { productId },
        include: [
          {
            model: SequelizePallet,
            as: 'pallet',
            attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
          },
          {
            model: SequelizeProduct,
            as: 'product',
            attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts as IPalletProductWithDetails[],
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findExpiringSoon(days: number = 7): Promise<IResponse<IPalletProductWithDetails[]>> {
    try {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + days);

      const palletProducts = await this.palletProductModel.findAll({
        where: {
          expiryDate: {
            [Op.lte]: expiryDate.toISOString().split('T')[0],
            [Op.gte]: new Date().toISOString().split('T')[0],
          },
        },
        include: [
          {
            model: SequelizePallet,
            as: 'pallet',
            attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
          },
          {
            model: SequelizeProduct,
            as: 'product',
            attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
          },
        ],
        order: [['expiryDate', 'ASC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts as IPalletProductWithDetails[],
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async findExpired(): Promise<IResponse<IPalletProductWithDetails[]>> {
    try {
      const today = new Date().toISOString().split('T')[0];

      const palletProducts = await this.palletProductModel.findAll({
        where: {
          expiryDate: {
            [Op.lt]: today,
          },
        },
        include: [
          {
            model: SequelizePallet,
            as: 'pallet',
            attributes: ['id', 'type', 'qrCode', 'qrCodeSmall', 'slotId'],
          },
          {
            model: SequelizeProduct,
            as: 'product',
            attributes: ['id', 'name', 'code', 'category', 'weight', 'dimensions'],
          },
        ],
        order: [['expiryDate', 'ASC']],
      });

      return {
        status: 'SUCCESSFUL',
        data: palletProducts as IPalletProductWithDetails[],
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: [],
      };
    }
  }

  async create(data: IPalletProductCreate): Promise<IResponse<IPalletProduct>> {
    try {
      // Check if the pallet-product combination already exists
      const existingPalletProduct = await this.palletProductModel.findOne({
        where: {
          palletId: data.palletId,
          productId: data.productId,
        },
      });

      if (existingPalletProduct) {
        return {
          status: 'CONFLICT',
          data: {} as IPalletProduct,
        };
      }

      const newPalletProduct = await this.palletProductModel.create(data);

      return {
        status: 'CREATED',
        data: newPalletProduct,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: {} as IPalletProduct,
      };
    }
  }

  async update(id: number, data: IPalletProductUpdate): Promise<IResponse<IPalletProduct | null>> {
    try {
      const palletProduct = await this.palletProductModel.findByPk(id);

      if (!palletProduct) {
        return {
          status: 'NOT_FOUND',
          data: null,
        };
      }

      await palletProduct.update(data);

      return {
        status: 'SUCCESSFUL',
        data: palletProduct,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: null,
      };
    }
  }

  async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const palletProduct = await this.palletProductModel.findByPk(id);

      if (!palletProduct) {
        return {
          status: 'NOT_FOUND',
          data: false,
        };
      }

      await palletProduct.destroy();

      return {
        status: 'SUCCESSFUL',
        data: true,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: false,
      };
    }
  }

  async removeByPallet(palletId: number): Promise<IResponse<boolean>> {
    try {
      const deletedCount = await this.palletProductModel.destroy({
        where: { palletId },
      });

      return {
        status: deletedCount > 0 ? 'SUCCESSFUL' : 'NOT_FOUND',
        data: deletedCount > 0,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: false,
      };
    }
  }

  async removeByProduct(productId: number): Promise<IResponse<boolean>> {
    try {
      const deletedCount = await this.palletProductModel.destroy({
        where: { productId },
      });

      return {
        status: deletedCount > 0 ? 'SUCCESSFUL' : 'NOT_FOUND',
        data: deletedCount > 0,
      };
    } catch (error) {
      return {
        status: 'INTERNAL_ERROR',
        data: false,
      };
    }
  }
}
