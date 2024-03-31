import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column-reverse;
    height: 100%;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 100vh;
  gap: 1rem;

  h1 {
    font-family: 'Poppins', sans-serif;
    font-size: 5rem;
    color: #222;
    text-align: center;
  }

  h2 {
    font-family: 'Poppins', sans-serif;
    font-size: 1.5rem;
    color: #444;
    text-align: center;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: #333;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 3rem;
    gap: 1rem;

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  padding: 50px;
  border-radius: 10px;
  background-color: #eee;

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
    padding: 20px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  width: 100%;
  padding: 50px;
  border-radius: 10px;

  h1 {
    margin-bottom: 20px;
    font-family: 'Poppins', sans-serif;
    font-size: 2rem;
    color: #202020;
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
      padding: 10px;
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

  @media (max-width: 768px) {
    padding: 20px;

    h1 {
      font-size: 1.5rem;
    }

    img {
      width: 50px;
      height: 50px;
    }

    form {
      gap: 0.5rem;

      input {
        height: 30px;
        padding: 5px;
      }

      input::placeholder {
        font-size: 0.7rem;
      }
    }
  }
    
  button {
    align-self: center;
    margin-top: 10px;
    padding: 8px 50px;
    border-radius: 5px;
    border: none;
    background-color: #0C0C0C;
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

  .iconEye {
    margin-left: -30px;
    cursor: pointer;
  }
`;