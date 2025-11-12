import {
  Table,
  Badge,
  Group,
  Text,
  Stack,
  Box,
  Avatar,
  ScrollArea,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowUp,
  IconArrowDown,
  IconUser,
  IconEye,
  IconReceipt,
} from "@tabler/icons-react";
import { formatAmount } from "../schemaValidation/Helpers";
import moment from "moment";
import { useState } from "react";
import TransactionReceipt from "./TransactionReceipt";

function ReusableTable({ transaction, type = "all" }) {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [receiptOpened, setReceiptOpened] = useState(false);

  const handleShowReceipt = (transaction) => {
    setSelectedTransaction(transaction);
    setReceiptOpened(true);
  };

  const handleCloseReceipt = () => {
    setReceiptOpened(false);
    setSelectedTransaction(null);
  };

  if (!transaction || transaction.length === 0) {
    return (
      <Box ta="center" py="xl">
        <Text size="lg" c="dimmed">
          No transactions found
        </Text>
        <Text size="sm" c="dimmed">
          {type === "incoming"
            ? "No money received yet"
            : type === "outgoing"
            ? "No money sent yet"
            : "No transaction history available"}
        </Text>
      </Box>
    );
  }

  const getTransactionStatus = (transaction) => {
    // This could be based on transaction status field if available
    return transaction?.status || "completed";
  };

  const getAmountColor = (transaction, type) => {
    if (type === "incoming") return "green";
    if (type === "outgoing") return "red";
    // For "all" type, determine based on transaction direction
    return "blue";
  };

  const rows = transaction.map((transaction, index) => (
    <Table.Tr
      key={transaction.id || index}
      style={{ borderBottom: "1px solid #e9ecef" }}
    >
      <Table.Td>
        <Group gap="xs">
          <Avatar size="sm" color="blue" radius="xl">
            {index + 1}
          </Avatar>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" color="gray" radius="xl">
            <IconUser size="0.8rem" />
          </Avatar>
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              {transaction?.from?.accountHolderName || "N/A"}
            </Text>
            <Text size="xs" c="dimmed">
              {transaction?.from?.accountNumber || "Unknown"}
            </Text>
          </Stack>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="sm">
          <Avatar size="sm" color="blue" radius="xl">
            <IconUser size="0.8rem" />
          </Avatar>
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              {transaction?.to?.accountHolderName || "N/A"}
            </Text>
            <Text size="xs" c="dimmed">
              {transaction?.to?.accountNumber || "Unknown"}
            </Text>
          </Stack>
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          {type === "incoming" ? (
            <IconArrowDown size="1rem" color="green" />
          ) : type === "outgoing" ? (
            <IconArrowUp size="1rem" color="red" />
          ) : (
            <IconArrowUp size="1rem" color="blue" />
          )}
          <Text size="lg" fw={700} c={getAmountColor(transaction, type)}>
            {formatAmount(transaction?.amount)}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Stack gap={2}>
          <Text size="sm" fw={500}>
            {moment(transaction?.date).format("MMM DD, YYYY")}
          </Text>
          <Text size="xs" c="dimmed">
            {moment(transaction?.date).format("h:mm A")}
          </Text>
        </Stack>
      </Table.Td>

      <Table.Td>
        <Stack gap={2}>
          <Badge
            variant="light"
            color={
              getTransactionStatus(transaction) === "completed"
                ? "green"
                : "yellow"
            }
            size="sm"
          >
            {getTransactionStatus(transaction)}
          </Badge>
          <Text size="xs" c="dimmed" lineClamp={1}>
            {transaction?.description || "No description"}
          </Text>
        </Stack>
      </Table.Td>

      <Table.Td>
        <Group gap="xs">
          <Tooltip label="View Details">
            <ActionIcon variant="light" size="sm" color="blue">
              <IconEye size="0.8rem" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Get Receipt">
            <ActionIcon
              variant="light"
              size="sm"
              color="green"
              onClick={() => handleShowReceipt(transaction)}
            >
              <IconReceipt size="0.8rem" />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ScrollArea>
        <Table striped highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr style={{ backgroundColor: "#f8f9fa" }}>
              <Table.Th>
                <Text fw={700} size="sm">
                  #
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  From Account
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  To Account
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  Amount
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  Date & Time
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  Status & Description
                </Text>
              </Table.Th>
              <Table.Th>
                <Text fw={700} size="sm">
                  Actions
                </Text>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Transaction Receipt Modal */}
      <TransactionReceipt
        transaction={selectedTransaction}
        opened={receiptOpened}
        onClose={handleCloseReceipt}
      />
    </>
  );
}
export default ReusableTable;
