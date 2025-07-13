import { IPallet } from './IPallet';
import { IResponse } from './IResponse';

export interface IPalletModel {
  findAll(): Promise<IResponse<IPallet[]>>;
  findById(id: number): Promise<IResponse<IPallet | null>>;
  findBySlot(slotId: number): Promise<IResponse<IPallet[]>>;
  findByType(type: 'master' | 'single'): Promise<IResponse<IPallet[]>>;
  findByQrCode(qrCode: string): Promise<IResponse<IPallet | null>>;
  findByQrCodeSmall(qrCodeSmall: string): Promise<IResponse<IPallet | null>>;
  findUnassigned(): Promise<IResponse<IPallet[]>>;
  create(palletData: { 
    type: 'master' | 'single'; 
    slotId?: number | null; 
    qrCode: string; 
    qrCodeSmall: string 
  }): Promise<IResponse<IPallet>>;
  update(id: number, palletData: Partial<{ 
    type: 'master' | 'single'; 
    slotId?: number | null; 
    qrCode: string; 
    qrCodeSmall: string 
  }>): Promise<IResponse<IPallet | null>>;
  assignToSlot(id: number, slotId: number): Promise<IResponse<IPallet | null>>;
  unassignFromSlot(id: number): Promise<IResponse<IPallet | null>>;
  remove(id: number): Promise<IResponse<boolean>>;
}
