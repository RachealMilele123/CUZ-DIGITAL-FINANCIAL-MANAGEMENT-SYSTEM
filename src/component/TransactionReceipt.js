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
import { useAuth } from "../contexts/AuthContext";
import jsPDF from "jspdf";

const TransactionReceipt = ({ transaction, opened, onClose }) => {
  console.log("TransactionReceipt transaction:", transaction);
  const { user } = useAuth();
  console.log("TransactionReceipt user:", user);
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate PDF receipt
    const pdf = new jsPDF();

    // Set font
    pdf.setFont("helvetica");

    // Header
    pdf.setFontSize(20);
    pdf.setTextColor(33, 150, 243); // Blue color
    pdf.text("FOREVER TRUST BANK", 105, 25, { align: "center" });

    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text("Financial Management System", 105, 35, { align: "center" });

    // Official Receipt Badge
    pdf.setFontSize(10);
    pdf.setTextColor(255, 255, 255);
    pdf.setFillColor(76, 175, 80); // Green background
    pdf.rect(85, 42, 40, 8, "F");
    pdf.text("OFFICIAL RECEIPT", 105, 47, { align: "center" });

    // Reset color
    pdf.setTextColor(0, 0, 0);

    // Receipt Details Header
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("TRANSACTION RECEIPT", 20, 65);

    // Draw line
    pdf.line(20, 70, 190, 70);

    // Receipt Info
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");

    let yPosition = 85;

    // Receipt Number and Date
    pdf.setFont("helvetica", "bold");
    pdf.text("Receipt No:", 20, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(`RCP-${transaction?._id?.slice(-8) || "N/A"}`, 60, yPosition);

    pdf.setFont("helvetica", "bold");
    pdf.text("Date & Time:", 120, yPosition);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      moment(transaction?.date).format("MMM DD, YYYY [at] h:mm A"),
      160,
      yPosition
    );

    yPosition += 20;

    // Transaction Details
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("TRANSACTION DETAILS", 20, yPosition);

    yPosition += 10;
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 15;

    // From Account
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("FROM ACCOUNT:", 20, yPosition);
    yPosition += 8;
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Name: ${transaction?.from?.accountHolderName || "N/A"}`,
      25,
      yPosition
    );
    yPosition += 6;
    pdf.text(
      `Account: ${transaction?.from?.accountNumber || "N/A"}`,
      25,
      yPosition
    );

    yPosition += 15;

    // To Account
    pdf.setFont("helvetica", "bold");
    pdf.text("TO ACCOUNT:", 20, yPosition);
    yPosition += 8;
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Name: ${transaction?.to?.accountHolderName || "N/A"}`,
      25,
      yPosition
    );
    yPosition += 6;
    pdf.text(
      `Account: ${transaction?.to?.accountNumber || "N/A"}`,
      25,
      yPosition
    );

    yPosition += 20;

    // Amount (highlighted box)
    pdf.setFillColor(231, 245, 255); // Light blue background
    pdf.rect(20, yPosition - 5, 170, 20, "F");
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("AMOUNT TRANSFERRED:", 25, yPosition + 3);
    pdf.setFontSize(16);
    pdf.setTextColor(33, 150, 243); // Blue color
    pdf.text(formatAmount(transaction?.amount), 25, yPosition + 12);

    // Reset color
    pdf.setTextColor(0, 0, 0);
    yPosition += 30;

    // Description and Status
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Description:", 20, yPosition);
    pdf.setFont("helvetica", "normal");
    const description = transaction?.description || "No description provided";
    pdf.text(
      description.length > 50
        ? description.substring(0, 50) + "..."
        : description,
      65,
      yPosition
    );

    pdf.setFont("helvetica", "bold");
    pdf.text("Status:", 20, yPosition + 10);
    pdf.setFont("helvetica", "normal");
    pdf.text(transaction?.status || "Completed", 65, yPosition + 10);

    yPosition += 30;

    // Footer line
    pdf.line(20, yPosition, 190, yPosition);
    yPosition += 15;

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text(
      `Generated on ${moment().format("MMMM DD, YYYY [at] h:mm A")}`,
      105,
      yPosition,
      { align: "center" }
    );
    pdf.text("This is a computer-generated receipt", 105, yPosition + 8, {
      align: "center",
    });

    // Save the PDF
    pdf.save(`receipt-${transaction?._id?.slice(-8) || "transaction"}.pdf`);
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
            Download PDF
          </Button>
        </Group>
      </Paper>
    </Modal>
  );
};

export default TransactionReceipt;
