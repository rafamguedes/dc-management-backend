import styled, { keyframes } from 'styled-components';

export const ContainerSpinner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 5rem;
  justify-content: center;
  align-items: center;

  h1 {
    color: #202020;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 1rem;
    letter-spacing: 0.1rem;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.section`
  border: 16px solid #202020;
  border-top: 16px solid #FFFFFF;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  animation: ${spin} 2s linear infinite;
`;
