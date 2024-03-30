import React, { useState } from 'react';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router';
import { Container, Main } from './Style';
import IconLogin from '../../assets/images/userIcon.svg';
import { FaKey, FaUser } from 'react-icons/fa';
import { User } from '../../types/UserTypes';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { token } = await UserService.login({ email, password });

      const user = await UserService.getUsers();

      const loggedUser = user.data.find((user: User) => user.email === email);

      if (!loggedUser) throw new Error('User not found');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  return (
    <Container>
      <Main>
        <img src={ IconLogin } alt="Login" />
        <h1>Login</h1>
        <form onSubmit={ handleSubmit }>
          <div>
            <FaUser className="icon" />
            <input
              type="text"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
              required
              placeholder='Email'
            />
          </div>
          <div>
            <FaKey className="icon" />
            <input
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
              required
              placeholder='Password'
            />
          </div>
          <button type="submit">Sign in</button>
        </form>
      </Main>
    </Container>
  );
}