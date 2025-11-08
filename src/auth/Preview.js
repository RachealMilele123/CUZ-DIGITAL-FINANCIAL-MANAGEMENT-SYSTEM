import React from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Card,
  Grid,
  Box,
  ThemeIcon,
  List,
} from "@mantine/core";
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconGenderBigender,
  IconBuildingBank,
  IconCheck,
  IconShield,
  IconCreditCard,
} from "@tabler/icons-react";

const Preview = ({ form }) => {
  const formValues = form?.getValues() || {};

  const formatDate = (date) => {
    if (!date) return "Not provided";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const getAccountTypeDetails = () => {
    switch (formValues.accountType) {
      case "student":
        return {
          icon: IconUser,
          color: "blue",
          title: "Student Banking Account",
          description:
            "Special banking package for students with exclusive benefits",
          features: [
            "No monthly fees",
            "Student loans eligibility",
            "Campus banking services",
          ],
        };
      case "personal":
        return {
          icon: IconUser,
          color: "green",
          title: "Personal Banking Account",
          description: "Complete banking solution for individual customers",
          features: [
            "Online banking",
            "Mobile app access",
            "Debit card included",
          ],
        };
      case "business":
        return {
          icon: IconBuildingBank,
          color: "orange",
          title: "Business Banking Account",
          description: "Comprehensive banking for business operations",
          features: [
            "Business loans",
            "Merchant services",
            "Multi-user access",
          ],
        };
      case "savings":
        return {
          icon: IconCreditCard,
          color: "teal",
          title: "Savings Account",
          description:
            "High-yield savings account with competitive interest rates",
          features: [
            "High interest rates",
            "No withdrawal limits",
            "Goal-based savings",
          ],
        };
      default:
        return {
          icon: IconBuildingBank,
          color: "gray",
          title: "Banking Account",
          description: "Your banking solution",
          features: [],
        };
    }
  };

  const accountDetails = getAccountTypeDetails();
  const AccountIcon = accountDetails.icon;

  return (
    <Container size="md">
      <Stack gap="xl">
        {/* Header */}
        <Paper
          p="xl"
          radius="lg"
          withBorder
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          }}
        >
          <Group justify="center" mb="md">
            <ThemeIcon size={60} radius="xl" color="white" variant="light">
              <IconCheck size={30} />
            </ThemeIcon>
          </Group>
          <Title order={1} ta="center" c="white" mb="xs">
            Account Setup Complete!
          </Title>
          <Text ta="center" c="white" size="lg">
            Please review your information before submitting
          </Text>
        </Paper>

        {/* Account Type Card */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="md">
            <ThemeIcon size={50} radius="xl" color={accountDetails.color}>
              <AccountIcon size={25} />
            </ThemeIcon>
            <Box>
              <Title order={3} c={accountDetails.color}>
                {accountDetails.title}
              </Title>
              <Text size="sm" c="dimmed">
                {accountDetails.description}
              </Text>
            </Box>
          </Group>

          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color={accountDetails.color} size={18} radius="xl">
                <IconCheck size={12} />
              </ThemeIcon>
            }
          >
            {accountDetails.features.map((feature, index) => (
              <List.Item key={index}>{feature}</List.Item>
            ))}
          </List>
        </Card>

        <Grid>
          {/* Personal Information */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              <Title order={4} mb="md" c="blue">
                <Group gap="xs">
                  <IconUser size={20} />
                  Personal Information
                </Group>
              </Title>

              <Stack gap="sm">
                <Group gap="xs">
                  <IconUser size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Full Name:
                  </Text>
                  <Text size="sm">{formValues.fullName || "Not provided"}</Text>
                </Group>

                <Group gap="xs">
                  <IconMail size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Email:
                  </Text>
                  <Text size="sm">{formValues.email || "Not provided"}</Text>
                </Group>

                <Group gap="xs">
                  <IconPhone size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Phone:
                  </Text>
                  <Text size="sm">{formValues.phone || "Not provided"}</Text>
                </Group>

                <Group gap="xs">
                  <IconCalendar size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Date of Birth:
                  </Text>
                  <Text size="sm">{formatDate(formValues.dateOfBirth)}</Text>
                </Group>

                <Group gap="xs">
                  <IconMapPin size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Address:
                  </Text>
                  <Text size="sm">{formValues.address || "Not provided"}</Text>
                </Group>

                <Group gap="xs">
                  <IconGenderBigender size={16} color="gray" />
                  <Text size="sm" fw={500}>
                    Gender:
                  </Text>
                  <Text size="sm" tt="capitalize">
                    {formValues.gender || "Not provided"}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>

          {/* Account-Specific Information */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
              <Title order={4} mb="md" c={accountDetails.color}>
                <Group gap="xs">
                  <AccountIcon size={20} />
                  Account Details
                </Group>
              </Title>

              <Stack gap="sm">
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    Account Type:
                  </Text>
                  <Badge
                    color={accountDetails.color}
                    variant="light"
                    tt="capitalize"
                  >
                    {formValues.accountType || "Not selected"}
                  </Badge>
                </Group>

                {/* Conditional account-specific fields */}
                {formValues.accountType === "student" && (
                  <>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        School:
                      </Text>
                      <Text size="sm">
                        {formValues.schoolName || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Student Number:
                      </Text>
                      <Text size="sm">
                        {formValues.studentNumber || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Course:
                      </Text>
                      <Text size="sm">
                        {formValues.courseOfStudy || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Year of Study:
                      </Text>
                      <Text size="sm">
                        {formValues.yearOfStudy || "Not provided"}
                      </Text>
                    </Group>
                  </>
                )}

                {formValues.accountType === "personal" && (
                  <>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Full Name:
                      </Text>
                      <Text size="sm">
                        {formValues.personalFullName || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        National ID:
                      </Text>
                      <Text size="sm">
                        {formValues.nationalId || "Not provided"}
                      </Text>
                    </Group>
                  </>
                )}

                {formValues.accountType === "business" && (
                  <>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Business Name:
                      </Text>
                      <Text size="sm">
                        {formValues.businessName || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Registration No:
                      </Text>
                      <Text size="sm">
                        {formValues.registrationNumber || "Not provided"}
                      </Text>
                    </Group>
                  </>
                )}

                {formValues.accountType === "savings" && (
                  <>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Account Holder:
                      </Text>
                      <Text size="sm">
                        {formValues.accountHolderName || "Not provided"}
                      </Text>
                    </Group>
                    <Group gap="xs">
                      <Text size="sm" fw={500}>
                        Initial Deposit:
                      </Text>
                      <Text size="sm">
                        {formValues.initialDeposit || "Not provided"}
                      </Text>
                    </Group>
                  </>
                )}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Security Notice */}
        <Paper
          p="md"
          radius="md"
          withBorder
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <Group>
            <ThemeIcon color="green" variant="light" size="lg">
              <IconShield size={20} />
            </ThemeIcon>
            <Box>
              <Text fw={500} size="sm">
                Security & Privacy
              </Text>
              <Text size="xs" c="dimmed">
                Your information is encrypted and protected with bank-level
                security. By proceeding, you agree to our Terms of Service and
                Privacy Policy.
              </Text>
            </Box>
          </Group>
        </Paper>

        {/* Terms Confirmation */}
        <Card shadow="sm" padding="md" radius="md" withBorder>
          <Group>
            <ThemeIcon
              color={formValues.termsOfService ? "green" : "gray"}
              variant="light"
            >
              <IconCheck size={16} />
            </ThemeIcon>
            <Text size="sm" fw={500}>
              Terms of Service:{" "}
              {formValues.termsOfService ? "Accepted" : "Not accepted"}
            </Text>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
};

export default Preview;
