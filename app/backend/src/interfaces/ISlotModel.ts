import { ISlot, SlotStatus } from './ISlot';

export interface ISlotModel {
  findAll(): Promise<ISlot[]>;
  findById(id: number): Promise<ISlot | null>;
  findByAisle(aisleId: number): Promise<ISlot[]>;
  findByStatus(status: SlotStatus): Promise<ISlot[]>;
  findByFloor(floor: number): Promise<ISlot[]>;
  create(slot: Omit<ISlot, 'id' | 'createdAt' | 'updatedAt'>): Promise<ISlot>;
  update(id: number, slot: Partial<Omit<ISlot, 'id' | 'createdAt' | 'updatedAt'>>): Promise<ISlot | null>;
  updateStatus(id: number, status: SlotStatus): Promise<ISlot | null>;
  delete(id: number): Promise<boolean>;
}
