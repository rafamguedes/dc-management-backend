import { api } from './api';
import { UserCreate, UserUpdate } from '../types/UserTypes';

export const createUser = async (userData: UserCreate) => {
  return api.post('/user', userData);
};

export const getUsers = async () => {
  return api.get('/user');
};

export const getUserId = async (userId: number) => {
  return api.get(`/user/${userId}`);
};

export const updateUser = async (userId: number, userData: UserUpdate) => {
  return api.put(`/user/${userId}`, userData);
};

export const deleteUser = async (userId: number) => {
  return api.delete(`/user/${userId}`);
};
