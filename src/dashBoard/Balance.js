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
import { IconEye, IconRefresh } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import { accountBalance } from "../services/authService";
import Loading from "../component/Loading";
import { formatAmount } from "../utils/schemaValidation/src/utils/src/utils/Helpers";

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
          <Stack spacing={2}>
            <Text size="sm" c="dimmed">
              {balanceData?.account?.accountType} Account
            </Text>
            <Text fw={500}>{balanceData?.account?.accountNumber}</Text>
            <Text fw={500}>Main Balance</Text>
          </Stack>
          <Badge color="green" variant="light">
            {balanceData?.summary?.accountStatus}
          </Badge>
        </Group>

        <Text size="2.5rem" fw={700} c="blue" mb="xs">
          {formatAmount(balanceData?.account?.currentBalance)}
        </Text>

        <Text size="sm" c="dimmed">
          Available: {formatAmount(balanceData?.account?.currentBalance)}
        </Text>

        
      </Card>

      <Text c="dimmed" ta="center">
        Welcome {user?.name || "User"}, this is your balance overview.
      </Text>
    </Container>
  );
};

export default Balance;
