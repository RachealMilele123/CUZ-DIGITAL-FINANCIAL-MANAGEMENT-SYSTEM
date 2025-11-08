import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Text,
  Title,
  Grid,
  Card,
  Group,
  Stack,
  Badge,
  Box,
  SimpleGrid,
  ThemeIcon,
} from "@mantine/core";
import {
  IconShield,
  IconCreditCard,
  IconTrendingUp,
  IconDeviceMobile,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import classes from "./Hero.module.css";

export function Hero() {
  return (
    <Box style={{ marginTop: "-80px" }} className={classes.wrapper}>
      {/* Hero Section */}
      <Container size="xl" py={{ base: 60, md: 100 }}>
        <Grid align="center" gutter={{ base: 20, md: 40 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack spacing="xl">
              <Box>
                <Badge
                  size="lg"
                  variant="light"
                  color="blue"
                  mb="lg"
                  leftSection={<IconShield size="1rem" />}
                >
                  Trusted by 10,000+ Users
                </Badge>

                <Title
                  order={1}
                  size={{ base: 36, md: 48, lg: 56 }}
                  fw={800}
                  lh={1.1}
                  mb="md"
                  c="dark"
                >
                  Forever Trust Bank
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan", deg: 45 }}
                    fw={800}
                  >
                    {" "}
                    Digital Banking
                  </Text>
                </Title>

                <Text
                  size={{ base: "lg", md: "xl" }}
                  c="dimmed"
                  mb="xl"
                  maw={500}
                >
                  Experience the future of banking with our secure, fast, and
                  user-friendly digital financial management system. Manage your
                  money with confidence.
                </Text>
              </Box>

              <Group gap="md">
                <Button
                  component={Link}
                  to="/register"
                  size="lg"
                  radius="md"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 45 }}
                  rightSection={<IconArrowRight size="1.2rem" />}
                >
                  Open Account
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  size="lg"
                  radius="md"
                  variant="outline"
                  color="blue"
                >
                  Sign In
                </Button>
              </Group>

              {/* Trust Indicators */}
              <Group gap="xl" mt="xl">
                <Group gap="xs">
                  <ThemeIcon size="sm" variant="light" color="green">
                    <IconCheck size="0.8rem" />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    Bank-level Security
                  </Text>
                </Group>
                <Group gap="xs">
                  <ThemeIcon size="sm" variant="light" color="green">
                    <IconCheck size="0.8rem" />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    24/7 Support
                  </Text>
                </Group>
                <Group gap="xs">
                  <ThemeIcon size="sm" variant="light" color="green">
                    <IconCheck size="0.8rem" />
                  </ThemeIcon>
                  <Text size="sm" c="dimmed">
                    Mobile First
                  </Text>
                </Group>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box className={classes.imageSection}>
              {/* Banking Cards Visual */}
              <Stack align="center" spacing="lg">
                <Card
                  shadow="xl"
                  radius="lg"
                  p="xl"
                  w="100%"
                  maw={400}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    transform: "rotate(-2deg)",
                  }}
                >
                  <Group justify="space-between" mb="md">
                    <Text size="sm" opacity={0.8}>
                      FOREVER TRUST BANK
                    </Text>
                    <IconCreditCard size="1.5rem" />
                  </Group>
                  <Text
                    size="lg"
                    fw={600}
                    mb="xs"
                    style={{ letterSpacing: "2px" }}
                  >
                    •••• •••• •••• 1234
                  </Text>
                  <Group justify="space-between">
                    <Box>
                      <Text size="xs" opacity={0.8}>
                        CARD HOLDER
                      </Text>
                      <Text size="sm" fw={500}>
                        JOHN STUDENT
                      </Text>
                    </Box>
                    <Box>
                      <Text size="xs" opacity={0.8}>
                        EXPIRES
                      </Text>
                      <Text size="sm" fw={500}>
                        12/27
                      </Text>
                    </Box>
                  </Group>
                </Card>

                <Card
                  shadow="lg"
                  radius="lg"
                  p="lg"
                  w="100%"
                  maw={400}
                  style={{
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    transform: "rotate(2deg)",
                    marginTop: "-20px",
                  }}
                >
                  <Group justify="space-between" align="center">
                    <Box>
                      <Text size="xs" opacity={0.8}>
                        BALANCE
                      </Text>
                      <Text size="xl" fw={700}>
                        K 150,000
                      </Text>
                    </Box>
                    <ThemeIcon
                      size="xl"
                      variant="white"
                      color="rgba(255,255,255,0.2)"
                    >
                      <IconTrendingUp size="1.5rem" color="white" />
                    </ThemeIcon>
                  </Group>
                </Card>
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Features Section */}
      <Container size="xl" py={{ base: 40, md: 80 }}>
        <Stack align="center" mb="xl">
          <Title order={2} ta="center" mb="md">
            Why Choose Forever Trust Bank?
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            We provide comprehensive digital banking solutions designed
            specifically for educational institutions and students.
          </Text>
        </Stack>

        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: "md", md: "xl" }}
        >
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <ThemeIcon
              size={60}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 45 }}
              mb="md"
            >
              <IconShield size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              Bank-Level Security
            </Text>
            <Text size="sm" c="dimmed">
              Your funds and data are protected with industry-leading security
              measures and encryption protocols.
            </Text>
          </Card>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <ThemeIcon
              size={60}
              radius="md"
              variant="gradient"
              gradient={{ from: "teal", to: "green", deg: 45 }}
              mb="md"
            >
              <IconDeviceMobile size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              Mobile Optimized
            </Text>
            <Text size="sm" c="dimmed">
              Access your account anywhere, anytime with our responsive
              mobile-first design and user experience.
            </Text>
          </Card>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <ThemeIcon
              size={60}
              radius="md"
              variant="gradient"
              gradient={{ from: "orange", to: "red", deg: 45 }}
              mb="md"
            >
              <IconTrendingUp size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              Smart Analytics
            </Text>
            <Text size="sm" c="dimmed">
              Track your spending, set budgets, and get insights into your
              financial habits with our advanced analytics.
            </Text>
          </Card>
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box style={{ backgroundColor: "#f8f9fa" }}>
        <Container size="xl" py={{ base: 40, md: 60 }}>
          <Stack align="center" spacing="xl">
            <Title order={2} ta="center">
              Ready to Get Started?
            </Title>
            <Text size="lg" c="dimmed" ta="center" maw={500}>
              Join thousands of students and institutions who trust Forever
              Trust Bank for their financial management needs.
            </Text>
            <Group gap="md">
              <Button
                component={Link}
                to="/register"
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 45 }}
                rightSection={<IconArrowRight size="1.2rem" />}
              >
                Create Account
              </Button>
              <Button
                component={Link}
                to="/login"
                size="xl"
                radius="md"
                variant="outline"
                color="blue"
              >
                Sign In
              </Button>
            </Group>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
