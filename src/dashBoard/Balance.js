import React, { useEffect, useState } from "react";
import {
  Container,
  Text,
  Card,
  Group,
  Stack,
  Badge,
  ActionIcon,
  Loader,
} from "@mantine/core";
import { IconEye, IconEyeOff, IconRefresh } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import { accountBalance } from "../services/authService";
import Loading from "../component/Loading";

const Balance = () => {
  const { user } = useAuth();
  const [balanceData, setBalanceData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalanceData = async () => {
    setIsLoading(true);
    // Placeholder for future API call to fetch balance data
    const response = await accountBalance();
    setBalanceData(response.data);
    setIsLoading(false);
    console.log("Fetched balance data:", response.data);
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container size="lg" p="md">
      <Text size="2rem" fw={700} mb="xl">
        Account Balance
      </Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder mb="lg">
        <Group justify="space-between" mb="md">
          <div>
            <Text size="sm" c="dimmed">
              Current Account
            </Text>
            <Text fw={500}>Main Balance</Text>
          </div>
          <Badge color="green" variant="light">
            Active
          </Badge>
        </Group>

        <Text size="2.5rem" fw={700} c="blue" mb="xs">
          ZMW {balanceData?.account?.currentBalance}
        </Text>

        <Text size="sm" c="dimmed">
          Available: {balanceData?.account?.currentBalance}
        </Text>

        <Group mt="md">
          <ActionIcon variant="light" size="sm">
            <IconEye size={16} />
          </ActionIcon>
          <ActionIcon variant="light" size="sm">
            <IconRefresh size={16} />
          </ActionIcon>
        </Group>
      </Card>

      <Text c="dimmed" ta="center">
        Welcome {user?.name || "User"}, this is your balance overview.
      </Text>
    </Container>
  );
};

export default Balance;
