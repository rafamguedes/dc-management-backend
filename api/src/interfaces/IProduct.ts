export interface IProduct {
  id?: number;
  code: string;
  name: string;
  description?: string | null;
  unit: string;
  createdAt?: Date;
  updatedAt?: Date;
}
