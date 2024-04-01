import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Container, Copy, Main, Section, Wrapper } from './Style';
import { useNavigate } from 'react-router';
import { User } from '../../types/UserTypes';
import UserService from '../../services/UserService';
import IconLogin from '../../assets/images/icons/userLogin.svg';
import { Loading } from '../../components/Loading/Loading';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const copyEmail = 'rick@admin.com';
  const copyPass = 'secret_admin';

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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
      }, 2000);
    } else if (type === 'password') {
      setCopiedPassword(true);
      setTimeout(() => {
        setCopiedPassword(false);
      }, 2000);
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
      <Section>
        <h1>User Manager System</h1>
        <h2>Manage your users in a simple and easy way</h2>
        <p>Test the system with credentials</p>
        <Copy>
          <input className="ipt" type="text" value={ copyEmail } data-testid="email" readOnly />
          <button data-testid="copied" className="copy-button" onClick={() => copyToClipboard(copyEmail, 'email')}>
            <FiCopy size={ 20 } />
          </button>

          {copiedEmail && <span className="tooltip">Copied!</span>}
        </Copy>

        <Copy>
          <input className="ipt" type="text" value={ copyPass } data-testid="password" readOnly />
          <button data-testid="copied" className="copy-button" onClick={() => copyToClipboard(copyPass, 'password')}>
            <FiCopy size={ 20 } />
          </button>
          {copiedPassword && <span className="tooltip">Copied!</span>}
        </Copy>
      </Section>
      <Main>

        <Wrapper>
          <img src={ IconLogin } alt="Login" />
          <h1>User Login</h1>
          <form onSubmit={ handleSubmit }>
            <div>
              <input
                type="text"
                value={ email }
                onChange={ (e) => setEmail(e.target.value) }
                required
                placeholder='Email'
              />
            </div>
            <div>
              <input
                type={ showPassword ? 'text' : 'password'}
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
                required
                placeholder='Password'
              />
              {showPassword ? (
                <FaEye className="iconEye" size={ 25 } onClick={ () => setShowPassword(false) } />
              ) : (
                <FaEyeSlash className="iconEye" size={ 25 } onClick={ () => setShowPassword(true) } />
              )}
            </div>
            <button type="submit">Login</button>
          </form>
        </Wrapper>
      </Main>
    </Container>
  );
}