import React from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Box,
  Badge,
  SimpleGrid,
  ThemeIcon,
  Paper,
  Grid,
  Button,
  Avatar,
  Timeline,
  Divider,
} from "@mantine/core";
import {
  IconSchool,
  IconCreditCard,
  IconClock,
  IconShield,
  IconUsers,
  IconTrendingUp,
  IconDeviceMobile,
  IconCheck,
  IconArrowRight,
  IconBuildingBank,
  IconWallet,
  IconReceipt,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Aboutus = () => {
  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        marginTop: "-60px"
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
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
          `,
          pointerEvents: "none",
        }}
      />

      <Container
        size="xl"
        py={{ base: 40, md: 80 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Hero Section */}
        <Stack align="center" mb="xl" spacing="md">
          <Badge
            size="lg"
            variant="light"
            color="blue"
            leftSection={<IconSchool size="1rem" />}
          >
            Revolutionizing Student Banking
          </Badge>

          <Title
            order={1}
            size={{ base: 32, md: 42 }}
            fw={800}
            ta="center"
            c="dark"
          >
            About
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 45 }}
              fw={800}
            >
              {" "}
              Forever Trust Bank
            </Text>
          </Title>

          <Text
            size={{ base: "md", md: "lg" }}
            c="dimmed"
            ta="center"
            maw={700}
          >
            We're transforming how students pay school fees in Zambia. No more
            long queues, no more cash handling, just seamless digital payments
            that save time and money.
          </Text>
        </Stack>

        {/* Mission Statement */}
        <Paper
          shadow="sm"
          p="xl"
          mb="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} c="white" mb="md">
                Our Mission: Simplifying Education Payments
              </Title>
              <Text size="lg" c="white" opacity={0.95}>
                We believe every student deserves easy access to education
                without the hassle of traditional payment methods. Our digital
                platform connects students, parents, and schools for seamless
                fee payments.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <ThemeIcon
                size={120}
                radius="xl"
                variant="white"
                color="rgba(255,255,255,0.2)"
                mx="auto"
              >
                <IconSchool size="3rem" color="white" />
              </ThemeIcon>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* How It Works Section */}
        <Stack align="center" mb="xl" spacing="md">
          <Title order={2} ta="center" mb="md">
            How We Help Students Pay School Fees
          </Title>
          <Text size="lg" c="dimmed" ta="center" maw={600}>
            Our innovative system eliminates queues and makes school fee
            payments instant, secure, and convenient for students across Zambia.
          </Text>
        </Stack>

        {/* Process Timeline */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder mb="xl">
          <Timeline active={3} bulletSize={40} lineWidth={3} color="blue">
            <Timeline.Item
              bullet={
                <ThemeIcon
                  size={40}
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan" }}
                >
                  <IconCreditCard size="1.2rem" />
                </ThemeIcon>
              }
              title="Student Opens Account"
            >
              <Text c="dimmed" size="sm">
                Students create a Forever Trust Bank account in minutes using
                their student ID. Parents can also open accounts for their
                children with proper documentation.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={
                <ThemeIcon
                  size={40}
                  variant="gradient"
                  gradient={{ from: "green", to: "teal" }}
                >
                  <IconBuildingBank size="1.2rem" />
                </ThemeIcon>
              }
              title="School Registers with Us"
            >
              <Text c="dimmed" size="sm">
                Educational institutions register their bank accounts with our
                system. We verify and approve schools to ensure secure
                transactions.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={
                <ThemeIcon
                  size={40}
                  variant="gradient"
                  gradient={{ from: "orange", to: "red" }}
                >
                  <IconDeviceMobile size="1.2rem" />
                </ThemeIcon>
              }
              title="Easy Mobile Payment"
            >
              <Text c="dimmed" size="sm">
                Students use our mobile app or website to pay fees instantly. No
                queuing, no cash handling, just quick digital transfers.
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={
                <ThemeIcon
                  size={40}
                  variant="gradient"
                  gradient={{ from: "violet", to: "grape" }}
                >
                  <IconReceipt size="1.2rem" />
                </ThemeIcon>
              }
              title="Instant Confirmation"
            >
              <Text c="dimmed" size="sm">
                Both students and schools receive instant payment confirmations.
                Digital receipts are generated for record keeping.
              </Text>
            </Timeline.Item>
          </Timeline>
        </Card>

        {/* Key Benefits */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: "md", md: "xl" }}
          mb="xl"
        >
          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <ThemeIcon
              size={60}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 45 }}
              mb="md"
            >
              <IconClock size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              No More Queuing
            </Text>
            <Text size="sm" c="dimmed">
              Say goodbye to long queues at school bursar offices. Pay your fees
              instantly from anywhere, anytime using your mobile phone.
            </Text>
          </Card>

          <Card shadow="sm" padding="xl" radius="md" withBorder>
            <ThemeIcon
              size={60}
              radius="md"
              variant="gradient"
              gradient={{ from: "green", to: "teal", deg: 45 }}
              mb="md"
            >
              <IconShield size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              Secure Transactions
            </Text>
            <Text size="sm" c="dimmed">
              All payments are secured with bank-level encryption. Your money
              goes directly to verified school accounts safely.
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
              <IconWallet size="2rem" />
            </ThemeIcon>
            <Text size="lg" fw={600} mb="xs">
              Lower Costs
            </Text>
            <Text size="sm" c="dimmed">
              Reduce transportation costs to school for fee payments. Our low
              transaction fees save you money on every payment.
            </Text>
          </Card>
        </SimpleGrid>

        {/* Student Success Stories */}
        <Card shadow="sm" padding="xl" radius="lg" withBorder mb="xl">
          <Title order={2} ta="center" mb="xl">
            Student Success Stories
          </Title>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Paper
              shadow="xs"
              p="lg"
              radius="md"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Group mb="md">
                <Avatar
                  size="lg"
                  radius="xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                  }}
                >
                  RM
                </Avatar>
                <Box>
                  <Text fw={600}>Reachel Milele</Text>
                  <Text size="sm" c="dimmed">
                    Cavendish University Student
                  </Text>
                </Box>
              </Group>
              <Text size="sm" style={{ fontStyle: "italic" }}>
                "Forever Trust Bank saved me so much time! I used to spend
                entire days queuing to pay my tuition fees. Now I pay from my
                dorm room in seconds. This is the future of student banking!"
              </Text>
            </Paper>

            <Paper
              shadow="xs"
              p="lg"
              radius="md"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <Group mb="md">
                <Avatar
                  size="lg"
                  radius="xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                  }}
                >
                  SK
                </Avatar>
                <Box>
                  <Text fw={600}>Samson Kwizela</Text>
                  <Text size="sm" c="dimmed">
                    CUZ Student
                  </Text>
                </Box>
              </Group>
              <Text size="sm" style={{ fontStyle: "italic" }}>
                "My parents can now pay my school fees directly from the village
                without traveling to Kigali. The mobile app is so easy to use,
                even my grandmother can send money for my fees!"
              </Text>
            </Paper>
          </SimpleGrid>
        </Card>

        {/* Statistics */}
        <Paper
          shadow="sm"
          p="xl"
          mb="xl"
          radius="lg"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Title order={2} ta="center" mb="xl">
            Our Impact on Education
          </Title>

          <SimpleGrid cols={{ base: 2, md: 4 }} spacing="xl">
            <Stack align="center">
              <ThemeIcon size="xl" variant="light" color="blue">
                <IconUsers size="2rem" />
              </ThemeIcon>
              <Text size="2xl" fw={700} c="blue">
                50,000+
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Students Served
              </Text>
            </Stack>

            <Stack align="center">
              <ThemeIcon size="xl" variant="light" color="green">
                <IconSchool size="2rem" />
              </ThemeIcon>
              <Text size="2xl" fw={700} c="green">
                500+
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Partner Schools
              </Text>
            </Stack>

            <Stack align="center">
              <ThemeIcon size="xl" variant="light" color="orange">
                <IconTrendingUp size="2rem" />
              </ThemeIcon>
              <Text size="2xl" fw={700} c="orange">
                K 2B+
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Fees Processed
              </Text>
            </Stack>

            <Stack align="center">
              <ThemeIcon size="xl" variant="light" color="violet">
                <IconClock size="2rem" />
              </ThemeIcon>
              <Text size="2xl" fw={700} c="violet">
                10,000+
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Hours Saved
              </Text>
            </Stack>
          </SimpleGrid>
        </Paper>

        {/* Call to Action */}
        <Paper
          shadow="sm"
          p="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} c="white" mb="xs">
                Ready to Simplify Your School Fee Payments?
              </Title>
              <Text c="white" opacity={0.9}>
                Join thousands of students who have already discovered the
                easiest way to pay school fees. Open your account today and
                never queue again!
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group justify={{ base: "center", md: "flex-end" }} gap="md">
                <Button
                  component={Link}
                  to="/register"
                  size="lg"
                  variant="white"
                  color="dark"
                  radius="md"
                  rightSection={<IconArrowRight size="1.2rem" />}
                >
                  Open Account
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Aboutus;
