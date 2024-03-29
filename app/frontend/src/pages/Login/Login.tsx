import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { token } = await UserService.login({ email, password });
      const user = await UserService.getUsers();

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user.data));

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        Email:
        <input
          type="text"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}