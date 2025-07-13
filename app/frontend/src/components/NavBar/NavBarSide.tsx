import { FaArrowRight, FaHome, FaUser, FaBox } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { User } from '../../types/UserTypes';
import useDashboard from '../../hooks/userUser';
import { 
  NavLink, 
  Box, 
  Stack, 
  Group, 
  Avatar, 
  Text, 
  UnstyledButton, 
  Tooltip,
  Divider
} from '@mantine/core';

const NavBarSide = () => {
  const user: User = JSON.parse(localStorage.getItem('user') || '{}');
  const { handleLogout } = useDashboard();
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Home', 
      icon: <FaHome size={20} />, 
      path: '/dashboard' 
    },
    { 
      label: 'Users', 
      icon: <FaUser size={20} />, 
      path: '/dashboard/users' 
    },
    { 
      label: 'Items', 
      icon: <FaBox size={20} />, 
      path: '/dashboard/items' 
    },
  ];

  return (
    <Box h="100vh" p="md">
      <Stack justify="space-between" h="100%">
        <Box>
          {user && user.username && (
            <Group mb="xl" p="sm">
              <Avatar
                src={user.image}
                alt={user.username}
                radius="xl"
                size="lg"
              />
              <Box style={{ flex: 1 }}>
                <Text size="sm" fw={500}>
                  {user.username}
                </Text>
                <Text c="dimmed" size="xs">
                  {user.email}
                </Text>
              </Box>
            </Group>
          )}

          <Divider mb="md" />

          <Stack gap="xs">
            {navigationItems.map((item) => (
              <NavLink
                key={item.path}
                component={Link}
                to={item.path}
                label={item.label}
                leftSection={item.icon}
                active={location.pathname === item.path}
                variant="filled"
                style={{
                  borderRadius: '8px',
                }}
              />
            ))}

            <Divider my="sm" />

            <Tooltip label="Logout" position="right">
              <UnstyledButton
                onClick={handleLogout}
                w="100%"
                p="sm"
                style={{
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                }}
              >
                <Group>
                  <FaArrowRight size={20} color="#fa5252" />
                  <Text size="sm" c="red">
                    Logout
                  </Text>
                </Group>
              </UnstyledButton>
            </Tooltip>
          </Stack>
        </Box>

        <Box p="sm" style={{ borderTop: '1px solid #e9ecef' }}>
          <Text size="xs" c="dimmed" ta="center">
            Developed by Rafael Guedes
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default NavBarSide;