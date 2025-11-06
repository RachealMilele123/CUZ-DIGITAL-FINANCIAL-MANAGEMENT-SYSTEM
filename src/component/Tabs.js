import { Container, Tabs } from "@mantine/core";
import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import ReusableTable from "./ReusableTable";


function TabBars() {
  return (
    <Container size="lg">
      <Tabs defaultValue="all_transactions" variant="outline" radius="md" mt="md">
        <Tabs.List>
          <Tabs.Tab value="gallery" leftSection={<IconPhoto size={12} />}>
            All Transactions
          </Tabs.Tab>
          <Tabs.Tab
            value="messages"
            leftSection={<IconMessageCircle size={12} />}
          >
            Incoming Transactions
          </Tabs.Tab>
          <Tabs.Tab value="settings" leftSection={<IconSettings size={12} />}>
            Outgoing Transactions
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery"> <ReusableTable /> </Tabs.Panel>

        <Tabs.Panel value="messages"> <ReusableTable /> </Tabs.Panel>

        <Tabs.Panel value="settings"> <ReusableTable /> </Tabs.Panel>
      </Tabs>
    </Container>
  );
}

export default TabBars;
