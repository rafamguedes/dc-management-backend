import { useState } from 'react';
import { createUser } from '../../services/userService';
import { avatarGenerate } from '../../utils/avatarGenerator';
import { FaUserPlus, FaRedo } from 'react-icons/fa';
import {
  Modal,
  TextInput,
  PasswordInput,
  Select,
  Button,
  Group,
  Stack,
  Avatar,
  ActionIcon,
  Paper,
  Title,
  Box,
  Divider,
  Tooltip
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import IconCreate from '../../assets/images/icons/user1.svg';

interface CreateUserModalProps {
  opened: boolean;
  onClose: () => void;
  onUserCreated?: () => void;
}

export const CreateUserModal = ({ opened, onClose, onUserCreated }: CreateUserModalProps) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleCreateUser = async () => {
    if (!username || !email || !role || !password || !confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Please fill in all required fields',
        color: 'red',
      });
      return;
    }

    if (password !== confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match!',
        color: 'red',
      });
      return;
    }

    setLoading(true);
    const data = { username, email, password, role, image };

    try {
      await createUser(data);
      notifications.show({
        title: 'Success',
        message: 'User created successfully!',
        color: 'green',
      });
      handleClear();
      onUserCreated?.();
      onClose();
    } catch (error) {
      console.log(error);
      notifications.show({
        title: 'Error',
        message: 'Something went wrong!',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    try {
      const imageUrl = await avatarGenerate();
      setImage(imageUrl);
      notifications.show({
        title: 'Success',
        message: 'Avatar generated successfully!',
        color: 'green',
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to generate avatar',
        color: 'red',
      });
    }
  };

  const handleClear = () => {
    setUsername('');
    setEmail('');
    setRole('');
    setPassword('');
    setConfirmPassword('');
    setImage('');
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <FaUserPlus size={20} />
          <Title order={3}>Create New User</Title>
        </Group>
      }
      size="lg"
      centered
    >
      <Stack>
        <Paper p="md" withBorder>
          <Group justify="center" mb="md">
            <Box ta="center">
              <Avatar
                src={image || IconCreate}
                size={100}
                radius="md"
                mb="xs"
              />
              <Group justify="center">
                <Tooltip label="Generate random avatar">
                  <ActionIcon
                    variant="light"
                    color="blue"
                    onClick={handleGenerateImage}
                    size="lg"
                  >
                    <FaRedo size={16} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Box>
          </Group>
          
          <Divider mb="md" />
          
          <Stack>
            <TextInput
              label="Username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Group grow>
              <TextInput
                label="Email"
                placeholder="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              
              <Select
                label="Role"
                placeholder="Select role"
                value={role}
                onChange={(value) => setRole(value || '')}
                data={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' },
                ]}
                required
              />
            </Group>
            
            <TextInput
              label="Image URL"
              placeholder="Enter image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            
            <Group grow>
              <PasswordInput
                label="Password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Group>
          </Stack>
        </Paper>
        
        <Group justify="flex-end">
          <Button
            variant="outline"
            color="gray"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="light"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </Button>
          <Button
            onClick={handleCreateUser}
            loading={loading}
            leftSection={<FaUserPlus size={16} />}
          >
            Create User
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default CreateUserModal;
