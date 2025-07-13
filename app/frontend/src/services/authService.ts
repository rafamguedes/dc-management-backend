import { api } from './api';

export const login = async (data: { email: string; password: string }) => {
  const response = await api.post<{ token: string }>('/login', data);
  return response.data;
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};
