import SequelizeProduct from '../database/models/SequelizeProduct';
import { IResponse } from '../interfaces/IResponse';
import { IProduct } from '../interfaces/IProduct';

export class ProductService {
  private PRODUCT_NOT_FOUND = 'Product not found';
  private PRODUCT_ALREADY_EXISTS = 'Product already exists, please try a different code';
  private ERROR_CREATING_PRODUCT = 'Failed to create product, please try again';
  private ERROR_FETCHING_PRODUCTS = 'Failed to get products, please try again';
  private ERROR_UPDATING_PRODUCT = 'Failed to update product, please try again';
  private ERROR_DELETING_PRODUCT = 'Failed to delete product, please try again';

  public async findAll(): Promise<IResponse<IProduct[]>> {
    try {
      const products = await SequelizeProduct.findAll();
      
      if (!products || products.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No products found' } };
      }

      return { status: 'SUCCESSFUL', data: products };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
    }
  }

  public async findById(id: number): Promise<IResponse<IProduct | null>> {
    try {
      const product = await SequelizeProduct.findByPk(id);
      
      if (!product) {
        return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: product };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
    }
  }

  public async findByCode(code: string): Promise<IResponse<IProduct | null>> {
    try {
      const product = await SequelizeProduct.findOne({ where: { code } });
      
      if (!product) {
        return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: product };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
    }
  }

  public async findByUnit(unit: string): Promise<IResponse<IProduct[]>> {
    try {
      const products = await SequelizeProduct.findAll({ where: { unit } });
      
      if (!products || products.length === 0) {
        return { status: 'NOT_FOUND', data: { message: 'No products found with this unit' } };
      }
      
      return { status: 'SUCCESSFUL', data: products };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_PRODUCTS } };
    }
  }

  public async create(productData: { 
    code: string; 
    name: string; 
    description?: string; 
    unit: string 
  }): Promise<IResponse<IProduct>> {
    try {
      const existingProduct = await SequelizeProduct.findOne({ where: { code: productData.code } });

      if (existingProduct) {
        return { status: 'CONFLICT', data: { message: this.PRODUCT_ALREADY_EXISTS } };
      }

      const dataToCreate = {
        code: productData.code,
        name: productData.name,
        description: productData.description || '',
        unit: productData.unit,
      };
      
      const newProduct = await SequelizeProduct.create(dataToCreate);
      
      if (!newProduct) {
        return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PRODUCT } };
      }
      
      return { status: 'CREATED', data: newProduct.get() };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_PRODUCT } };
    }
  }

  public async update(
    id: number, 
    productData: Partial<{ code: string; name: string; description?: string; unit: string }>
  ): Promise<IResponse<IProduct | null>> {
    try {
      if (productData.code) {
        const existingProduct = await SequelizeProduct.findOne({ 
          where: { code: productData.code }
        });
        
        if (existingProduct && existingProduct.id !== id) {
          return { status: 'CONFLICT', data: { message: this.PRODUCT_ALREADY_EXISTS } };
        }
      }

      const [affectedRows] = await SequelizeProduct.update(
        productData,
        { where: { id } }
      );

      if (affectedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
      }

      const updatedProduct = await SequelizeProduct.findByPk(id);
      return { status: 'SUCCESSFUL', data: updatedProduct };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_UPDATING_PRODUCT } };
    }
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    try {
      const deletedRows = await SequelizeProduct.destroy({ where: { id } });
      
      if (deletedRows === 0) {
        return { status: 'NOT_FOUND', data: { message: this.PRODUCT_NOT_FOUND } };
      }
      
      return { status: 'SUCCESSFUL', data: true };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_DELETING_PRODUCT } };
    }
  }
}