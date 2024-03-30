import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 85%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10vh;
  padding: 1rem 0;
  background-color: #1F2631;
  color: #fff;
`;

export const Title = styled.div`
  width: 20%;

  h1 {
    font-size: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const Search = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 7px;
  }

  input:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 50%;
  }
`;

export const Icons = styled.div`  
  width: 10%;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SectionTable = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    overflow-x: auto;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  thead {
    background-color: #f5f5f5;
  }
  
  th, td {
    padding: 1em;
    text-align: left;
    font-size: 1rem;
  }

  td {
    font-size: 0.9rem;
    border-bottom: 1px solid #f1f1f1;
  }
  
  tr:hover {
    background-color: #f1f1f1;
  }
  
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    padding: 0.5rem;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover {
    background-color: #f5f5f5;
  }

  button img {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    table {
      width: 100%;
    }
  
    th, td {
      padding: 0.5em;
      font-size: 0.8rem;
    }
  
    img {
      width: 50px;
      height: 50px;
    }
  
    button img {
      width: 20px;
      height: 20px;
    }
  
    /* Add your additional mobile styles here */
    th, td {
      text-align: center;
    }
  
    button {
      padding: 1rem;
    }
  }
`;

export const NotFound = styled.div`
  width: 100%;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #ccc;

  h1 {
    font-size: 1.5rem;
    color: #ccc;
    text-align: center;
  }
`;