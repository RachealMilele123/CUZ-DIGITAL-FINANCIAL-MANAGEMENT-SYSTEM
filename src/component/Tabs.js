import { Container, Tabs, Card, Badge, Group, Text, Box } from "@mantine/core";
import {
  IconArrowsExchange,
  IconArrowDown,
  IconArrowUp,
  IconClock,
} from "@tabler/icons-react";
import ReusableTable from "./ReusableTable";

function TabBars({ allTransactions }) {
  console.log("All Transactions in TabBars:", allTransactions);
  const AvailableTransaction = allTransactions?.data?.allTransactions;
  console.log("AvailableTransaction in TabBars:", AvailableTransaction);
  const incomingTransactions = allTransactions?.data?.incomingTransactions;
  const outgoingTransactions = allTransactions?.data?.outgoingTransfers;

  return (
    <Container size="xl" mt="xl">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="lg">
          <Text size="xl" fw={700} c="dark">
            Transaction History
          </Text>
          <Badge variant="light" color="blue" size="lg">
            {AvailableTransaction?.length || 0} Total Transactions
          </Badge>
        </Group>

        <Tabs
          defaultValue="all_transactions"
          variant="pills"
          radius="md"
          orientation="horizontal"
        >
          <Tabs.List grow mb="lg">
            <Tabs.Tab
              value="all_transactions"
              leftSection={<IconArrowsExchange size="1rem" />}
              fw={600}
            >
              <Box ta="center">
                <Text size="sm">All Transactions</Text>
                <Text size="xs" c="dimmed">
                  {AvailableTransaction?.length || 0} records
                </Text>
              </Box>
            </Tabs.Tab>
            <Tabs.Tab
              value="incoming"
              leftSection={<IconArrowDown size="1rem" />}
              fw={600}
              color="green"
            >
              <Box ta="center">
                <Text size="sm">Money In</Text>
                <Text size="xs" c="dimmed">
                  {incomingTransactions?.length || 0} credits
                </Text>
              </Box>
            </Tabs.Tab>
            <Tabs.Tab
              value="outgoing"
              leftSection={<IconArrowUp size="1rem" />}
              fw={600}
              color="red"
            >
              <Box ta="center">
                <Text size="sm">Money Out</Text>
                <Text size="xs" c="dimmed">
                  {outgoingTransactions?.length || 0} debits
                </Text>
              </Box>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="all_transactions">
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <Group mb="md">
                <IconClock size="1.2rem" color="gray" />
                <Text fw={600} c="dark">
                  Complete Transaction History
                </Text>
              </Group>
              <ReusableTable transaction={AvailableTransaction} type="all" />
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="incoming">
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <Group mb="md">
                <IconArrowDown size="1.2rem" color="green" />
                <Text fw={600} c="green">
                  Incoming Transactions
                </Text>
              </Group>
              <ReusableTable
                transaction={incomingTransactions}
                type="incoming"
              />
            </Card>
          </Tabs.Panel>

          <Tabs.Panel value="outgoing">
            <Card shadow="sm" padding="md" radius="md" withBorder>
              <Group mb="md">
                <IconArrowUp size="1.2rem" color="red" />
                <Text fw={600} c="red">
                  Outgoing Transactions
                </Text>
              </Group>
              <ReusableTable
                transaction={outgoingTransactions}
                type="outgoing"
              />
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}

export default TabBars;
