import * as bcrypt from 'bcrypt';
import { IResponse } from '../interfaces/IResponse';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUser, IUserResponse, IUserUpdate } from '../interfaces/IUser';

export class UserService {
  private USER_NOT_FOUND = 'User not found, please register first';
  private USER_ALREADY_EXISTS = 'User already exists, please try a different email';
  private ERROR_CREATING_USER = 'Failed to register user, please try again';
  private ERROR_FETCHING_USERS = 'Failed to get users, please try again';

  public async findAll(): Promise<IResponse<IUserResponse[]>> {
    const users = await SequelizeUser.findAll({ 
      attributes: { exclude: ['password'] } 
    });

    if (!users) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_FETCHING_USERS } };
    }

    return { status: 'SUCCESSFUL', data: users };
  }

  public async findById(id: number): Promise<IResponse<IUserResponse>> {
    const user = await SequelizeUser.findByPk(id, { 
      attributes: { exclude: ['password'] } 
    });

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
    }

    return { status: 'SUCCESSFUL', data: user };
  }

  public async create(user: IUser): Promise<IResponse<IUserResponse>> {
    const existingUser = await SequelizeUser.findOne({ where: { email: user.email } });

    if (existingUser) {
      return { status: 'CONFLICT', data: { message: this.USER_ALREADY_EXISTS } };
    }

    const passwordHash = await bcrypt.hash(user.password, 10);
    const newUser = await SequelizeUser.create({ ...user, password: passwordHash });

    if (!newUser) {
      return { status: 'INTERNAL_ERROR', data: { message: this.ERROR_CREATING_USER } };
    }

    const { password, ...userWithoutPassword } = newUser.get();
    return { status: 'SUCCESSFUL', data: userWithoutPassword };
  }

  public async update(id: number, 
    user: IUserUpdate
  ): Promise<IResponse<IUserResponse>> {
    const [affectedRows] = await SequelizeUser.update(user, { where: { id } });

    if (affectedRows === 0) {
      return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
    }

    const updatedUser = await SequelizeUser.findByPk(id, { 
      attributes: { exclude: ['password'] } 
    });

    return { status: 'SUCCESSFUL', data: updatedUser! };
  }

  public async remove(id: number): Promise<IResponse<boolean>> {
    const deletedRows = await SequelizeUser.destroy({ where: { id } });

    if (deletedRows === 0) {
      return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
    }

    return { status: 'SUCCESSFUL', data: true };
  }
}