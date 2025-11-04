import { Container, Title, Text, SimpleGrid, Card, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import classes from './ChooseAccountType.module.css';

export function ChooseAccountType() {
  const accountTypes = [
    { name: 'Personal Account', description: 'For individual banking and daily financial needs.' },
    { name: 'Business Account', description: 'Manage your company’s transactions and payroll efficiently.' },
    { name: 'Savings Account', description: 'Save and grow your money with our secure savings options.' },
    { name: 'Student Account', description: 'Perfect for students—simple, flexible, and low-cost banking.' },
    { name: 'School Account', description: 'Ideal for institutions to manage school finances securely.' },
    { name: 'Investment Account', description: 'Grow your wealth through smart investment management.' },
  ];

  return (
    <div className={classes.background}>
      <Container size={600} my={40}>
        <Title ta="center" className={classes.title}>
          Choose Account Type
        </Title>
        <Text ta="center" size="sm" c="dimmed" mb={30}>
          Select the type of account you’d like to create with <strong>Forever Trust Bank</strong>.
        </Text>

        <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
          {accountTypes.map((account) => (
            <Card key={account.name} shadow="md" radius="md" p="lg" className={classes.card}>
              <Title order={4}>{account.name}</Title>
              <Text size="sm" mt="xs" c="dimmed">
                {account.description}
              </Text>
              <Button
                fullWidth
                mt="md"
                radius="md"
                className={classes.button}
                component={Link}
                to={`/register?type=${encodeURIComponent(account.name)}`}
              >
                Select
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </div>
  );
}
