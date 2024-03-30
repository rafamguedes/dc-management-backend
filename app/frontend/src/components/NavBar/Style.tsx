import styled from 'styled-components';

export const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  width: 15%;
  heigth: 100vh;
  background-color: #1F2631;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }

  h2 {
    font-size: 1.5rem;
    color: #fff;
  }

  p {
    font-size: 1rem;
    color: #ccc;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 7px;
    background-color: #f5f5f5;
    color: #1F2631;
    cursor: pointer;
  }

  button:hover {
    background-color: #ccc;
  }
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  width: 100%;
  margin-top: -10rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style: none;
  }

  li {
    border-radius: 7px;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
  }

  li:hover {
    background-color: #f5f5f5;
    color: #1F2631;
  }

  a {
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  a:hover {
    color: #1F2631;
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  background-color: #1F2631;
  color: #fff;

  p {
    font-size: 0.7rem;
    letter-spacing: 1px;
  }
`;