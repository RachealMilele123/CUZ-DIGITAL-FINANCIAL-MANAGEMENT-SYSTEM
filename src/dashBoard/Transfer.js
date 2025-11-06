import {
  Button,
  Container,
  NumberInput,
  Stack,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { transaction } from "../services/authService";

const Transfer = () => {
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

  return (
    <>
      <Text size="xl" c="black" mt="lg">
        Transfer
      </Text>
      <Container size={600}>
        <Stack gap="sm">
          <form onSubmit={form.onSubmit((values) => sendMoney(values))}>
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
      </Container>
    </>
  );
};

export default Transfer;
