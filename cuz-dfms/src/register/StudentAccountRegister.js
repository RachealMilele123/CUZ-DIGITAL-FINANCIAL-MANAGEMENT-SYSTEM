import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Select,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./StudentAccountRegister.module.css";
import { useState } from "react";

export function StudentAccountRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [studentId, setStudentId] = useState("");
  const [school, setSchool] = useState("");
  const [program, setProgram] = useState("");
  const [year, setYear] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleRegister = async () => {
    if (!name || !email || !number || !studentId || !school || !program || !year || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/cuz/bank/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone: number,
          studentId,
          school,
          program,
          year,
          password,
          accountType: "Student",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        console.log("Response:", data);
      } else {
        alert(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.background}>
      <Container size={480} my={40}>
        <Title ta="center" className={classes.title}>
          Student Account Registration
        </Title>
        <Text ta="center" size="sm" c="dimmed" mb={20}>
          Join <strong>Forever Trust Bank</strong> — manage your finances as a student, easily and securely.
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md">
          <TextInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            radius="md"
          />

          <TextInput
            label="Email"
            placeholder="you@student.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Phone Number"
            placeholder="+260..."
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Student ID / Registration Number"
            placeholder="CUZ12345"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="School / University"
            placeholder="Cavendish University Zambia"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Program of Study"
            placeholder="Bachelor of Science in Computing"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <Select
            label="Year of Study"
            placeholder="Select your year"
            data={["Year 1", "Year 2", "Year 3", "Year 4"]}
            value={year}
            onChange={setYear}
            required
            mt="md"
            radius="md"
          />

          <PasswordInput
            label="Create Password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            mt="md"
            radius="md"
          />

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} to="/login" size="sm" c="dimmed">
              Back to Login
            </Anchor>
            <Button
              radius="md"
              className={classes.button}
              loading={loading}
              onClick={handleRegister}
            >
              Create Account
            </Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}
