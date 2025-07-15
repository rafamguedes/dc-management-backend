import { IUser, IUserResponse, IUserUpdate } from './IUser';

export interface IUserModel {
  getAll(): Promise<IUser[] | null>;
  getByEmail(email: IUser['email']): Promise<IUser | null>;
  getById(id: IUser['id']): Promise<IUser | null>;
  create(user: IUser): Promise<IUserResponse | null>;
  update(id: IUser['id'], user: IUserUpdate): Promise<IUserResponse | null>;
  delete(id: IUser['id']): Promise<boolean>;
}