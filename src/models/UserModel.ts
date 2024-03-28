import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import { IUser, IUserResponse } from '../interfaces/User/IUser';

class UserModel implements IUserModel {
  private userModel: typeof SequelizeUser;

  constructor(userModel = SequelizeUser) {
    this.userModel = userModel;
  }

  
  public async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });

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
}

export { UserModel };