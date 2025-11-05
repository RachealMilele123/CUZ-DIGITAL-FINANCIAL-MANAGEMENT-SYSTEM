import { Select, TextInput, Button } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { NumberInput } from "@mantine/core";

const StudentForm = ({ form }) => (
  <div>
    <TextInput
      label="School Name"
      placeholder="Cavendish University"
      size="md"
      {...form.getInputProps("schoolName")}
    />

    <TextInput
      label="School Bank Account Number"
      size="md"
      placeholder="123244353754548"
      {...form.getInputProps("schoolBankAccount")}
    />

    <TextInput
      label="Student Number"
      size="md"
      placeholder="104789"
      required
      {...form.getInputProps("studentNumber")}
    />

    <TextInput
      label="Course of study"
      placeholder="Computer Science"
      size="md"
      {...form.getInputProps("courseOfStudy")}
    />

    <NumberInput
      label="Year Of Study"
      description=" (1 to 7)"
      placeholder="Enter your year"
      min={1}
      max={7}
      step={1}
      clampBehavior="strict"
      size="md"
      {...form.getInputProps("yearOfStudy")}
    />

    <NumberInput
      label="Expected year of completion"
      description=""
      placeholder="2026"
      size="md"
      {...form.getInputProps("expectedCompletion")}
    />
  </div>
);

const PersonalForm = ({ form }) => (
  <div>
    <TextInput
      label="Full Name"
      placeholder="Enter your name"
      size="md"
      {...form.getInputProps("personalFullName")}
    />
    <TextInput
      label="National ID"
      placeholder="Enter your ID number"
      size="md"
      {...form.getInputProps("nationalId")}
    />
  </div>
);

const BusinessForm = ({ form }) => (
  <div>
    <TextInput
      label="Business Name"
      placeholder="Enter your business name"
      size="md"
      {...form.getInputProps("businessName")}
    />
    <TextInput
      label="Registration No."
      placeholder="Enter registration number"
      size="md"
      {...form.getInputProps("registrationNumber")}
    />
  </div>
);

const SavingsForm = ({ form }) => (
  <div>
    <TextInput
      label="Account Holder Name"
      placeholder="Enter name"
      size="md"
      {...form.getInputProps("accountHolderName")}
    />
    <TextInput
      label="Initial Deposit"
      placeholder="Enter amount"
      size="md"
      {...form.getInputProps("initialDeposit")}
    />
  </div>
);

const accountType = [
  { value: "student", label: "Student" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "savings", label: "Savings" },
];

const AccountType = ({ form }) => {
  const [selectedAccountType, setSelectedAccountType] = useState("");

  // Update local state when form value changes
  useEffect(() => {
    const currentValue = form.getValues().accountType;
    setSelectedAccountType(currentValue || "");
  }, [form.getValues().accountType]);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <Select
        label="Select Account Type"
        placeholder="Pick account type"
        size="md"
        data={accountType}
        {...form.getInputProps("accountType")}
        onChange={(value) => {
          form.setFieldValue("accountType", value);
          setSelectedAccountType(value || "");
        }}
      />

      {/* Conditional rendering based on selected account */}
      {selectedAccountType === "student" && <StudentForm form={form} />}
      {selectedAccountType === "personal" && <PersonalForm form={form} />}
      {selectedAccountType === "business" && <BusinessForm form={form} />}
      {selectedAccountType === "savings" && <SavingsForm form={form} />}
    </div>
  );
};

export default AccountType;
