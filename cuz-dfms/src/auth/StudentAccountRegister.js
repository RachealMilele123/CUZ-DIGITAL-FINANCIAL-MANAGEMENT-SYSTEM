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
} from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './StudentAccountRegister.module.css';

export function StudentAccountRegister() {
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
            required
            radius="md"
          />

          <TextInput
            label="Email"
            placeholder="you@student.edu"
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Phone Number"
            placeholder="+260..."
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Student ID / Registration Number"
            placeholder="CUZ12345"
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="School / University"
            placeholder="Cavendish University Zambia"
            required
            mt="md"
            radius="md"
          />

          <TextInput
            label="Program of Study"
            placeholder="Bachelor of Science in Computing"
            required
            mt="md"
            radius="md"
          />

          <Select
            label="Year of Study"
            placeholder="Select your year"
            data={['Year 1', 'Year 2', 'Year 3', 'Year 4']}
            required
            mt="md"
            radius="md"
          />

          <PasswordInput
            label="Create Password"
            placeholder="Enter a strong password"
            required
            mt="md"
            radius="md"
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter password"
            required
            mt="md"
            radius="md"
          />

          <Group justify="space-between" mt="xl">
            <Anchor component={Link} to="/login" size="sm" c="dimmed">
              Back to Login
            </Anchor>
            <Button radius="md" className={classes.button}>
              Create Account
            </Button>
          </Group>
        </Paper>
      </Container>
    </div>
  );
}
