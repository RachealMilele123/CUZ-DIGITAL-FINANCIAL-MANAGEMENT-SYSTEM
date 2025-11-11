import React from "react";
import { Input } from "@mantine/core";
import { TextInput } from '@mantine/core';
import { Textarea } from '@mantine/core';

const Beneficiary = () => {
  return (
    <div>
      <Input.Wrapper
        label="Input label"
        description="Input description"
        error="Input error"
      >
        <Input placeholder="Input inside Input.Wrapper" />
      </Input.Wrapper>
      <TextInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
      />
          <Textarea
      label="Input label"
      description="Input description"
      placeholder="Input placeholder"
    />
    </div>
    
  );
};

export default Beneficiary;
