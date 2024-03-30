import styled from 'styled-components';

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