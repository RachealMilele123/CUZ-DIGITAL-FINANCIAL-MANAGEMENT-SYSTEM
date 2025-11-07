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
  Box,
  Stack,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import { loginUser } from "../services/authService";
import {
  initialLoginValues,
  loginValidationSchema,
} from "../schemaValidation/login";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: initialLoginValues,
    validate: loginValidationSchema,
    validateInputOnBlur: true,
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    const result = await loginUser(values.email, values.password);
    if (result.success) {
      if (result.token) {
        login(result.token, result.user);
      }
      // Check user type and route accordingly
      if (result.user && result.user.type === "admin") {
        navigate("/overview/deposit");
      } else {
        navigate("/overview/balance");
      }
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <Box
      style={{
        position: "relative",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        overflow: "hidden",
        marginTop: "-20px",
      }}
    >
      {/* Background decorative elements */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <Container
        size="xs"
        className={classes.container}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Box className={classes.loginWrapper}>
          {/* Bank Logo/Icon Section */}
          <Box className={classes.logoSection}></Box>

          {/* Login Form */}
          <Paper className={classes.loginForm} shadow="xl" radius="lg" p={32}>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <div className={classes.formHeader}>
                  <Title order={2} className={classes.formTitle}>
                    Welcome Back
                  </Title>
                  <Text className={classes.formSubtitle}>
                    Sign in to access your account
                  </Text>
                </div>

                {error && (
                  <Alert
                    color="red"
                    variant="light"
                    className={classes.errorAlert}
                  >
                    {error}
                  </Alert>
                )}

                <TextInput
                  label="Email Address"
                  placeholder="Enter your email"
                  size="md"
                  radius="md"
                  className={classes.input}
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  size="md"
                  radius="md"
                  className={classes.input}
                  {...form.getInputProps("password")}
                />

                <Group justify="space-between" mt="md">
                  <Checkbox
                    label="Remember me"
                    size="sm"
                    className={classes.checkbox}
                    {...form.getInputProps("rememberMe", { type: "checkbox" })}
                  />
                  <Anchor
                    component={Link}
                    to="/forgot-password"
                    className={classes.forgotLink}
                    size="sm"
                  >
                    Forgot password?
                  </Anchor>
                </Group>

                <Button
                  fullWidth
                  size="md"
                  radius="md"
                  type="submit"
                  loading={loading}
                  className={classes.loginButton}
                  mt="lg"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>

                <Box className={classes.signupSection}>
                  <Text size="sm" className={classes.signupText}>
                    Don't have an account?{" "}
                    <Anchor
                      component={Link}
                      to="/choose-account"
                      className={classes.signupLink}
                    >
                      Create Account
                    </Anchor>
                  </Text>
                </Box>
              </Stack>
            </form>
          </Paper>

          {/* Security Notice */}
          <Box className={classes.securityNotice}>
            <Text size="xs" className={classes.securityText}>
              🔒 Your information is protected with bank-level security
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
