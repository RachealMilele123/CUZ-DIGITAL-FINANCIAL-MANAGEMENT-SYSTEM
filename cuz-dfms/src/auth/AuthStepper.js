import { useState } from "react";
import { Stepper, Button, Group, Container } from "@mantine/core";
import PersonInfo from "./PersonInfo";
import AccountType from "./AccountType";
import CreatePassword from "./CreatePassword";
import Preview from "./Preview";
import { useForm } from "@mantine/form";

function AuthStepper() {
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container>

      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Person Info">
          <PersonInfo form={form} />
        </Stepper.Step>

        <Stepper.Step label="Account Type">
          <AccountType />
        </Stepper.Step>

        <Stepper.Step label="Create Password">
          <CreatePassword />
        </Stepper.Step>
        
        <Stepper.Completed>
          <Preview />
        </Stepper.Completed>
      </Stepper>

      <br />

      <Group justify="space-between">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>

    </Container>
  );
}

export default AuthStepper;
