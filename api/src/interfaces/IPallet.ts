export interface IPallet {
  id?: number;
  type: 'master' | 'single';
  slotId?: number | null;
  userId?: number | null;
  productId?: number | null;
  qrCode?: string;
  qrCodeSmall?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
