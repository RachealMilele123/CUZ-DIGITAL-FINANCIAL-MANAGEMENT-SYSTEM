import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // 💖 new

  const loginUser = () => {
    setLoading(true); // 💖 start loading

    fetch("http://localhost:9000/cuz/bank/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login successful:", data);
        navigate("/overview");
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  return (
    <div className={classes.background}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome to Forever Trust Bank
        </Title>
        <p className="Motto-paragraph">Reliable. Always with you</p>

        <Text className={classes.subtitle}>
          Do not have an account yet?{" "}
          <Anchor component={Link} to="/choose-account">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            radius="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Link to="/forgot-password" style={{ fontSize: "0.9rem" }}>
              Forgot password?
            </Link>
          </Group>
          <Button
            fullWidth
            mt="xl"
            radius="md"
            onClick={loginUser}
            loading={loading} 
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
