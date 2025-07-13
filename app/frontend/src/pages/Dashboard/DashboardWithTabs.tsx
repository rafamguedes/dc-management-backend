import { Container, Tabs } from '@mantine/core';
import { FaUsers, FaBox } from 'react-icons/fa';
import useDashboard from '../../hooks/userUser';
import { UserComponent } from '../../components/User/User';
import { ItemsComponent } from '../../components/Items/Items';

export function DashboardWithTabs() {
  const {
    users,
    loading,
    editingId,
    editedRole,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleFilter,
    setEditedRole,
  } = useDashboard();

  return (
    <>
      <Container size="xl" py="md">
        <Tabs defaultValue="users" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="users" leftSection={<FaUsers size={16} />}>
              Users
            </Tabs.Tab>
            <Tabs.Tab value="items" leftSection={<FaBox size={16} />}>
              Items
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="users" pt="md">
            <UserComponent
              users={users}
              loading={loading}
              editingId={editingId}
              editedRole={editedRole}
              handleEdit={handleEdit}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleFilter={handleFilter}
              setEditedRole={setEditedRole}
            />
          </Tabs.Panel>

          <Tabs.Panel value="items" pt="md">
            <ItemsComponent />
          </Tabs.Panel>
        </Tabs>
      </Container>
    </>
  );
}
