import styled from 'styled-components';
import bgLogin from '../../assets/images/bgLogin.jpg';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-image: url(${bgLogin});

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding: 50px;
  border-radius: 10px;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
    padding: 20px;
  }
    
  h1 {
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: #1C274C;
  }

  img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
    
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: flex;
      align-items: center;

      .icon {
        position: absolute;
        margin-left: 10px;
        color: #1C274C;
      }
    }
    
    input {
      width: 100%;
      height: 40px;
      padding: 10px 35px;
      border-radius: 5px;
      border: 1px solid #ddd;
    }

    input::placeholder {
      font-family: 'Poppins', sans-serif;
      font-size: 0.8rem;
      color: #888;
    }

    input:focus {
      outline: none;
      border: 1px solid #333;
    }
  }
    
  button {
    align-self: center;
    margin-top: 20px;
    padding: 10px 50px;
    border-radius: 5px;
    border: none;
    background-color: #324da4;
    color: #fff;
    font-family: 'Poppins', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
  }

    button:hover {
      background-color: #555;
      letter-spacing: 1.5px;
      transition: 0.3s;
    }
`;