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
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import Transfer from "./Transfer";
 import { useNavigate } from "react-router-dom";

const Beneficiary = () => {
  const token = localStorage.getItem("authToken");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [beneficiaries, setBeneficiaries] = useState([]);

  // ✅ Fetch all beneficiaries safely
  const fetchBeneficiaries = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:8000/cuz/bank/beneficiaries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch beneficiaries");
      }

      const data = await res.json();
      console.log("Fetched data:", data); // Debugging line

      // ✅ Handle different API response shapes
      if (Array.isArray(data)) {
        setBeneficiaries(data);
      } else if (Array.isArray(data.beneficiaries)) {
        setBeneficiaries(data.beneficiaries);
      } else {
        console.warn("Unexpected API structure:", data);
        setBeneficiaries([]);
      }
    } catch (err) {
      console.error("Error fetching beneficiaries:", err);
      setError("Error loading beneficiaries");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load beneficiaries on mount
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // ✅ Form setup
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

  // ✅ Handle save new beneficiary
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

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      toast.success("Beneficiary saved successfully!");
      form.reset();

      // ✅ Refresh the list
      fetchBeneficiaries();
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save beneficiary. Check your inputs or server.");
    } finally {
      setLoading(false);
    }
  };


const handleCardClick = (b) => {
console.log(b)
};


  return (
    <Container size="sm" py="xl">
      {/* --- Add Beneficiary Form --- */}
      <Card shadow="md" radius="lg" withBorder p="lg" mb="lg">
        <Title
          order={3}
          align="center"
          mb="md"
          style={{
            color: "var(--mantine-color-blue-6)",
            fontWeight: 600,
          }}
        >
          Add Beneficiary
        </Title>

        <form onSubmit={form.onSubmit((values) => handleSave(values))}>
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

          {error && (
            <Text align="center" mb="sm">
              {error}
            </Text>
          )}

          <Group position="center" mt="md">
            <Button
              radius="md"
              size="md"
              color="blue"
              type="submit"
              loading={loading}
              style={{ paddingLeft: 30, paddingRight: 30 }}
            >
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

      {beneficiaries.map((b, index) => (
        <Card
          key={index}
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
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
            e.currentTarget.style.borderColor = "#a29bfe";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.05)";
            e.currentTarget.style.borderColor = "#e0e0e0";
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Beneficiary;
