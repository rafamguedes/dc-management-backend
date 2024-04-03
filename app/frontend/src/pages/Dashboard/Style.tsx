import styled from 'styled-components';

export const SectionTable = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  overflow-x: auto;

  @media (max-width: 768px) {
    padding: 1rem;
    width: 100%;
    overflow-x: auto;
  }
`;