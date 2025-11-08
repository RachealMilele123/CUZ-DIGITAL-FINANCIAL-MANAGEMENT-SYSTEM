import React, { useState } from "react";
import {
  Container,
  Card,
  Title,
  Text,
  TextInput,
  NumberInput,
  Textarea,
  Button,
  Stack,
  Group,
  Box,
  Badge,
  Paper,
  Grid,
  ThemeIcon,
  Alert,
  ActionIcon,
  Divider,
  Avatar,
} from "@mantine/core";
import {
  IconCreditCard,
  IconWallet,
  IconUser,
  IconCheck,
  IconX,
  IconRefresh,
  IconHistory,
  IconAlertCircle,
  IconSchool,
  IconBuildingBank,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { depositFunds, getRecentDeposits } from "../services/authService";
import { formatAmount } from "../schemaValidation/Helpers";

const Deposit = () => {
  const [loading, setLoading] = useState(false);
  const [recentDeposits, setRecentDeposits] = useState([]);

  const form = useForm({
    initialValues: {
      accountNumber: "",
      amount: "",
      description: "",
    },
    validate: {
      accountNumber: (value) => {
        if (!value) return "Account number is required";
        if (!/^STU-\d{9}$/.test(value))
          return "Account number must be in format STU-XXXXXXXXX";
        return null;
      },
      amount: (value) => {
        if (!value || value <= 0) return "Amount must be greater than 0";
        if (value > 1000000) return "Amount cannot exceed RWF 1,000,000";
        return null;
      },
      description: (value) => {
        if (!value || value.trim().length < 5)
          return "Description must be at least 5 characters";
        return null;
      },
    },
  });

  const handleDeposit = async (values) => {
    setLoading(true);
    const payload = {
      accountNumber: values.accountNumber,
      amount: values.amount,
      description: values.description,
    };
    try {
      // Simulate API call
      const response = await depositFunds(payload);
      console.log("deposit response:", response);
      //   await new Promise((resolve) => setTimeout(resolve, 2000));

      // Add to recent deposits
      const newDeposit = {
        id: Date.now(),
        accountNumber: values.accountNumber,
        amount: values.amount,
        description: values.description,
        timestamp: "Just now",
        status: "completed",
      };

    //   setRecentDeposits((prev) => [newDeposit, ...prev.slice(0, 4)]);

      toast.success(
        `Successfully deposited k ${values.amount.toLocaleString()} to ${
          values.accountNumber
        }`
      );
      form.reset();
    } catch (error) {
      toast.error("Failed to process deposit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentDeposits = async () => {
    try {
      const response = await getRecentDeposits();
      console.log("fetchRecentDeposits response:", response);
      if (response.success) {
        setRecentDeposits(response.data);
      }
    } catch (error) {
      console.error("fetchRecentDeposits error:", error);
    }
  };

  React.useEffect(() => {
    fetchRecentDeposits();
  }, []);

  

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <Container
        size="xl"
        py={{ base: 40, md: 60 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <Group justify="space-between" align="center" mb="xl">
          <Box>
            <Group gap="md" align="center">
              <ThemeIcon
                size={50}
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 45 }}
              >
                <IconBuildingBank size="1.8rem" />
              </ThemeIcon>
              <Box>
                <Title order={1} c="dark">
                  Admin Deposit Portal
                </Title>
                <Text c="dimmed">Make deposits to student accounts</Text>
              </Box>
            </Group>
          </Box>
          <Badge
            size="lg"
            variant="light"
            color="green"
            leftSection={<IconCheck size="1rem" />}
          >
            System Online
          </Badge>
        </Group>

        <Grid>
          {/* Deposit Form */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="xl" radius="lg" withBorder>
              <Group justify="space-between" align="center" mb="lg">
                <Box>
                  <Title order={2} c="dark" mb="xs">
                    Make Deposit
                  </Title>
                  <Text size="sm" c="dimmed">
                    Process deposits to student accounts securely
                  </Text>
                </Box>
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconWallet size="1.5rem" />
                </ThemeIcon>
              </Group>

              <form onSubmit={form.onSubmit(handleDeposit)}>
                <Stack spacing="md">
                  <TextInput
                    label="Student Account Number"
                    placeholder="STU-870653366"
                    size="md"
                    radius="md"
                    leftSection={<IconUser size="1.2rem" />}
                    description="Enter student account number in format STU-XXXXXXXXX"
                    {...form.getInputProps("accountNumber")}
                  />

                  <NumberInput
                    label="Deposit Amount (zmw)"
                    placeholder="50000"
                    size="md"
                    radius="md"
                    leftSection={<IconCreditCard size="1.2rem" />}
                    description="Enter amount to deposit (minimum: RWF 1,000)"
                    min={1000}
                    max={1000000}
                    thousandSeparator=","
                    {...form.getInputProps("amount")}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Initial deposit for student account, tuition fee payment, etc."
                    size="md"
                    radius="md"
                    minRows={3}
                    description="Provide a clear description of the deposit purpose"
                    {...form.getInputProps("description")}
                  />

                  <Divider my="md" />

                  <Group justify="space-between">
                    <Button
                      variant="outline"
                      color="gray"
                      leftSection={<IconRefresh size="1.2rem" />}
                      onClick={() => form.reset()}
                      disabled={loading}
                    >
                      Clear Form
                    </Button>

                    <Button
                      type="submit"
                      size="md"
                      radius="md"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 45 }}
                      leftSection={<IconCheck size="1.2rem" />}
                      loading={loading}
                      //   disabled={!form.isValid()}
                    >
                      {loading ? "Processing Deposit..." : "Process Deposit"}
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Card>
          </Grid.Col>

          {/* Recent Deposits & Stats */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack spacing="md">
              {/* Quick Stats */}
              <Card shadow="sm" padding="lg" radius="lg" withBorder>
                <Group justify="space-between" align="center" mb="md">
                  <Text fw={600} c="dark">
                    Today's Summary
                  </Text>
                  <ThemeIcon size="sm" variant="light" color="green">
                    <IconTrendingUp size="1rem" />
                  </ThemeIcon>
                </Group>

                <Stack spacing="xs">
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Total Deposits
                    </Text>
                    <Text size="sm" fw={600} c="green">
                      RWF 2,450,000
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Transactions
                    </Text>
                    <Text size="sm" fw={600}>
                      47
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Success Rate
                    </Text>
                    <Text size="sm" fw={600} c="green">
                      99.2%
                    </Text>
                  </Group>
                </Stack>
              </Card>

              {/* Recent Deposits */}
              <Card shadow="sm" padding="lg" radius="lg" withBorder>
                <Group justify="space-between" align="center" mb="md">
                  <Text fw={600} c="dark">
                    Recent Deposits
                  </Text>
                  <ActionIcon variant="light" color="blue" size="sm">
                    <IconHistory size="1rem" />
                  </ActionIcon>
                </Group>

                <Stack spacing="xs">
                  {recentDeposits?.deposits?.map((deposit) => (
                    <Paper
                      key={deposit.id}
                      p="sm"
                      radius="md"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <Group justify="space-between" align="center">
                        <Box>
                          <Text size="sm" fw={500}>
                            {deposit?.account?.accountNumber}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {deposit.description}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {deposit.createdAt}
                          </Text>
                        </Box>
                        <Box ta="right">
                          <Text size="sm" fw={600} c="green">
                            {formatAmount(deposit?.amount)}
                          </Text>
                          <Badge
                            size="xs"
                            color={
                              deposit.status === "completed"
                                ? "green"
                                : "yellow"
                            }
                            variant="light"
                          >
                            {deposit.status}
                          </Badge>
                        </Box>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Card>

              {/* System Alert */}
              <Alert
                icon={<IconAlertCircle size="1rem" />}
                title="System Notice"
                color="blue"
                variant="light"
              >
                <Text size="sm">
                  All deposits are processed instantly and notifications are
                  sent to students automatically.
                </Text>
              </Alert>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default Deposit;
