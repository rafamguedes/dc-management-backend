import { useState } from 'react';
import { 
  Stack, 
  Card, 
  SimpleGrid, 
  Group, 
  Text, 
  Badge, 
  Button, 
  Grid, 
  Paper, 
  Title 
} from '@mantine/core';
import { BarChart, PieChart } from '@mantine/charts';
import { FaUsers, FaUserPlus, FaEye } from 'react-icons/fa';
import { useDisclosure } from '@mantine/hooks';
import { User as UserType } from '../../types/UserTypes';
import UserTable from '../Table/Table';
import CreateUserModal from './CreateUserModal';

interface UserProps {
  users: UserType[];
  loading: boolean;
  editingId: number | null;
  editedRole: string;
  handleEdit: (id: number, role: string) => void;
  handleUpdate: (id: number) => void;
  handleDelete: (id: number) => void;
  handleFilter: (role: string) => void;
  setEditedRole: (role: string) => void;
  onUserCreated?: () => void;
}

export function UserComponent({ 
  users,
  editingId, 
  editedRole, 
  handleEdit, 
  handleUpdate, 
  handleDelete,
  setEditedRole,
  onUserCreated
}: UserProps) {
  const [viewMode, setViewMode] = useState<'charts' | 'table'>('charts');
  const [createModalOpened, { open: openCreateModal, close: closeCreateModal }] = useDisclosure(false);

  const roleDistribution = users.reduce((acc, user) => {
    const role = user.role || 'Unknown';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(roleDistribution).map(([role, count]) => ({
    name: role,
    value: count,
    color: role === 'admin' ? 'red.6' : role === 'user' ? 'blue.6' : 'gray.6'
  }));

  const barChartData = Object.entries(roleDistribution).map(([role, count]) => ({
    role: role,
    users: count,
  }));
  
  const totalUsers = users.length;
  const adminCount = users.filter(user => user.role === 'admin').length;
  const userCount = users.filter(user => user.role === 'user').length;

  return (
    <Stack gap="lg">
      <Group justify="space-between" mb="lg">
        <Title order={2}>Users</Title>
        <Group>
          <Button
            variant={viewMode === 'charts' ? 'filled' : 'light'}
            leftSection={<FaEye size={16} />}
            onClick={() => setViewMode('charts')}
          >
            Analytics
          </Button>
          <Button
            variant={viewMode === 'table' ? 'filled' : 'light'}
            leftSection={<FaUsers size={16} />}
            onClick={() => setViewMode('table')}
          >
            Users Table
          </Button>
          <Button
            variant="outline"
            leftSection={<FaUserPlus size={16} />}
            onClick={openCreateModal}
          >
            Add User
          </Button>
        </Group>
      </Group>

      {viewMode === 'charts' ? (
        <Stack gap="lg">
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
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
          </SimpleGrid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Paper shadow="sm" p="lg" radius="md" withBorder>
                <Title order={3} mb="md">User Distribution by Role</Title>
                <BarChart
                  h={300}
                  data={barChartData}
                  dataKey="role"
                  series={[
                    { name: 'users', color: 'blue.6' },
                  ]}
                  tickLine="y"
                />
              </Paper>
            </Grid.Col>
            
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Paper shadow="sm" p="lg" radius="md" withBorder>
                <Title order={3} mb="md">Role Distribution</Title>
                <PieChart
                  h={300}
                  data={pieChartData}
                  withLabelsLine
                  labelsPosition="outside"
                  labelsType="percent"
                  withTooltip
                />
              </Paper>
            </Grid.Col>
          </Grid>
        </Stack>
      ) : (
        <Stack gap="md">
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <UserTable
              users={users}
              editingId={editingId}
              editedRole={editedRole}
              handleUpdate={handleUpdate}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              setEditedRole={setEditedRole}
            />
          </Paper>
        </Stack>
      )}

      <CreateUserModal 
        opened={createModalOpened} 
        onClose={closeCreateModal} 
        onUserCreated={onUserCreated}
      />
    </Stack>
  );
}
