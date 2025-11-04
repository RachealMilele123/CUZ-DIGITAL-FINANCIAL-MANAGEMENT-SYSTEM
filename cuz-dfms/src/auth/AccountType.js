import { Select } from "@mantine/core";
import React from "react";

const accountType = [
  {
    value: "student",
    label: "Student",
  },
  {
    value: "teacher",
    label: "Teacher",
  },
  {
    value: "parent",
    label: "Parent",
  },
  {
    value: "guardian",
    label: "Guardian",
  },
];

const AccountType = () => {
  const [value, setValue] = React.useState(null);

  const handleChange = (value) => {
    console.log("Selected account type:", value);
  };
  return (
    <div>
      <Select
        label="Your favorite library"
        placeholder="Pick value"
        data={accountType.map((type) => ({
          value: type.value,
          label: type.label,
        }))}
      />
    </div>
  );
};

export default AccountType;
