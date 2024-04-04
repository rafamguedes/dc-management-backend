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

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    margin: 0 1rem 1rem 1rem;
  }

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

  @media (max-width: 768px) {
    .totals {
      gap: 1rem;
    }

    span {
      font-size: 0.8rem;
      text-align: center;
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

  .icon-create-mobile {
    display: none;
  }

  @media (max-width: 768px) {
    .filter {
      gap: 1rem;
    }

    span {
      font-size: 0.8rem;
      text-align: center;
    }

    select {
      font-size: 0.8rem;
    }

    .icon-create-mobile {
      display: block;
    }
  }
`;