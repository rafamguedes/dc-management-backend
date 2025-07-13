import { IResponse } from './IResponse';
import { IPalletProduct, IPalletProductCreate, IPalletProductUpdate, IPalletProductWithDetails } from './IPalletProduct';

export interface IPalletProductModel {
  findAll(): Promise<IResponse<IPalletProduct[]>>;
  findById(id: number): Promise<IResponse<IPalletProduct | null>>;
  findByPalletId(palletId: number): Promise<IResponse<IPalletProduct[]>>;
  findByProductId(productId: number): Promise<IResponse<IPalletProduct[]>>;
  findWithDetails(): Promise<IResponse<IPalletProductWithDetails[]>>;
  findByPalletIdWithDetails(palletId: number): Promise<IResponse<IPalletProductWithDetails[]>>;
  findByProductIdWithDetails(productId: number): Promise<IResponse<IPalletProductWithDetails[]>>;
  findExpiringSoon(days: number): Promise<IResponse<IPalletProductWithDetails[]>>;
  findExpired(): Promise<IResponse<IPalletProductWithDetails[]>>;
  create(data: IPalletProductCreate): Promise<IResponse<IPalletProduct>>;
  update(id: number, data: IPalletProductUpdate): Promise<IResponse<IPalletProduct | null>>;
  remove(id: number): Promise<IResponse<boolean>>;
  removeByPallet(palletId: number): Promise<IResponse<boolean>>;
  removeByProduct(productId: number): Promise<IResponse<boolean>>;
}
