import {
  Button,
  Checkbox,
  Group,
  TextInput,
  NumberInput,
  Container,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import { Radio } from "@mantine/core";

const PersonInfo = ({ form }) => {
  const [value, setValue] = useState(null);

  return (
    <Container size={600}>
      <TextInput
        label="Full Name"
        placeholder="Samson Kwizela"
        required
        size="md"
      />

      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
        size="md"
      />

      <NumberInput label="Phone" placeholder="+260" size="md" />

      <DatePickerInput
        label="Date of Birth"
        placeholder="Select your D.O.B"
        icon={<IconCalendar size={18} />}
        value={value}
        onChange={setValue}
        valueFormat="DD/MM/YYYY"
        required
        withAsterisk
        maxDate={new Date()}
        size="md"
      />

      <TextInput label="Address" placeholder="Lusaka" required size="md" />

      <Radio.Group
        name="gender"
        label="Gender"
        description="Select your gender"
        withAsterisk
      >
        <Group mt="xs">
          <Radio value="male" label="Male" />
          <Radio value="female" label="Female" />
          <Radio value="other" label="Prefer not to say" />
        </Group>
      </Radio.Group>
    </Container>
  );
};

export default PersonInfo;
