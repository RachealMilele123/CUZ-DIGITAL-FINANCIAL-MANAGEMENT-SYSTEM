import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  Text,
  Title,
  TextInput,
  Textarea,
  Button,
  Stack,
  Group,
  Box,
  ThemeIcon,
  SimpleGrid,
  Paper,
  Badge,
  Divider,
} from "@mantine/core";
import {
  IconPhone,
  IconMail,
  IconMapPin,
  IconClock,
  IconSend,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconShield,
  IconHeadset,
  IconCreditCard,
} from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";

export function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 2 ? "Name must be at least 2 characters" : null,
      email: (value) =>
        !/^\S+@\S+\.\S+$/.test(value) ? "Please enter a valid email" : null,
      phone: (value) =>
        value.trim().length < 10 ? "Please enter a valid phone number" : null,
      subject: (value) =>
        value.trim().length === 0 ? "Subject is required" : null,
      message: (value) =>
        value.trim().length < 10
          ? "Message must be at least 10 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success(
        "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
      );
      form.reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        marginTop: "-120px",
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
        {/* Header Section */}
        <Stack align="center" mb="xl" spacing="md">
          <Badge
            size="lg"
            variant="light"
            color="blue"
            leftSection={<IconHeadset size="1rem" />}
          >
            24/7 Customer Support
          </Badge>

          <Title
            order={1}
            size={{ base: 32, md: 42 }}
            fw={800}
            ta="center"
            c="dark"
          >
            Get in Touch with
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
            maw={600}
          >
            Have questions about our banking services? Need help with your
            account? Our dedicated team is here to assist you with personalized
            support.
          </Text>
        </Stack>

        <Grid gutter={{ base: "md", md: "xl" }}>
          {/* Contact Form */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Card shadow="sm" padding="xl" radius="lg" withBorder>
              <Title order={2} mb="lg" c="dark">
                Send us a Message
              </Title>

              <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack spacing="md">
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Full Name"
                        placeholder="Enter your full name"
                        size="md"
                        radius="md"
                        required
                        {...form.getInputProps("name")}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Email Address"
                        placeholder="your.email@example.com"
                        size="md"
                        radius="md"
                        required
                        {...form.getInputProps("email")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Phone Number"
                        placeholder="+260 xxx xxx xxx"
                        size="md"
                        radius="md"
                        required
                        {...form.getInputProps("phone")}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label="Subject"
                        placeholder="How can we help you?"
                        size="md"
                        radius="md"
                        required
                        {...form.getInputProps("subject")}
                      />
                    </Grid.Col>
                  </Grid>

                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    size="md"
                    radius="md"
                    minRows={5}
                    required
                    {...form.getInputProps("message")}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    radius="md"
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan", deg: 45 }}
                    rightSection={<IconSend size="1.2rem" />}
                    loading={isSubmitting}
                    fullWidth
                    mt="md"
                  >
                    {isSubmitting ? "Sending Message..." : "Send Message"}
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid.Col>

          {/* Contact Information */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack spacing="md">
              {/* Contact Details */}
              <Card shadow="sm" padding="lg" radius="lg" withBorder>
                <Stack spacing="md">
                  <Title order={3} c="dark" mb="sm">
                    Contact Information
                  </Title>

                  <Group gap="md">
                    <ThemeIcon
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "blue", to: "cyan", deg: 45 }}
                    >
                      <IconMapPin size="1.2rem" />
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600} c="dark">
                        Visit Our Branch
                      </Text>
                      <Text size="sm" c="dimmed">
                        lusaka zambia
                        <br />
                        Cario Road, plot no.123
                      </Text>
                    </Box>
                  </Group>

                  <Group gap="md">
                    <ThemeIcon
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "teal", to: "green", deg: 45 }}
                    >
                      <IconPhone size="1.2rem" />
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600} c="dark">
                        Call Us
                      </Text>
                      <Text size="sm" c="dimmed">
                        +260 972 100 325
                        <br />
                        +260 973 108 950 
                      </Text>
                    </Box>
                  </Group>

                  <Group gap="md">
                    <ThemeIcon
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "orange", to: "red", deg: 45 }}
                    >
                      <IconMail size="1.2rem" />
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600} c="dark">
                        Email Us
                      </Text>
                      <Text size="sm" c="dimmed">
                        support@forevertrustbank.rw
                        <br />
                        info@forevertrustbank.rw
                      </Text>
                    </Box>
                  </Group>

                  <Group gap="md">
                    <ThemeIcon
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "violet", to: "grape", deg: 45 }}
                    >
                      <IconClock size="1.2rem" />
                    </ThemeIcon>
                    <Box>
                      <Text size="sm" fw={600} c="dark">
                        Business Hours
                      </Text>
                      <Text size="sm" c="dimmed">
                        Mon - Fri: 8:00 AM - 6:00 PM
                        <br />
                        Sat: 9:00 AM - 4:00 PM
                      </Text>
                    </Box>
                  </Group>
                </Stack>
              </Card>

              {/* Services Card */}
              <Card shadow="sm" padding="lg" radius="lg" withBorder>
                <Title order={3} c="dark" mb="md">
                  Our Banking Services
                </Title>
                <Stack spacing="xs">
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="blue">
                      <IconCreditCard size="0.8rem" />
                    </ThemeIcon>
                    <Text size="sm">Digital Banking Solutions</Text>
                  </Group>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="green">
                      <IconShield size="0.8rem" />
                    </ThemeIcon>
                    <Text size="sm">Secure Transaction Processing</Text>
                  </Group>
                  <Group gap="xs">
                    <ThemeIcon size="sm" variant="light" color="orange">
                      <IconHeadset size="0.8rem" />
                    </ThemeIcon>
                    <Text size="sm">24/7 Customer Support</Text>
                  </Group>
                </Stack>
              </Card>

              {/* Social Media */}
              <Card shadow="sm" padding="lg" radius="lg" withBorder>
                <Title order={3} c="dark" mb="md">
                  Follow Us
                </Title>
                <Group gap="md">
                  <ThemeIcon
                    size="lg"
                    variant="light"
                    color="blue"
                    style={{ cursor: "pointer" }}
                  >
                    <IconBrandFacebook size="1.2rem" />
                  </ThemeIcon>
                  <ThemeIcon
                    size="lg"
                    variant="light"
                    color="cyan"
                    style={{ cursor: "pointer" }}
                  >
                    <IconBrandTwitter size="1.2rem" />
                  </ThemeIcon>
                  <ThemeIcon
                    size="lg"
                    variant="light"
                    color="blue"
                    style={{ cursor: "pointer" }}
                  >
                    <IconBrandLinkedin size="1.2rem" />
                  </ThemeIcon>
                  <ThemeIcon
                    size="lg"
                    variant="light"
                    color="pink"
                    style={{ cursor: "pointer" }}
                  >
                    <IconBrandInstagram size="1.2rem" />
                  </ThemeIcon>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>

        {/* Bottom CTA Section */}
        <Paper
          shadow="sm"
          p="xl"
          mt="xl"
          radius="lg"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Grid align="center">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} c="white" mb="xs">
                Need Immediate Assistance?
              </Title>
              <Text c="white" opacity={0.9}>
                Our customer service team is available 24/7 to help you with
                urgent banking matters.
              </Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group justify={{ base: "center", md: "flex-end" }}>
                <Button
                  size="lg"
                  variant="white"
                  color="dark"
                  radius="md"
                  leftSection={<IconPhone size="1.2rem" />}
                >
                  Call Now: +260 972 100 325
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default ContactUs;
