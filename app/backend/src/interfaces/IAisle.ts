export interface IAisle {
  id?: number;
  sectorId: number;
  code: string;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
