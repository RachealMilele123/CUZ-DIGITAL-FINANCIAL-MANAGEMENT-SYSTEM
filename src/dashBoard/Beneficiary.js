import React, { useState, useEffect } from "react";
import {
  Container,
  TextInput,
  Textarea,
  Title,
  Card,
  Button,
  Group,
  Loader,
  Text,
  Modal,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";

const Beneficiary = () => {
  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [opened, setOpened] = useState(false);
  const [amount, setAmount] = useState("");
  const [transferDesc, setTransferDesc] = useState("");

  // ✅ Fetch all beneficiaries
  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8000/cuz/bank/beneficiaries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch beneficiaries");

      const data = await res.json();
      if (Array.isArray(data)) setBeneficiaries(data);
      else if (Array.isArray(data.beneficiaries))
        setBeneficiaries(data.beneficiaries);
      else setBeneficiaries([]);
    } catch (err) {
      console.error("Error fetching beneficiaries:", err);
      setError("Error loading beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // ✅ Add beneficiary form
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      accountNumber: "",
      nickname: "",
      description: "",
    },
    validate: {
      accountNumber: (value) =>
        value.trim() === "" ? "Please enter a valid account number" : null,
      nickname: (value) =>
        value.trim() === "" ? "Nick name is required" : null,
      description: (value) =>
        value.trim() === "" ? "Please enter a description" : null,
    },
  });

  // ✅ Save beneficiary
  const handleSave = async (values) => {
    const payload = {
      accountNumber: values.accountNumber,
      nickname: values.nickname,
      description: values.description,
    };

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8000/cuz/bank/beneficiaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      toast.success("Beneficiary saved successfully!");
      form.reset();
      fetchBeneficiaries();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save beneficiary. Check your inputs or server.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ When clicking a beneficiary card
  const handleCardClick = (b) => {
    setSelectedBeneficiary(b);
    setOpened(true);
  };
   console.log("object",setSelectedBeneficiary)

  // ✅ Handle transfer
  const handleTransfer = async () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        "http://localhost:8000/cuz/bank/transfer-to-beneficiary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            beneficiaryId: selectedBeneficiary?.id,
            amount: Number(amount),
            description: transferDesc,
          }),
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Transfer successful!");
        setOpened(false);
        setAmount("");
        setTransferDesc("");
      } else {
        toast.error(data.message || "Transfer failed.");
      }
    } catch (err) {
      console.error("Transfer error:", err);
      toast.error("Error during transfer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">

      {/* --- Add Beneficiary Form --- */}
      <Card shadow="md" radius="lg" withBorder p="lg" mb="lg">
        <Title order={3} align="center" mb="md" c="blue">
          Add Beneficiary
        </Title>

        <form onSubmit={form.onSubmit(handleSave)}>
          <TextInput
            label="Transfer To"
            placeholder="014525168"
            size="md"
            mb="md"
            {...form.getInputProps("accountNumber")}
          />

          <TextInput
            label="Nick Name"
            placeholder="Cavendish FAO"
            radius="md"
            size="md"
            mb="md"
            withAsterisk
            {...form.getInputProps("nickname")}
          />

          <Textarea
            label="Description"
            placeholder="He is..."
            radius="md"
            size="md"
            autosize
            minRows={3}
            mb="lg"
            {...form.getInputProps("description")}
          />

          <Group position="center">
            <Button type="submit" radius="md" color="blue" loading={loading}>
              Save Beneficiary
            </Button>
          </Group>
        </form>
      </Card>

      {/* --- Beneficiaries List --- */}
      <Title order={4} mb="sm" align="center">
        Saved Beneficiaries
      </Title>

      {loading && beneficiaries.length === 0 && (
        <Group position="center" mt="md">
          <Loader />
        </Group>
      )}

      {!loading && beneficiaries.length === 0 && (
        <Text align="center" color="dimmed">
          No beneficiaries added yet.
        </Text>
      )}

      {beneficiaries.map((b) => (
        <Card
          key={b.id}
          shadow="md"
          radius="lg"
          withBorder
          onClick={() => handleCardClick(b)}
          style={{
            backgroundColor: "#f8f9fa",
            padding: "18px 20px",
            marginBottom: "10px",
            cursor: "pointer",
            transition: "all 0.25s ease",
            border: "1px solid #e0e0e0",
          }}
        >
          <Text fw={700} size="lg" c="indigo">
            {b.nickname}
          </Text>
          <Text size="sm" c="dimmed">
            Account Number:{" "}
            <span style={{ color: "#333", fontWeight: 500 }}>
              {b.accountNumber}
            </span>
          </Text>
          <Text size="sm" c="dimmed">
            Description:{" "}
            <span style={{ color: "#555", fontStyle: "italic" }}>
              {b.description}
            </span>
          </Text>
        </Card>
      ))}

      {/* --- Transfer Modal --- */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`Transfer to ${selectedBeneficiary?.nickname}`}
        centered
      >
        <TextInput
          label="Amount"
          placeholder="Enter amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          mb="md"
        />
        <Textarea
          label="Description"
          placeholder="Optional note"
          value={transferDesc}
          onChange={(e) => setTransferDesc(e.target.value)}
          mb="md"
        />
        <Group position="right">
          <Button color="blue" onClick={handleTransfer} loading={loading}>
            Send
          </Button>
          <Button variant="outline" onClick={() => setOpened(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default Beneficiary;
