import axios, { AxiosInstance } from 'axios';
import { UserCreate, UserUpdate } from '../types/UserTypes';

class UserService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3001',
    });
  }

  public async login(data: { email: string; password: string }) {
    const response = await this.api.post<{ token: string }>('/login', data);
    return response.data;
  }

  public async getUsers() {
    return this.api.get('/user');
  }
  
  public async getUserId(userId: number) {
    return this.api.get(`/user/${userId}`);
  }

  public async createUser(userData: UserCreate) {
    return this.api.post('/user', userData);
  }

  public async updateUser(userId: number, userData: UserUpdate) {
    return this.api.put(`/user/${userId}`, userData);
  }

  public async deleteUser(userId: number) {
    return this.api.delete(`/user/${userId}`);
  }
}

export default new UserService();