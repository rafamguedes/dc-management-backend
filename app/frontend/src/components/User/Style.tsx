import styled from 'styled-components';

export const ContainerUserCreate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #1F2631;
  padding: 1rem 0;
  height: 10vh;
`;

export const Title = styled.div`
  h1 {
    color: #fff;
    font-size: 2rem;
  }
`;

export const Icons = styled.div`
  width: 10%;
  display: flex;
  gap: 1rem;
  color: #fff;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 50%;
  margin: 0 2rem;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Avatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 22%;
  left: 72%;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 100%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
`;

export const TitleMain = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    w
    font-weight: 600;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

export const InputBoxImage = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  input {
    width: 70%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    width: 30%;
    padding: 0.5rem 1rem;
    background-color: #1F2631;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export const InputBoxEmailAndRole = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;

  input {
    width: 70%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  select {
    width: 30%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const InputBoxPassword = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;

  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    padding: 0.5rem;
    background-color: #1F2631;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  width: 100%;
  gap: 1rem;

  button {
    width: 30%;
    padding: 0.5rem 1rem;
    background-color: #1F2631;
    color: #fff;
    font-weight: 500;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;