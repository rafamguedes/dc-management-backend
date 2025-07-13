import { IProduct } from './IProduct';

export interface IProductModel {
  findByPk(id: number, options?: any): Promise<IProductModel | null>;
  findAll(options?: any): Promise<IProductModel[]>;
  findOne(options?: any): Promise<IProductModel | null>;
  create(values?: Partial<IProduct>): Promise<IProductModel>;
  update(values: Partial<IProduct>, options?: any): Promise<[number, IProductModel[]]>;
  remove(options?: any): Promise<number>;
}
