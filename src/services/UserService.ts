import * as bcript from 'bcrypt';
import { IUserModel } from '../interfaces/User/IUserModel';
import { ServiceResponse } from '../utils/ServiceResponse';
import { IUser, IUserResponse } from '../interfaces/User/IUser';
import { UserModel } from '../models/UserModel';

// Constants for Service
const SALT_ROUNDS = 10;
const CONFLICT = 'CONFLICT';
const SUCCESSFUL = 'SUCCESSFUL';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const USER_ALREADY_EXISTS = 'User already exists';
const FAILED_TO_REGISTER = 'Failed to register user';

class UserService {
  private userModel: IUserModel;

  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }


  public async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const users = await this.userModel.getAllUsers();

    if (!users) {
      return { status: INTERNAL_ERROR, data: { message: 'Failed to fetch users' } };
    }

    return { status: SUCCESSFUL, data: users };
  }
  

  public async registerUser(user: IUser): Promise<ServiceResponse<IUserResponse>> {
    const existingUser = await this.userModel.getByEmail(user.email);

    if (existingUser) {
      return { status: CONFLICT, data: { message: USER_ALREADY_EXISTS } };
    }

    const passwordHash = bcript.hashSync(user.password, SALT_ROUNDS);
    const newUser = await this.userModel.createUser({ ...user, password: passwordHash });

    if (!newUser) {
      return { status: INTERNAL_ERROR, data: { message: FAILED_TO_REGISTER } };
    }

    return { status: SUCCESSFUL, data: newUser };
  }

}

export { UserService };