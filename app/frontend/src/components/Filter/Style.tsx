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
  margin: 0 3rem 0 2.4rem;
  border-radius: 0.5rem;

  h1 {
    font-size: 1.5rem;
  }

  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 1rem;
        color: #000; 

        label {
          margin-right: 0.5rem;
          color: #000;
          cursor: pointer;
        }

        select {
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
        }
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 3rem;

    span {
      font-size: 1rem;
      margin: 0 1rem;
      color: #666;

      font-weight: 600;

    }
  }
`;