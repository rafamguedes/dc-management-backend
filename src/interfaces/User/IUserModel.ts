//
import { IUser, IUserResponse } from './IUser';

export interface IUserModel {
  getByEmail(email: IUser['email']): Promise<IUser | null>;
  createUser(user: IUser): Promise<IUserResponse | null>;
}