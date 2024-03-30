import NavBarSide from '../../components/NavBar/NavBarSide';
import { Container, Main, Section } from './Style';
import { Outlet } from 'react-router';

export function Layout() {

  return (
    <Container>
      <Main>
        <NavBarSide />
        <Section>
          <Outlet />
        </Section>
      </Main>
    </Container>
  );
}