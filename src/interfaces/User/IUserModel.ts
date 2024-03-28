//
import { IUser, IUserResponse } from './IUser';

export interface IUserModel {
  getAllUsers(): Promise<IUser[] | null>;
  getByEmail(email: IUser['email']): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUserResponse | null>;
}