import React from "react";
import { Container, Input } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Textarea } from "@mantine/core";

const Beneficiary = () => {
  return (
    <div>
      <Container>
      <Input.Wrapper
        label="Account Number"
        description="STU-77565457"
        error="Input error"
      >
        <Input placeholder="Input inside Input.Wrapper" />
      </Input.Wrapper>
      <TextInput
        label="Nick Name"
        description=""
        placeholder="Cavendish FAO"
      />
      <Textarea
        label="Description"
        description="Input description"
        placeholder="He is ....."
      />
      </Container>
    </div>
  );
};

export default Beneficiary;
