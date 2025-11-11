import React from "react";
import {
  Container,
  Text,
  Table,
  Card,
  Badge,
  Group,
  Stack,
  Box,
  ActionIcon,
  Loader,
  Alert,
  Grid,
  Paper,
  Select,
  TextInput,
  DateInput,
} from "@mantine/core";
import {
  IconRefresh,
  IconInfoCircle,
  IconCoins,
  IconCalendar,
  IconSearch,
  IconUser,
  IconCreditCard,
} from "@tabler/icons-react";
import { getDeposits } from "../services/authService";
import { formatAmount } from "../schemaValidation/Helpers";
import moment from "moment";
import Loading from "../component/Loading";

const ViewDeposits = () => {
  const [deposits, setDeposits] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [showDateFilter, setShowDateFilter] = React.useState(false);

  console.log("ViewDeposits deposits state:", deposits);

  const fetchDeposits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getDeposits();
      console.log("fetchDeposits response:", response);
      console.log("Response success:", response.success);
      console.log("Response data:", response.data);
      console.log("Response error:", response.error);

      if (response.success) {
        // Handle both array and object responses
        const depositData = Array.isArray(response.data)
          ? response.data
          : response.data.deposits || [];
        console.log("Setting deposits data:", depositData);
        setDeposits(depositData);
      } else {
        console.error("API returned error:", response.error);
        setError(response.error || "Failed to fetch deposits");
      }
    } catch (error) {
      console.error("fetchDeposits error:", error);
      setError("Network error occurred while fetching deposits");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDeposits();
  }, []);

  // Dynamic search filter function
  const getFilteredDeposits = () => {
    let filtered = deposits;

    // Apply text search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter((deposit) => {
        const userName = deposit.account?.user?.name?.toLowerCase() || "";
        const userEmail = deposit.account?.user?.email?.toLowerCase() || "";
        const accountNumber =
          deposit.account?.accountNumber?.toLowerCase() || "";
        const description = deposit.description?.toLowerCase() || "";
        const accountType = deposit.account?.type?.toLowerCase() || "";

        return (
          userName.includes(searchLower) ||
          userEmail.includes(searchLower) ||
          accountNumber.includes(searchLower) ||
          description.includes(searchLower) ||
          accountType.includes(searchLower)
        );
      });
    }

    // Apply date filter if selected
    if (selectedDate) {
      const selectedDateStr = moment(selectedDate).format("YYYY-MM-DD");
      filtered = filtered.filter(
        (deposit) =>
          moment(deposit.createdAt).format("YYYY-MM-DD") === selectedDateStr
      );
    }

    return filtered;
  };

  // Get filtered deposits
  const filteredDeposits = getFilteredDeposits();

  // Calculate totals for filtered results
  const filteredTotal = filteredDeposits.reduce(
    (total, deposit) => total + deposit.amount,
    0
  );

  // Get today's total (unfiltered)
  const todayDeposits = deposits.filter(
    (deposit) =>
      moment(deposit.createdAt).format("YYYY-MM-DD") ===
      moment().format("YYYY-MM-DD")
  );
  const todayTotal = todayDeposits.reduce(
    (total, deposit) => total + deposit.amount,
    0
  );

  // Get unique dates from all deposits for date filter options
  const getAvailableDates = () => {
    const dates = deposits.map((deposit) =>
      moment(deposit.createdAt).format("YYYY-MM-DD")
    );
    return [...new Set(dates)].sort().reverse();
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDate(null);
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

  const rows = filteredDeposits.map((deposit) => (
    <Table.Tr key={deposit.id}>
      <Table.Td>
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            {deposit.account?.user?.name}
          </Text>
          <Text size="xs" c="dimmed">
            {deposit.account?.user?.email}
          </Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Text size="sm">{deposit.account?.accountNumber}</Text>
          <Badge size="xs" variant="light" color="blue">
            {deposit.account?.type}
          </Badge>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" fw={500} c="green">
          {formatAmount
            ? formatAmount(deposit.amount)
            : `K${deposit.amount.toLocaleString()}`}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">{deposit.description || "No description"}</Text>
      </Table.Td>
      <Table.Td>
        <Text size="sm">
          {moment(deposit.createdAt).format("MMM DD, YYYY")}
        </Text>
        <Text size="xs" c="dimmed">
          {moment(deposit.createdAt).format("h:mm A")}
        </Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Stack gap="md">
        <Group justify="space-between" align="center">
          <div>
            <Text size="xl" fw={700}>
              Bank Deposits
            </Text>
            <Text size="sm" c="dimmed">
              Total deposits: {deposits.length}
            </Text>
          </div>
          <ActionIcon
            variant="light"
            onClick={fetchDeposits}
            loading={loading}
            size="lg"
          >
            <IconRefresh size="1.2rem" />
          </ActionIcon>
        </Group>

        {/* Summary Cards */}
        <Grid>
          <Grid.Col span={4}>
            <Paper p="md" withBorder>
              <Group gap="sm">
                <IconCoins size="2rem" color="green" />
                <Box>
                  <Text size="lg" fw={700} c="green">
                    {formatAmount
                      ? formatAmount(todayTotal)
                      : `K${todayTotal.toLocaleString()}`}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Today's Total
                  </Text>
                  <Text size="xs" c="dimmed">
                    {todayDeposits.length} transactions
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" withBorder>
              <Group gap="sm">
                <IconSearch size="2rem" color="blue" />
                <Box>
                  <Text size="lg" fw={700} c="blue">
                    {formatAmount
                      ? formatAmount(filteredTotal)
                      : `K${filteredTotal.toLocaleString()}`}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Filtered Total
                  </Text>
                  <Text size="xs" c="dimmed">
                    {filteredDeposits.length} transactions
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper p="md" withBorder>
              <Group gap="sm">
                <IconCreditCard size="2rem" color="orange" />
                <Box>
                  <Text size="lg" fw={700} c="orange">
                    {formatAmount
                      ? formatAmount(
                          deposits.reduce(
                            (total, deposit) => total + deposit.amount,
                            0
                          )
                        )
                      : `K${deposits
                          .reduce((total, deposit) => total + deposit.amount, 0)
                          .toLocaleString()}`}
                  </Text>
                  <Text size="sm" c="dimmed">
                    All Time Total
                  </Text>
                  <Text size="xs" c="dimmed">
                    {deposits.length} transactions
                  </Text>
                </Box>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Search and Filter Interface */}
        <Card shadow="sm" padding="md">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Text fw={600} size="lg">
                Search & Filter Deposits
              </Text>
              {(searchTerm || selectedDate) && (
                <Badge
                  variant="light"
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={clearFilters}
                >
                  Clear Filters
                </Badge>
              )}
            </Group>

            <Grid>
              <Grid.Col span={8}>
                <TextInput
                  placeholder="Search by name, email, account number, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  leftSection={<IconSearch size="1rem" />}
                  rightSection={
                    searchTerm && (
                      <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => setSearchTerm("")}
                        size="sm"
                      >
                        ✕
                      </ActionIcon>
                    )
                  }
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  placeholder="Filter by date (optional)"
                  value={
                    selectedDate
                      ? moment(selectedDate).format("YYYY-MM-DD")
                      : null
                  }
                  onChange={(value) =>
                    setSelectedDate(value ? new Date(value) : null)
                  }
                  data={getAvailableDates().map((date) => ({
                    value: date,
                    label:
                      moment(date).format("MMM DD, YYYY") +
                      (date === moment().format("YYYY-MM-DD")
                        ? " (Today)"
                        : ""),
                  }))}
                  leftSection={<IconCalendar size="1rem" />}
                  clearable
                />
              </Grid.Col>
            </Grid>

            {/* Search Results Summary */}
            <Group gap="md">
              <Badge variant="light" color="blue" size="lg">
                {filteredDeposits.length} result
                {filteredDeposits.length !== 1 ? "s" : ""}
              </Badge>
              {searchTerm && (
                <Text size="sm" c="dimmed">
                  Searching for: "<strong>{searchTerm}</strong>"
                </Text>
              )}
              {selectedDate && (
                <Text size="sm" c="dimmed">
                  Date:{" "}
                  <strong>
                    {moment(selectedDate).format("MMMM DD, YYYY")}
                  </strong>
                </Text>
              )}
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg">
          {filteredDeposits.length === 0 ? (
            <Box style={{ textAlign: "center", padding: "2rem" }}>
              <Text size="lg" c="dimmed">
                {deposits.length === 0
                  ? "No deposits found"
                  : "No deposits match your search criteria"}
              </Text>
              {deposits.length > 0 && (searchTerm || selectedDate) && (
                <Text size="sm" c="dimmed" mt="xs">
                  Try adjusting your search terms or clearing the filters
                </Text>
              )}
            </Box>
          ) : (
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Account Holder</Table.Th>
                  <Table.Th>Account Details</Table.Th>
                  <Table.Th>Amount</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Date & Time</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Card>
      </Stack>
    </Container>
  );
};

export default ViewDeposits;
