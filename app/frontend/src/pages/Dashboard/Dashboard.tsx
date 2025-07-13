import { 
  Container, 
  Grid, 
  Paper, 
  Title, 
  Text, 
  Group, 
  Card, 
  SimpleGrid, 
  Stack,
  Badge,
  Button,
  Box,
  Center
} from '@mantine/core';
import { FaUsers, FaBox, FaChartBar, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import useDashboard from '../../hooks/userUser';
import Header from '../../components/Header/Header';
import CreateUserModal from '../../components/User/CreateUserModal';

export function Dashboard() {
  const {
    users,
    handleRefresh,
  } = useDashboard();

  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);

  const totalUsers = users.length;
  const adminCount = users.filter(user => user.role === 'admin').length;
  const userCount = users.filter(user => user.role === 'user').length;

  return (
    <>
      <Header />
      <Container size="xl" py="md">
        <Stack gap="lg">
          <Paper shadow="sm" p="xl" radius="md" withBorder>
            <Group justify="space-between" align="center">
              <div>
                <Title order={1} mb="xs">
                  Welcome to Dashboard
                </Title>
                <Text size="lg" c="dimmed">
                  Manage your users and items efficiently
                </Text>
              </div>
              <FaChartBar size={48} color="blue" />
            </Group>
          </Paper>

          <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" fw={500}>
                    Total Users
                  </Text>
                  <Text fw={700} size="xl">
                    {totalUsers}
                  </Text>
                </div>
                <FaUsers size={24} color="blue" />
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" fw={500}>
                    Administrators
                  </Text>
                  <Text fw={700} size="xl">
                    {adminCount}
                  </Text>
                </div>
                <Badge color="red" variant="light">
                  Admin
                </Badge>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" fw={500}>
                    Regular Users
                  </Text>
                  <Text fw={700} size="xl">
                    {userCount}
                  </Text>
                </div>
                <Badge color="blue" variant="light">
                  User
                </Badge>
              </Group>
            </Card>

            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm" fw={500}>
                    Items
                  </Text>
                  <Text fw={700} size="xl">
                    0
                  </Text>
                </div>
                <FaBox size={24} color="purple" />
              </Group>
            </Card>
          </SimpleGrid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
                <Stack>
                  <Group justify="space-between">
                    <Title order={3}>User Management</Title>
                    <FaUsers size={24} color="blue" />
                  </Group>
                  <Text c="dimmed" size="sm">
                    Manage your users, view analytics, and handle user permissions.
                  </Text>
                  <Group>
                    <Button 
                      component={Link} 
                      to="/dashboard/users" 
                      variant="filled"
                      leftSection={<FaUsers size={16} />}
                    >
                      View Users
                    </Button>
                    <Button 
                      onClick={openCreateModal}
                      variant="light"
                      leftSection={<FaPlus size={16} />}
                    >
                      Create User
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Paper shadow="sm" p="lg" radius="md" withBorder h="100%">
                <Stack>
                  <Group justify="space-between">
                    <Title order={3}>Item Management</Title>
                    <FaBox size={24} color="purple" />
                  </Group>
                  <Text c="dimmed" size="sm">
                    Handle your items, inventory, and product management.
                  </Text>
                  <Group>
                    <Button 
                      component={Link} 
                      to="/dashboard/items" 
                      variant="filled"
                      leftSection={<FaBox size={16} />}
                    >
                      View Items
                    </Button>
                    <Button 
                      variant="light"
                      disabled
                      leftSection={<FaPlus size={16} />}
                    >
                      Create Item
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>

          <Paper shadow="sm" p="lg" radius="md" withBorder>
            <Title order={3} mb="md">Recent Activity</Title>
            <Center py="xl">
              <Box ta="center">
                <Text c="dimmed" size="sm">
                  No recent activity to display
                </Text>
              </Box>
            </Center>
          </Paper>
        </Stack>
      </Container>
      
      <CreateUserModal 
        opened={createModalOpened} 
        onClose={closeCreateModal} 
        onUserCreated={handleRefresh}
      />
    </>
  );
}