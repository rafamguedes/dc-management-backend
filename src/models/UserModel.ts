import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import { IUser, IUserResponse, IUserUpdate } from '../interfaces/User/IUser';

class UserModel implements IUserModel {
  private userModel: typeof SequelizeUser;

  constructor(userModel = SequelizeUser) {
    this.userModel = userModel;
  }


  public async getAllUsers(): Promise<IUser[] | null> {
    const users = await this.userModel.findAll({ attributes: { exclude: ['password'] } });

    if (!users) {
      return null;
    }

    return users.map((user) => user.get());
  }

  
  public async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user.get();
  }


  public async getById(id: number): Promise<IUser | null> {
    const user = await this.userModel.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) {
      return null;
    }

    return user.get();
  }


  public async createUser(user: IUser): Promise<IUserResponse | null> {
    const newUser = await this.userModel.create(user);

    if (!newUser) {
      return null;
    }
    
    const { password, ...userWithoutPassword } = newUser.get();

    return userWithoutPassword;
  }


  public async updateUser(id: number, user: IUserUpdate): Promise<IUserResponse | null> {
    const result = await this.userModel.update(user, { where: { id }, returning: true });

    let updatedUser;

    if (Array.isArray(result[1])) {
      updatedUser = result[1][0];
    }

    updatedUser = await this.userModel.findByPk(id);

    if (!updatedUser) {
      return null;
    }

    const { password, ...userWithoutPassword } = updatedUser.get();

    return userWithoutPassword;
  }

}

export { UserModel };