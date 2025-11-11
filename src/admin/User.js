import {
  ActionIcon,
  Alert,
  Badge,
  Box,
  Card,
  Container,
  Group,
  Loader,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import {
  IconInfoCircle,
  IconRefresh,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { getAllAccountUsers } from "../services/authService";
import moment from "moment";
import Loading from "../component/Loading";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllAccountUsers();
  }, []);

  const fetchAllAccountUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllAccountUsers();
      console.log("fetchAllAccountUsers response:", response);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);
      console.log("Response error:", response.error);

      if (response.success) {
        // Handle both array and object responses
        const usersData = Array.isArray(response.data)
          ? response.data
          : response.data.users || [];
        console.log("Setting users data:", usersData);
        setUsers(usersData);
      } else {
        console.error("API returned error:", response.error);
        setError(response.error || "Failed to fetch users");
      }
    } catch (error) {
      console.error("fetchAllAccountUsers error:", error);
      setError("Network error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Container>
        <Alert icon={<IconInfoCircle size="1rem" />} title="Error" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <div>
            <Text size="xl" fw={700}>
              Account Users
            </Text>
            <Text size="sm" c="dimmed">
              {users.length} user{users.length !== 1 ? "s" : ""} found
            </Text>
          </div>
          <ActionIcon
            variant="light"
            size="lg"
            onClick={fetchAllAccountUsers}
            loading={loading}
          >
            <IconRefresh size="1.2rem" />
          </ActionIcon>
        </Group>

        {/* Summary Card */}
        <Card shadow="sm" padding="md" withBorder>
          <Group gap="sm">
            <IconUsers size="2rem" color="blue" />
            <Box>
              <Text size="lg" fw={700} c="blue">
                {users.length}
              </Text>
              <Text size="sm" c="dimmed">
                Total Registered Users
              </Text>
            </Box>
          </Group>
        </Card>

        <Card shadow="sm" padding="lg">
          {users.length === 0 ? (
            <Box style={{ textAlign: "center", padding: "2rem" }}>
              <Text size="lg" c="dimmed">
                No users found
              </Text>
            </Box>
          ) : (
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>User Details</Table.Th>
                  <Table.Th>Contact Info</Table.Th>
                  <Table.Th>Account Type</Table.Th>
                  <Table.Th>Joined Date</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {users.map((user, index) => (
                  <Table.Tr key={user.id || user._id || index}>
                    <Table.Td>
                      <Group gap="sm">
                        <IconUser size="1.5rem" color="gray" />
                        <Stack gap="xs">
                          <Text size="sm" fw={500}>
                            {user.name || "N/A"}
                          </Text>
                          <Text size="xs" c="dimmed">
                            ID: {user.id || user._id || "N/A"}
                          </Text>
                        </Stack>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Stack gap="xs">
                        <Text size="sm">{user.email || "N/A"}</Text>
                        <Text size="xs" c="dimmed">
                          {user.phone || "N/A"}
                        </Text>
                      </Stack>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        variant="light"
                        color={
                          user.type === "student"
                            ? "blue"
                            : user.type === "staff"
                            ? "green"
                            : "gray"
                        }
                        size="sm"
                      >
                        {user.type || "Unknown"}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {user.createdAt
                          ? moment(user.createdAt).format("MMM DD, YYYY")
                          : "N/A"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {user.createdAt
                          ? moment(user.createdAt).format("h:mm A")
                          : ""}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default User;
