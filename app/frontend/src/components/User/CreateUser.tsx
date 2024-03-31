import Swal from 'sweetalert2';
import { useState } from 'react';
import UserService from '../../services/UserService';
import IconCreate from '../../assets/images/icons/user1.svg';
import { avatarGenerate } from '../../utils/avatarGenerator';
import { FaEye, FaEyeSlash, FaGithub, FaLinkedinIn, FaUserPlus } from 'react-icons/fa';
import {
  Avatar,
  Button,
  ContainerUserCreate,
  Form,
  Header,
  Icons,
  InputBox,
  InputBoxEmailAndRole,
  InputBoxImage, InputBoxPassword, Main, Title, TitleMain } from './Style';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const handleCreateUser = async () => {

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
      return;
    }

    const data = { username, email, password, role, image };

    try {
      const res = await UserService.createUser(data);
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'User created successfully!',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleGenerateImage = async () => {
    const imageUrl = await avatarGenerate();
    setImage(imageUrl);
  };

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setImage('');
  };

  return (
    <ContainerUserCreate>
      <Header>
        <Title>
          <h1>Create User</h1>
        </Title>
        <Icons>
          <FaLinkedinIn size={ 25 } />
          <FaGithub size={ 25 } />
        </Icons>
      </Header>
      <Main>
        <Form>
          <TitleMain>
            <h2>New user</h2>
            <FaUserPlus size={ 25 } />
          </TitleMain>
          <InputBox>
            <input
              type="text"
              placeholder="Username"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
            />
          </InputBox>
          <InputBoxEmailAndRole>
            <input
              type="email"
              placeholder="Email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
            <select onChange={ (e) => setRole(e.target.value) }>
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </InputBoxEmailAndRole>
          <InputBoxImage>
            <input
              type="text"
              placeholder="Image URL"
              value={ image }
              onChange={ (e) => setImage(e.target.value) }
            />
            <button onClick={ () => handleGenerateImage() }>Generate</button>
          </InputBoxImage>
          <InputBoxPassword>
            <input
              type={ showPass ? 'text' : 'password' }
              placeholder="Password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
            <button onClick={ () => setShowPass(!showPass) }>
              {showPass ? <FaEye /> : <FaEyeSlash /> }
            </button>
            <input
              type={ showConfirmPass ? 'text' : 'password' }
              placeholder="Confirm password"
              value={ confirmPassword }
              onChange={ (e) => setConfirmPassword(e.target.value) }
            />
            <button onClick={ () => setShowConfirmPass(!showConfirmPass) }> 
              {showConfirmPass ? <FaEye /> : <FaEyeSlash /> }
            </button>
          </InputBoxPassword>
          <Button>
            <button onClick={ handleClear }>Clear</button>
            <button
              onClick={ () => handleCreateUser() }
            >
              Create
            </button>
          </Button>
        </Form>
      </Main>
      <Avatar>

          {image ? <img src={ image } /> : <img src={ IconCreate } />}
       </Avatar>
    </ContainerUserCreate>
  );
};

export default CreateUser;