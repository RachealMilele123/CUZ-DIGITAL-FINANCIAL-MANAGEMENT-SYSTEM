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
  Box,
} from "@mantine/core";
import { IconRefresh, IconWallet } from "@tabler/icons-react";
import moment from "moment";
import { getAccountBalance } from "../services/authService";
import Loading from "../component/Loading";
import { formatAmount } from "../schemaValidation/Helpers";
import { toast } from "react-toastify";

const Balance = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  localStorage.setItem(
    "accountNumber",
    balanceData?.account?.accountNumber || ""
  );

  const fetchBalanceData = async () => {
    setIsLoading(true);
    try {
      const response = await getAccountBalance();

      if (response.success) {
        setBalanceData(response.data);
      } else {
        toast.error(response.error || "Failed to fetch balance data");
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error("Network error occurred");
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

          <Text size="xs" c="dimmed" mt="xs">
            Last updated:{" "}
            {moment(balanceData?.account?.lastUpdated).format(
              "dddd Do MMMM YYYY [at] h:mm A"
            )}
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

      {/* Main Balance Card */}
      <Card shadow="sm" padding="xl" radius="lg" withBorder mb="lg">
        <Group justify="space-between" align="flex-start" mb="md">
          <Box>
            <Group align="center" gap="xs" mb="xs">
              <IconWallet size="1.2rem" color="#228be6" />
              <Text size="sm" fw={500} c="black" tt="capitalize">
                {balanceData?.account?.accountType || "Savings"} Account
              </Text>
            </Group>
            <Text size="sm" c="dimmed" fw={500}>
              <span style={{ color: "black" }}>Account:</span>
              {balanceData?.account?.accountNumber || "****1234"}
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
            {formatAmount(balanceData?.account?.currentBalance)}
          </Text>
          <Text size="sm" c="green" fw={500}>
            Available for withdrawal
          </Text>
        </Stack>
      </Card>

      {/* Quick Stats */}
      <Card shadow="xs" padding="md" radius="md" withBorder mt="lg">
        <Text size="sm" fw={500} mb="xs" c="black-500 font-bold">
          Account Activity
        </Text>
        <Stack spacing="xs">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">
              <span style={{ color: "black" }}>Account opened:</span>{" "}
              {moment(balanceData?.account?.createdAt).format(
                "dddd Do MMMM YYYY [at] h:mm A"
              )}
            </Text>
            <Text size="xs" c="dimmed">
              {balanceData?.summary?.recentTransactionsCount || "-"} total
              transactions
            </Text>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export default Balance;
