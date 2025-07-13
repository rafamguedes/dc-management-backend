export interface IPalletProduct {
  id?: number;
  palletId: number;
  productId: number;
  quantity: number;
  expiryDate?: string;
  manufactureDate?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPalletProductCreate {
  palletId: number;
  productId: number;
  quantity: number;
  expiryDate?: string;
  manufactureDate?: string;
}

export interface IPalletProductUpdate {
  quantity?: number;
  expiryDate?: string;
  manufactureDate?: string;
}

export interface IPalletProductWithDetails extends IPalletProduct {
  product?: {
    id: number;
    name: string;
    code: string;
    category: string;
    weight?: number;
    dimensions?: string;
  };
  pallet?: {
    id: number;
    type: string;
    qrCode: string;
    qrCodeSmall: string;
    slotId?: number;
  };
}
