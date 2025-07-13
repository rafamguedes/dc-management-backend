import { 
  Group, 
  Title, 
  ActionIcon, 
  Tooltip,
  Paper
} from '@mantine/core';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  const location = useLocation();

  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/dashboard':
        return 'Dashboard Management';
      case '/dashboard/users':
        return 'User Management';
      case '/dashboard/items':
        return 'Item Management';
      default:
        return 'Dashboard';
    }
  };

  return (
    <Paper shadow="sm" p="md" mb="md" withBorder>
      <Group justify="space-between" align="center">
        <Title order={1} size="h2" c="dark">
          {getPageTitle()}
        </Title>

        <Group gap="xs" data-testid="iconsHeader">
          <Tooltip label="LinkedIn Profile" position="bottom">
            <ActionIcon
              component="a"
              href="https://www.linkedin.com/in/rafael-magalh%C3%A3es-guedes/"
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              size="lg"
              color="blue"
            >
              <FaLinkedinIn size={20} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="GitHub Profile" position="bottom">
            <ActionIcon
              component="a"
              href="https://github.com/rafaelmagalhaesguedes"
              target="_blank"
              rel="noopener noreferrer"
              variant="subtle"
              size="lg"
              color="dark"
            >
              <FaGithub size={20} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Group>
    </Paper>
  );
};

export default Header;