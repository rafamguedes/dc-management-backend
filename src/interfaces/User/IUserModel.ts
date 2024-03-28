//
import { IUser, IUserResponse, IUserUpdate } from './IUser';

export interface IUserModel {
  getAllUsers(): Promise<IUser[] | null>;
  getByEmail(email: IUser['email']): Promise<IUser | null>;
  getById(id: IUser['id']): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUserResponse | null>;
  updateUser(id: IUser['id'], user: IUserUpdate): Promise<IUserResponse | null>;
}