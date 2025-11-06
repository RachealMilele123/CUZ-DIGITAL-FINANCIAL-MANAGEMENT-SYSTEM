import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  Card,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Divider,
  Grid,
  Paper,
  Box,
  Alert,
} from "@mantine/core";
import {
  IconEye,
  IconRefresh,
  IconWallet,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import { accountBalance } from "../services/authService";
import Loading from "../component/Loading";
import { formatAmount } from "../utils/schemaValidation/src/utils/src/utils/Helpers";

const Balance = () => {
  const { user } = useAuth();
  const [balanceData, setBalanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalanceData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountBalance();

      if (response.success) {
        setBalanceData(response.data);
      } else {
        setError(response.error || "Failed to fetch balance data");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Network error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container size="lg" p="md">
      {/* Header Section */}
      <Group justify="space-between" align="center" mb="xl">
        <Box>
          <Text size="xl" fw={700} c="dark">
            Account Balance
          </Text>
          <Text size="sm" c="dimmed">
            Welcome back, {user?.firstName || user?.name || "User"}
          </Text>
        </Box>
        <ActionIcon
          variant="light"
          size="lg"
          onClick={fetchBalanceData}
          loading={isLoading}
        >
          <IconRefresh size="1.2rem" />
        </ActionIcon>
      </Group>

      {/* Error Alert */}
      {error && (
        <Alert color="yellow" mb="md" title="Notice">
          {error}. Showing demo data for preview.
        </Alert>
      )}

      {/* Main Balance Card */}
      <Card shadow="sm" padding="xl" radius="lg" withBorder mb="lg">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Group align="center" gap="xs" mb="xs">
              <IconWallet size="1.2rem" color="#228be6" />
              <Text size="sm" fw={500} c="dimmed">
                {balanceData?.account?.accountType || "Savings"} Account
              </Text>
            </Group>
            <Text size="sm" c="dimmed" fw={500}>
              Account: {balanceData?.account?.accountNumber || "****1234"}
            </Text>
          </Box>
          <Badge
            color={
              balanceData?.account?.accountStatus === "Active" ? "green" : "red"
            }
            variant="light"
            size="lg"
          >
            {balanceData?.account?.accountStatus || "Active"}
          </Badge>
        </Group>

        <Divider my="md" />

        <Stack spacing="xs" mb="lg">
          <Text size="sm" c="dimmed" fw={500}>
            Current Balance
          </Text>
          <Text size="2.5rem" fw={700} c="blue" lh={1}>
            {formatAmount(balanceData?.account?.currentBalance || 150000)}
          </Text>
          <Text size="sm" c="green" fw={500}>
            Available for withdrawal
          </Text>
        </Stack>
      </Card>

      {/* Quick Stats */}
      <Card shadow="xs" padding="md" radius="md" withBorder mt="lg">
        <Text size="sm" fw={500} mb="xs" c="dimmed">
          Account Activity
        </Text>
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            Last transaction: Today, 2:30 PM
          </Text>
          <Text size="xs" c="dimmed">
            Account opened: Jan 2024
          </Text>
        </Group>
      </Card>
    </Container>
  );
};

export default Balance;
