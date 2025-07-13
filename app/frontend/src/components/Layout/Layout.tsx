import { AppShell } from '@mantine/core';
import NavBarSide from '../../components/NavBar/NavBarSide';
import { Outlet } from 'react-router';

export function Layout() {
  return (
    <AppShell
      navbar={{ width: 280, breakpoint: 'sm' }}
      padding="md"
    >
      <AppShell.Navbar>
        <NavBarSide />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}