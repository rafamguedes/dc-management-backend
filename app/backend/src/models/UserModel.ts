import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import { IUser, IUserResponse, IUserUpdate } from '../interfaces/User/IUser';

class UserModel implements IUserModel {
  private userModel: typeof SequelizeUser;

  constructor(userModel = SequelizeUser) {
    this.userModel = userModel;
  }


  public async getAll(): Promise<IUser[] | null> {

    const users = await this.userModel.findAll({ attributes: { exclude: ['password'] } });

    if (!users) return null;

    const userList = users.map((user) => user.get());

    return userList;
  }

  
  public async getByEmail(email: string): Promise<IUser | null> {

    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return null;

    return user.get();
  }


  public async getById(id: number): Promise<IUser | null> {

    const user = await this.userModel.findByPk(id, { attributes: { exclude: ['password'] } });

    if (!user) return null;

    return user.get();
  }


  public async create(user: IUser): Promise<IUserResponse | null> {

    const newUser = await this.userModel.create(user);

    if (!newUser) return null;
    
    const { password, ...userWithoutPassword } = newUser.get();

    return userWithoutPassword;
  }


  public async update(id: number, user: IUserUpdate): Promise<IUserResponse | null> {

    const userUpdate = await this.userModel.update({ ...user }, { where: { id } });

    if (!userUpdate) return null;

    const updatedUser = await this.getById(id);

    return updatedUser;
  }


  public async delete(id: number): Promise<boolean> {

    const destroyUser = await this.userModel.destroy({ where: { id } });

    if (!destroyUser) return false;

    return true;
  }

}

export { UserModel };