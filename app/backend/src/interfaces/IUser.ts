import { Identifiable } from '.';

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends Identifiable, ILogin {
  username: string;
  role: string;
  image: string;
}

export interface IUserRole {
  role: string;
}

export interface IUserToken {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    image?: string;
  };
}

export interface IUserUpdate extends Omit<IUser, 'id' | 'password'> {
  username: string;
  role: string;
  email: string;
  image: string;
}

export type IUserResponse = Omit<IUser, 'password'>;
