//
import * as bcript from 'bcrypt';
import UserModel from '../models/UserModel';
import JwtService from '../utils/JwtService';
import { IUserModel } from '../interfaces/User/IUserModel';
import { ServiceResponse } from '../utils/ServiceResponse';
import { ILogin, IUserRole, IToken } from '../interfaces/User/IUser';

export default class LoginService {
  //
  private errorMessage = 'Invalid email or password';

  constructor(private userModel: IUserModel = new UserModel()) { }

  public async signUp(data: ILogin): Promise<ServiceResponse<IToken>> {
    //
    const user = await this.userModel.getByEmail(data.email);

    if (!user || !bcript.compareSync(data.password, user.password)) {
      return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };
    }

    const token = JwtService.createToken({ id: user.id, email: user.email });

    if (!token) {
      return { status: 'INTERNAL_ERROR', data: { message: 'Internal error!' } };
    }

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string): Promise<ServiceResponse<IUserRole>> {
    //
    const user = await this.userModel.getByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: this.errorMessage } };

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
