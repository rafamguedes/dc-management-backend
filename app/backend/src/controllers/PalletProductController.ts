import { Request, Response } from 'express';
import { PalletProductService } from '../services/PalletProductService';
import { StatusCodes } from '../utils/StatusCode';

export class PalletProductController {
  private palletProductService = new PalletProductService();

  async findAll(req: Request, res: Response): Promise<void> {
    const result = await this.palletProductService.findAll();
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.palletProductService.findById(Number(id));
    
    if (result.status === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Pallet product not found' });
      return;
    }
    
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findByPalletId(req: Request, res: Response): Promise<void> {
    const { palletId } = req.params;
    const result = await this.palletProductService.findByPalletId(Number(palletId));
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findByProductId(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const result = await this.palletProductService.findByProductId(Number(productId));
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findWithDetails(req: Request, res: Response): Promise<void> {
    const result = await this.palletProductService.findWithDetails();
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findByPalletIdWithDetails(req: Request, res: Response): Promise<void> {
    const { palletId } = req.params;
    const result = await this.palletProductService.findByPalletIdWithDetails(Number(palletId));
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findByProductIdWithDetails(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const result = await this.palletProductService.findByProductIdWithDetails(Number(productId));
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findExpiringSoon(req: Request, res: Response): Promise<void> {
    const days = Number(req.params.days) || 7;
    const result = await this.palletProductService.findExpiringSoon(days);
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async findExpired(req: Request, res: Response): Promise<void> {
    const result = await this.palletProductService.findExpired();
    res.status(StatusCodes[result.status]).json(result.data);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { palletId, productId, quantity, expiryDate, manufactureDate } = req.body;
    
    const result = await this.palletProductService.create({
      palletId,
      productId,
      quantity,
      expiryDate,
      manufactureDate,
    });

    if (result.status === 'CONFLICT') {
      res.status(StatusCodes.CONFLICT).json({ 
        message: 'This pallet-product combination already exists' 
      });
      return;
    }

    res.status(StatusCodes[result.status]).json(result.data);
  }

  async bulkCreate(req: Request, res: Response): Promise<void> {
    const { palletProducts } = req.body;
    const results = [];
    const errors = [];

    for (const palletProduct of palletProducts) {
      try {
        const result = await this.palletProductService.create(palletProduct);
        
        if (result.status === 'CONFLICT') {
          errors.push({
            palletId: palletProduct.palletId,
            productId: palletProduct.productId,
            error: 'Pallet-product combination already exists'
          });
        } else {
          results.push(result.data);
        }
      } catch (error) {
        errors.push({
          palletId: palletProduct.palletId,
          productId: palletProduct.productId,
          error: 'Failed to create pallet product'
        });
      }
    }

    res.status(StatusCodes.CREATED).json({
      created: results,
      errors: errors,
      summary: {
        total: palletProducts.length,
        created: results.length,
        failed: errors.length
      }
    });
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { quantity, expiryDate, manufactureDate } = req.body;

    const result = await this.palletProductService.update(Number(id), {
      quantity,
      expiryDate,
      manufactureDate,
    });

    if (result.status === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Pallet product not found' });
      return;
    }

    res.status(StatusCodes[result.status]).json(result.data);
  }

  async remove(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const result = await this.palletProductService.remove(Number(id));

    if (result.status === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Pallet product not found' });
      return;
    }

    res.status(StatusCodes.SUCCESSFUL).json({ message: 'Pallet product deleted successfully' });
  }

  async removeByPallet(req: Request, res: Response): Promise<void> {
    const { palletId } = req.params;
    const result = await this.palletProductService.removeByPallet(Number(palletId));

    if (result.status === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({ 
        message: 'No pallet products found for this pallet' 
      });
      return;
    }

    res.status(StatusCodes.SUCCESSFUL).json({ 
      message: 'All pallet products for this pallet deleted successfully' 
    });
  }

  async removeByProduct(req: Request, res: Response): Promise<void> {
    const { productId } = req.params;
    const result = await this.palletProductService.removeByProduct(Number(productId));

    if (result.status === 'NOT_FOUND') {
      res.status(StatusCodes.NOT_FOUND).json({ 
        message: 'No pallet products found for this product' 
      });
      return;
    }

    res.status(StatusCodes.SUCCESSFUL).json({ 
      message: 'All pallet products for this product deleted successfully' 
    });
  }

  async getInventorySummary(req: Request, res: Response): Promise<void> {
    try {
      // Get all pallet products with details
      const allResult = await this.palletProductService.findWithDetails();
      const expiredResult = await this.palletProductService.findExpired();
      const expiringSoonResult = await this.palletProductService.findExpiringSoon(7);

      if (allResult.status !== 'SUCCESSFUL' || !Array.isArray(allResult.data)) {
        res.status(StatusCodes.INTERNAL_ERROR).json({ 
          message: 'Failed to retrieve inventory data' 
        });
        return;
      }

      const allProducts = allResult.data;
      const expiredProducts = Array.isArray(expiredResult.data) ? expiredResult.data : [];
      const expiringSoonProducts = Array.isArray(expiringSoonResult.data) ? expiringSoonResult.data : [];

      const totalQuantity = allProducts.reduce((sum: number, item) => sum + item.quantity, 0);
      const uniquePallets = new Set(allProducts.map(item => item.palletId)).size;
      const uniqueProducts = new Set(allProducts.map(item => item.productId)).size;

      const summary = {
        totalPalletProducts: allProducts.length,
        totalQuantity,
        uniquePallets,
        uniqueProducts,
        expiredProducts: expiredProducts.length,
        expiringSoonProducts: expiringSoonProducts.length,
        byCategory: {} as Record<string, number>,
        byPalletType: {} as Record<string, number>
      };

      // Group by product category
      allProducts.forEach(item => {
        if (item.product?.category) {
          summary.byCategory[item.product.category] = 
            (summary.byCategory[item.product.category] || 0) + item.quantity;
        }
      });

      // Group by pallet type
      allProducts.forEach(item => {
        if (item.pallet?.type) {
          summary.byPalletType[item.pallet.type] = 
            (summary.byPalletType[item.pallet.type] || 0) + item.quantity;
        }
      });

      res.status(StatusCodes.SUCCESSFUL).json(summary);
    } catch (error) {
      res.status(StatusCodes.INTERNAL_ERROR).json({ 
        message: 'Failed to generate inventory summary' 
      });
    }
  }
}
