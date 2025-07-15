import * as bcrypt from 'bcrypt';
import { JwtService } from './JwtService';
import { IResponse } from '../interfaces/IResponse';
import SequelizeUser from '../database/models/SequelizeUser';
import { ILogin, IUserToken } from '../interfaces/IUser';

export class AuthService {
  private USER_NOT_FOUND = 'User not found, please register first';
  private INVALID_CREDENTIALS_MESSAGE = 'Invalid email or password, please try again';
  private ERROR_CREATING_TOKEN = 'Error creating token, please try again';
  private INTERNAL_ERROR = 'Internal server error, please try again later';
  
  public async authenticateUser({ email, password }: ILogin): Promise<IResponse<IUserToken>> {
    try {
      const user = await SequelizeUser.findOne({ where: { email } });

      if (!user) {
        return { status: 'NOT_FOUND', data: { message: this.USER_NOT_FOUND } };
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return { status: 'UNAUTHORIZED', data: { message: this.INVALID_CREDENTIALS_MESSAGE } };
      }

      const token = JwtService.createToken({ id: user.id, email: user.email });

      const responseData = {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          image: user.image
        }
      };

      if (!token) {
        return { status: 'UNPROCESSABLE_ENTITY', data: { message: this.ERROR_CREATING_TOKEN } };
      }

      return { status: 'SUCCESSFUL', data: responseData };
    } catch (error) {
      return { status: 'INTERNAL_ERROR', data: { message: this.INTERNAL_ERROR } };
    }
  }
}