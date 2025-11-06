import {
  Box,
  Button,
  Container,
  Modal,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { transaction, transactionHistory } from "../services/authService";
import { useDisclosure } from "@mantine/hooks";
import { Stats } from "../component/Stats";

const Transfer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [summary, setSummary] = useState();

  const accountNumber = localStorage.getItem("accountNumber");
  console.log("Account Number from localStorage:", accountNumber);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      fromAccountNumber: accountNumber || "",
      toAccountNumber: "",
      amount: "",
      description: "",
    },

    validate: {
      fromAccountNumber: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter a valid account number";
        }
        return null;
      },
      toAccountNumber: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter a valid account number";
        }
        return null;
      },
      amount: (value) => {
        if (value <= 0) {
          return "Amount must be greater than zero";
        }
        return null;
      },
      description: (value) => {
        if (!value || value.trim() === "") {
          return "Please enter a description";
        }
        return null;
      },
    },
  });
  const sendMoney = async (values) => {
    const payload = {
      fromAccountNumber: values.fromAccountNumber,
      toAccountNumber: values.toAccountNumber,
      amount: values.amount,
      description: values.description,
    };
    const response = await transaction(payload);

    if (response.success) {
      console.log("Transaction successful:", response.data);
    } else {
      console.error("Transaction failed:", response.error);
    }
  };

  const fetchTransactionHistory = async () => {
    const response = await transactionHistory(accountNumber);

    setSummary(response.data.summary);
    if (response.success) {
      console.log("Transaction history successful:", response.data);
    } else {
      console.error("Transaction history failed:", response.error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, [accountNumber]);

  return (
    <>
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          mb="xl"
        >
          <Text size="xl" c="black" mt="lg">
            Transfer
          </Text>
          <Button variant="default" c="white" bg="blue" curser="pointer">
            Tranfer Money
          </Button>
        </Box>
      </Container>
      <Modal
        opened={opened}
        onClose={close}
        title="Tranfer Money"
        centered
        size="md"
      >
        <Stack gap="sm">
          <form
            onSubmit={form.onSubmit((values) => {
              sendMoney(values);
              close();
            })}
          >
            <TextInput
              label="Tranfer To"
              placeholder="014525168"
              size="md"
              {...form.getInputProps("toAccountNumber")}
            />

            <NumberInput
              withAsterisk
              label="Amount"
              size="md"
              {...form.getInputProps("amount")}
            />

            <Textarea
              label="Description"
              size="md"
              {...form.getInputProps("description")}
            />

            <Button mt="lg" fullWidth type="submit">
              Transfer Money
            </Button>
          </form>
        </Stack>
      </Modal>

      <Stats summary={summary} />
    </>
  );
};

export default Transfer;
