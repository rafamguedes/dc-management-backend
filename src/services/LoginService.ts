import * as bcrypt from 'bcrypt';
import { UserModel } from '../models/UserModel';
import { JwtService } from '../utils/JwtService';
import { ServiceResponse } from '../utils/ServiceResponse';
import { IUserModel } from '../interfaces/User/IUserModel';
import { ILogin, IUserRole, IToken } from '../interfaces/User/IUser';

// Constants for the service response
const SUCCESSFUL = 'SUCCESSFUL';
const UNAUTHORIZED = 'UNAUTHORIZED';
const INTERNAL_ERROR = 'INTERNAL_ERROR';
const ERROR_CREATE_TOKEN = 'Error creating token';
const INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password';

class LoginService {
  private userModel: IUserModel;

  constructor(userModel: IUserModel = new UserModel()) {
    this.userModel = userModel;
  }
  

  public async authenticateUser({ email, password }: ILogin): Promise<ServiceResponse<IToken>> {

    const user = await this.userModel.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return { status: UNAUTHORIZED, data: { message: INVALID_CREDENTIALS_MESSAGE } };
    }

    const token = JwtService.createToken({ id: user.id, email: user.email });

    if (!token) {
      return { status: INTERNAL_ERROR, data: { message: ERROR_CREATE_TOKEN } };
    }

    return { status: SUCCESSFUL, data: { token } };
  }
  

  public async fetchUserRole(email: string): Promise<ServiceResponse<IUserRole>> {
    
    const user = await this.userModel.getByEmail(email);

    if (!user) {
      return { status: UNAUTHORIZED, data: { message: INVALID_CREDENTIALS_MESSAGE } };
    }

    return { status: SUCCESSFUL, data: { role: user.role } };
  }

}

export { LoginService };