import { 
  Stack, 
  Card, 
  SimpleGrid, 
  Group, 
  Text, 
  Badge, 
  Button, 
  Title,
  Paper,
  Center,
  Box
} from '@mantine/core';
import { FaBox, FaPlus, FaEye } from 'react-icons/fa';

interface ItemsProps {
  // Future props when items are implemented
  items?: any[];
}

export function ItemsComponent({ }: ItemsProps) {
  return (
    <Stack gap="lg">
      {/* Items Header */}
      <Group justify="space-between" mb="lg">
        <Title order={2}>Items</Title>
        <Group>
          <Button
            variant="light"
            leftSection={<FaEye size={16} />}
            disabled
          >
            Analytics
          </Button>
          <Button
            variant="light"
            leftSection={<FaBox size={16} />}
            disabled
          >
            Items Table
          </Button>
        </Group>
      </Group>

      {/* Placeholder Content */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm" fw={500}>
                Total Items
              </Text>
              <Text fw={700} size="xl">
                0
              </Text>
            </div>
            <FaBox size={24} color="purple" />
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm" fw={500}>
                Active Items
              </Text>
              <Text fw={700} size="xl">
                0
              </Text>
            </div>
            <Badge color="green" variant="light">
              Active
            </Badge>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm" fw={500}>
                Inactive Items
              </Text>
              <Text fw={700} size="xl">
                0
              </Text>
            </div>
            <Badge color="gray" variant="light">
              Inactive
            </Badge>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text c="dimmed" size="sm" fw={500}>
                New Items
              </Text>
              <Text fw={700} size="xl">
                0
              </Text>
            </div>
            <FaPlus size={24} color="orange" />
          </Group>
        </Card>
      </SimpleGrid>

      {/* Placeholder Message */}
      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Center>
          <Box ta="center">
            <FaBox size={48} color="gray" style={{ marginBottom: '16px' }} />
            <Title order={3} c="dimmed" mb="md">
              Items Module Coming Soon
            </Title>
            <Text c="dimmed" size="sm">
              This section will contain items management functionality in the future.
            </Text>
          </Box>
        </Center>
      </Paper>
    </Stack>
  );
}
