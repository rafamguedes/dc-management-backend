import { IAisle } from './IAisle';

export interface IAisleModel {
  findAll(): Promise<IAisle[]>;
  findById(id: number): Promise<IAisle | null>;
  findBySector(sectorId: number): Promise<IAisle[]>;
  create(aisle: Omit<IAisle, 'id' | 'createdAt' | 'updatedAt'>): Promise<IAisle>;
  update(id: number, aisle: Partial<Omit<IAisle, 'id' | 'createdAt' | 'updatedAt'>>): Promise<IAisle | null>;
  delete(id: number): Promise<boolean>;
}
