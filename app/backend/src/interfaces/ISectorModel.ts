import { ISector } from './ISector';

export interface ISectorModel {
  findAll(): Promise<ISector[]>;
  findById(id: number): Promise<ISector | null>;
  create(sector: Omit<ISector, 'id' | 'createdAt' | 'updatedAt'>): Promise<ISector>;
  update(id: number, sector: Partial<Omit<ISector, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ISector | null>;
  delete(id: number): Promise<boolean>;
}
