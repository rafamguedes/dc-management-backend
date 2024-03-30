import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Container, Main } from './Style';
import { useNavigate } from 'react-router';
import { User } from '../../types/UserTypes';
import { FaKey, FaUser } from 'react-icons/fa';
import UserService from '../../services/UserService';
import IconLogin from '../../assets/images/userIcon.svg';
import { Loading } from '../../components/Loading/Loading';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const { token } = await UserService.login({ email, password });

      const user = await UserService.getUsers();

      const loggedUser = user.data.find((user: User) => user.email === email);

      if (!loggedUser) throw new Error('User not found');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      navigate('/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email or password!',
        showConfirmButton: false,
        timer: 1500,
      });
      console.error('Failed to login:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <Main>
          <Loading />
        </Main>
      </Container>
    );
  }

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