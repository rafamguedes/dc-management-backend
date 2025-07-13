import { 
  Table, 
  Avatar, 
  Group, 
  Text, 
  ActionIcon, 
  Select, 
  Badge,
  Tooltip,
  Box
} from '@mantine/core';
import { FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { User } from '../../types/UserTypes';

type UserTableProps = {
  users: User[];
  editingId: number | null;
  editedRole: string;
  handleUpdate: (id: number) => void;
  handleEdit: (id: number, role: string) => void;
  handleDelete: (id: number) => void;
  setEditedRole: (role: string) => void;
}

const UserTable = ({
  users,
  editingId,
  editedRole,
  handleUpdate,
  handleEdit,
  handleDelete,
  setEditedRole,
}: UserTableProps) => {
  const handleCancelEdit = () => {
    handleEdit(-1, '');
  };

  const rows = users.map((user: User) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar src={user.image} size={40} radius="xl" />
          <div>
            <Text fz="sm" fw={500}>
              {user.username}
            </Text>
            <Text fz="xs" c="dimmed">
              ID: {user.id}
            </Text>
          </div>
        </Group>
      </Table.Td>
      
      <Table.Td>
        <Text fz="sm">
          {user.email}
        </Text>
      </Table.Td>
      
      <Table.Td>
        {editingId === +user.id ? (
          <Select
            value={editedRole}
            onChange={(value) => setEditedRole(value || '')}
            data={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' }
            ]}
            size="sm"
            w={100}
          />
        ) : (
          <Badge 
            color={user.role === 'admin' ? 'red' : 'blue'} 
            variant="light"
          >
            {user.role}
          </Badge>
        )}
      </Table.Td>
      
      <Table.Td>
        <Group gap="xs">
          {editingId === +user.id ? (
            <>
              <Tooltip label="Save changes">
                <ActionIcon
                  color="green"
                  variant="light"
                  onClick={() => handleUpdate(+user.id)}
                >
                  <FaCheck size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Cancel">
                <ActionIcon
                  color="gray"
                  variant="light"
                  onClick={handleCancelEdit}
                >
                  <FaTimes size={16} />
                </ActionIcon>
              </Tooltip>
            </>
          ) : (
            <Tooltip label="Edit user">
              <ActionIcon
                color="blue"
                variant="light"
                onClick={() => handleEdit(+user.id, user.role)}
              >
                <FaEdit size={16} />
              </ActionIcon>
            </Tooltip>
          )}
          
          <Tooltip label="Delete user">
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => handleDelete(+user.id)}
            >
              <FaTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box>
      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default UserTable;