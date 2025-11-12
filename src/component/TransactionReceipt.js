import React from "react";
import {
  Modal,
  Paper,
  Text,
  Group,
  Stack,
  Divider,
  Badge,
  Box,
  Button,
  Grid,
} from "@mantine/core";
import { IconReceipt, IconDownload, IconPrinter } from "@tabler/icons-react";
import { formatAmount } from "../schemaValidation/Helpers";
import moment from "moment";

const TransactionReceipt = ({ transaction, opened, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate receipt content as text or PDF
    const receiptContent = generateReceiptText(transaction);
    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${transaction?.id || "transaction"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReceiptText = (transaction) => {
    return `
TRANSACTION RECEIPT
==================

Receipt No: RCP-${transaction?.id || "N/A"}
Date: ${moment(transaction?.date).format("MMMM DD, YYYY [at] h:mm A")}

TRANSACTION DETAILS
------------------
From: ${transaction?.from?.accountHolderName || "N/A"}
From Account: ${transaction?.from?.accountNumber || "N/A"}

To: ${transaction?.to?.accountHolderName || "N/A"}
To Account: ${transaction?.to?.accountNumber || "N/A"}

Amount: ${formatAmount(transaction?.amount)}
Description: ${transaction?.description || "No description"}
Status: ${transaction?.status || "Completed"}

------------------
CUZ Digital Financial Management System
Generated on: ${moment().format("MMMM DD, YYYY [at] h:mm A")}
    `;
  };

  if (!transaction) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group>
          <IconReceipt size="1.2rem" />
          <Text fw={600}>Transaction Receipt</Text>
        </Group>
      }
      size="md"
      centered
    >
      <Paper
        p="md"
        withBorder
        radius="md"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        {/* Header */}
        <Box ta="center" mb="lg">
          <Text size="xl" fw={700} c="blue">
            Forever Trust Bank
          </Text>
          <Text size="sm" c="dimmed">
            Financial Management System
          </Text>
          <Badge variant="filled" color="green" mt="xs">
            OFFICIAL RECEIPT
          </Badge>
        </Box>

        <Divider my="md" />

        {/* Receipt Details */}
        <Stack gap="sm">
          <Grid>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                Receipt No
              </Text>
              <Text size="sm" fw={500}>
                RCP-{transaction?._id?.slice(-8) || "N/A"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                Date & Time
              </Text>
              <Text size="sm" fw={500}>
                {moment(transaction?.date).format("MMM DD, YYYY")}
              </Text>
              <Text size="xs" c="dimmed">
                {moment(transaction?.date).format("h:mm A")}
              </Text>
            </Grid.Col>
          </Grid>

          <Divider variant="dashed" />

          {/* Transaction Details */}
          <Box>
            <Text size="sm" fw={600} mb="xs" c="dark">
              TRANSACTION DETAILS
            </Text>

            <Paper p="sm" withBorder radius="sm" mb="sm">
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                From Account
              </Text>
              <Text size="sm" fw={500}>
                {transaction?.from?.accountHolderName || "N/A"}
              </Text>
              <Text size="xs" c="dimmed">
                {transaction?.from?.accountNumber || "N/A"}
              </Text>
            </Paper>

            <Paper p="sm" withBorder radius="sm" mb="sm">
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                To Account
              </Text>
              <Text size="sm" fw={500}>
                {transaction?.to?.accountHolderName || "N/A"}
              </Text>
              <Text size="xs" c="dimmed">
                {transaction?.to?.accountNumber || "N/A"}
              </Text>
            </Paper>

            <Paper
              p="sm"
              withBorder
              radius="sm"
              style={{ backgroundColor: "#e7f5ff" }}
            >
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                Amount Transferred
              </Text>
              <Text size="xl" fw={700} c="blue">
                {formatAmount(transaction?.amount)}
              </Text>
            </Paper>
          </Box>

          <Divider variant="dashed" />

          {/* Additional Info */}
          <Grid>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                Description
              </Text>
              <Text size="sm">
                {transaction?.description || "No description provided"}
              </Text>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                Status
              </Text>
              <Badge
                variant="light"
                color={transaction?.status === "completed" ? "green" : "yellow"}
              >
                {transaction?.status || "Completed"}
              </Badge>
            </Grid.Col>
          </Grid>
        </Stack>

        <Divider my="md" />

        {/* Footer */}
        <Box ta="center">
          <Text size="xs" c="dimmed">
            Generated on {moment().format("MMMM DD, YYYY [at] h:mm A")}
          </Text>
          <Text size="xs" c="dimmed">
            This is a computer-generated receipt
          </Text>
        </Box>

        {/* Action Buttons */}
        <Group justify="center" mt="lg">
          <Button
            variant="light"
            leftSection={<IconPrinter size="1rem" />}
            onClick={handlePrint}
          >
            Print Receipt
          </Button>
          <Button
            variant="light"
            color="green"
            leftSection={<IconDownload size="1rem" />}
            onClick={handleDownload}
          >
            Download
          </Button>
        </Group>
      </Paper>
    </Modal>
  );
};

export default TransactionReceipt;
