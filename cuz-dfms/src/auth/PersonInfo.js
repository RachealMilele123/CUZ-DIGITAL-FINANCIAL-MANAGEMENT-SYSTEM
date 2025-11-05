import { Button, Checkbox, Group, TextInput, NumberInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import "@mantine/dates/styles.css";
import { Radio } from "@mantine/core";

const PersonInfo = ({ form }) => {
  const [value, setValue] = useState(null); 

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput label="Full Name" placeholder="Samson Kwizela" required/>

        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
          required
        />

        <NumberInput label="Phone" placeholder="+260" />

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
        />

        <TextInput label="Address" placeholder="Lusaka" required/>

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

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          key={form.key("termsOfService")}
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />
        

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>

      </form>
    </div>
  );
};

export default PersonInfo;
