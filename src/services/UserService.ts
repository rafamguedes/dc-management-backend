import * as bcript from 'bcrypt';
import { IUserModel } from '../interfaces/User/IUserModel';
import { ServiceResponse } from '../utils/ServiceResponse';
import { IUser, IUserResponse, IUserUpdate } from '../interfaces/User/IUser';
import { UserModel } from '../models/UserModel';

// Constants for Service
const SALT_ROUNDS = 10;
const CONFLICT = 'CONFLICT';
const SUCCESSFUL = 'SUCCESSFUL';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const FAILED_USER_EXISTS = 'User already exists';
const FAILED_GET_USERS = 'Failed to get users';
const FAILED_REGISTER = 'Failed to register user';
const FAILED_UPDATE = 'Failed to update user';

class UserService {
  private userModel: IUserModel;

  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }


  public async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const users = await this.userModel.getAllUsers();

    if (!users) {
      return { status: INTERNAL_ERROR, data: { message: FAILED_GET_USERS } };
    }

    return { status: SUCCESSFUL, data: users };
  }
  

  public async registerUser(user: IUser): Promise<ServiceResponse<IUserResponse>> {
    const existingUser = await this.userModel.getByEmail(user.email);

    if (existingUser) {
      return { status: CONFLICT, data: { message: FAILED_USER_EXISTS } };
    }

    const passwordHash = await this.hashPassword(user.password);
    const newUser = await this.userModel.createUser({ ...user, password: passwordHash });

    if (!newUser) {
      return { status: INTERNAL_ERROR, data: { message: FAILED_REGISTER } };
    }

    return { status: SUCCESSFUL, data: newUser };
  }

  public async updateUser(id: number, user: IUserUpdate): Promise<ServiceResponse<IUserResponse>> {

    const userExists = await this.userModel.getById(id);

    if (!userExists) {
      return { status: INTERNAL_ERROR, data: { message: FAILED_USER_EXISTS } };
    }

    const updatedUser = await this.userModel.updateUser(id, user);

    if (!updatedUser) {
      return { status: INTERNAL_ERROR, data: { message: FAILED_UPDATE } };
    }

    return { status: SUCCESSFUL, data: updatedUser };
  }


  private async hashPassword(password: string): Promise<string> {
    return bcript.hash(password, SALT_ROUNDS);
  }

}

export { UserService };