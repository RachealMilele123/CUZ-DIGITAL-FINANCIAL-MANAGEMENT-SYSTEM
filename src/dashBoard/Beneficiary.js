import React from "react";
import { Input } from "@mantine/core";

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
    </div>
  );
};

export default Beneficiary;
