//
import { IUserModel } from '../interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

class UserModel implements IUserModel {
  //
  constructor(private userModel = SequelizeUser) { }

  public async getByEmail(email: string) {
    //
    const user = await this.userModel.findOne({ where: { email } });
    
    if (!user) {
      return null;
    }

    const { id, username, password, role } = user;

    return { id, username, email, password, role };
  }
}

export default UserModel;