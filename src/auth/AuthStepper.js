import { useState } from "react";
import { Stepper, Button, Group, Container } from "@mantine/core";
import PersonInfo from "./PersonInfo";
import AccountType from "./AccountType";
import CreatePassword from "./CreatePassword";
import Preview from "./Preview";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  registrationInitialValues,
  registrationValidationSchema,
} from "../schemaValidation/registration";

function AuthStepper() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: registrationInitialValues,
    validate: registrationValidationSchema,
  });

  // Validation function for each step
  const validateCurrentStep = () => {
    const values = form.getValues();

    switch (active) {
      case 0: // Personal Information step
        const personalFields = [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
          "nationalId",
          "tpinNumber",
        ];
        return personalFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return value && !error;
        });

      case 1: // Account Type step
        if (!values.accountType || form.validateField("accountType").error) {
          return false;
        }

        // Check conditional fields based on account type
        let accountTypeFields = [];
        switch (values.accountType) {
          case "student":
            accountTypeFields = [
              "schoolName",
              "studentNumber",
              "courseOfStudy",
              "yearOfStudy",
              "expectedCompletion",
            ];
            break;
          case "personal":
            accountTypeFields = ["personalFullName"];
            break;
          case "business":
            accountTypeFields = ["businessName", "registrationNumber"];
            break;
          case "savings":
            accountTypeFields = ["accountHolderName", "initialDeposit"];
            break;
        }

        return accountTypeFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return value && !error;
        });

      case 2: // Password step
        const passwordFields = [
          "password",
          "confirmPassword",
          "termsOfService",
        ];
        return passwordFields.every((field) => {
          const value = values[field];
          const error = form.validateField(field).error;
          return field === "termsOfService" ? value === true : value && !error;
        });

      default:
        return true;
    }
  };

  const nextStep = () => {
    // Always trigger validation to show errors for current step
    const stepValid = validateCurrentStep();

    if (stepValid) {
      // If validation passes, proceed to next step
      setActive((current) => (current < 3 ? current + 1 : current));
    } else {
      // Show validation errors for the current step fields
      const currentStepFields = getCurrentStepFields();
      currentStepFields.forEach((field) => {
        form.validateField(field);
      });
    }
  };

  // Helper function to get current step fields
  const getCurrentStepFields = () => {
    const values = form.getValues();

    switch (active) {
      case 0:
        return [
          "fullName",
          "email",
          "phone",
          "dateOfBirth",
          "address",
          "gender",
          "nationalId",
          "tpinNumber",
        ];
      case 1:
        let accountFields = ["accountType"];

        // Add conditional fields based on selected account type
        switch (values.accountType) {
          case "student":
            accountFields.push(
              "schoolName",
              "studentNumber",
              "courseOfStudy",
              "yearOfStudy",
              "expectedCompletion"
            );
            break;
          case "personal":
            accountFields.push("personalFullName", "nationalId");
            break;
          case "business":
            accountFields.push("businessName", "registrationNumber");
            break;
          case "savings":
            accountFields.push("accountHolderName", "initialDeposit");
            break;
        }

        return accountFields;
      case 2:
        return ["password", "confirmPassword", "termsOfService"];
      default:
        return [];
    }
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const handleRegistration = async () => {
    const values = form.getValues();

    // Validate that required fields are present
    if (!values.fullName || values.fullName.trim() === "") {
      toast.error("Please fill in your full name before submitting");
      return;
    }

    // Prepare the payload
    const payload = {
      type: values.accountType,
      name: values.fullName,
      email: values.email,
      phone: values.phone,
      dob: values.dateOfBirth,
      address: values.address,
      gender: values.gender,
      password: values.password,
      confirmPassword: values.confirmPassword,
      termsOfService: Boolean(values.termsOfService), // Ensure boolean
      tpinNumber: values.tpinNumber,
      nationalId: values.nationalId,

      // Student Account Fields
      schoolName: values.schoolName,
      studentId: values.studentNumber,
      course: values.courseOfStudy,
      yearOfStudy: parseInt(values.yearOfStudy) || null, // Ensure number
      expectedCompletion: parseInt(values.expectedCompletion) || null, // Ensure number

      // Personal Account Fields
      personalFullName: values.personalFullName,

      // Business Account Fields
      businessName: values.businessName,
      registrationNumber: values.registrationNumber,

      // Savings Account Fields
      accountHolderName: values.accountHolderName,
      initialDeposit: values.initialDeposit,
    };

    // Submit registration using auth service
    const result = await registerUser(payload);

    if (result.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      // Clear form values
      form.reset();
      // Registration successful - you can redirect or perform additional actions here
      console.log("Registration successful:", result.data);
    } else {
      // Error handling is already done in the service with toasts
      console.error("Registration failed:", result.error);
    }
  };

  return (
    <Container >
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step
          label="Personal Info"
          description="Fill in your personal details"
        >
          <PersonInfo form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Account Type"
          description="Choose your account type"
        >
          <AccountType form={form} />
        </Stepper.Step>

        <Stepper.Step
          label="Create Password"
          description="Set up your password"
        >
          <CreatePassword form={form} />
        </Stepper.Step>

        <Stepper.Completed>
          <Preview form={form} />
        </Stepper.Completed>
      </Stepper>

      <br />

      <Group justify="space-between">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Back
        </Button>

        {active < 3 ? (
          <Button onClick={nextStep}>
            {active === 2 ? "Complete Registration" : "Next Step"}
          </Button>
        ) : (
          <Button onClick={handleRegistration}>Submit Registration</Button>
        )}
      </Group>
    </Container>
  );
}

export default AuthStepper;
