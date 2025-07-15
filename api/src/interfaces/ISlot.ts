export type SlotStatus = 'available' | 'occupied' | 'maintenance';

export interface ISlot {
  id?: number;
  aisleId: number;
  code: string;
  floor: number;
  status?: SlotStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
