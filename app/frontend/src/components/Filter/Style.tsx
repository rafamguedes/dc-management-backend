import styled from 'styled-components';

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000; 
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-content: space-around;
  background-color: #ddd;
  color: #222; 
  width: 100%;
  height: 3rem;
  margin: 0 3rem 0 2.4rem;
  border-radius: 0.5rem;

  h1 {
    font-size: 1.5rem;
  }

  .totals {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 3rem;

    span {
      font-size: 1rem;
      margin: 0 1rem;
      color: #666;
      font-weight: 300;
    }
  }

  .filter {
    display: flex;
    align-items: center;
    justify-content: space-around;

    span {
      font-size: 1rem;
      margin: 0 1rem;
      color: #666;

      font-weight: 300;

    }

    select {
      padding: 0.2rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
      font-weight: 300;
      cursor: pointer;
      background-color: #fff;
    }

    option {
      font-size: 1rem;
      font-weight: 300;
    }

    select:focus {
      outline: none;
    }

    select:hover {
      background-color: #f0f0f0;
    }

    select:active {
      background-color: #f0f0f0;
    }
  }
`;