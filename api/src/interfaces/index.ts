export type NewEntity<T> = Omit<T, 'id'>;

export type ID = number;

export type Identifiable = { id: ID };

// User interfaces
export { IUser } from './IUser';
export { IUserModel } from './IUserModel';

// Product interfaces
export { IProduct } from './IProduct';
export { IProductModel } from './IProductModel';

// Pallet interfaces
export { IPallet } from './IPallet';
export { IPalletModel } from './IPalletModel';