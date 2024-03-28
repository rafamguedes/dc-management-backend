import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../interfaces/User/IUserModel';
import IUser from '../interfaces/User/IUser';

class UserModel implements IUserModel {
  private userModel: typeof SequelizeUser;

  constructor(userModel = SequelizeUser) {
    this.userModel = userModel;
  }

  public async getByEmail(email: string): Promise<IUser | null> {
    const user = await this.userModel.findOne({ where: { email } });

    return user ? this.formatUser(user) : null;
  }

  private formatUser({ id, username, email, password, role }: IUser): IUser {
    return { id, username, email, password, role };
  }
}

export { UserModel };