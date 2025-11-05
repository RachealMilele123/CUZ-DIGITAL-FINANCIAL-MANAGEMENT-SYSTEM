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
  return (
    <Container size={600}>
      <TextInput
        label="Full Name"
        placeholder="Samson Kwizela"
        required
        size="md"
        {...form.getInputProps("fullName")}
      />

      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        size="md"
        {...form.getInputProps("email")}
      />

      <TextInput
        label="Phone"
        placeholder="+260"
        size="md"
        required
        {...form.getInputProps("phone")}
      />

      <DatePickerInput
        label="Date of Birth"
        placeholder="Select your D.O.B"
        leftSection={<IconCalendar size={18} />}
        valueFormat="DD/MM/YYYY"
        required
        withAsterisk
        maxDate={new Date()}
        size="md"
        {...form.getInputProps("dateOfBirth")}
      />

      <TextInput
        label="Address"
        placeholder="Lusaka"
        required
        size="md"
        {...form.getInputProps("address")}
      />

      <Radio.Group
        label="Gender"
        description="Select your gender"
        withAsterisk
        {...form.getInputProps("gender")}
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
