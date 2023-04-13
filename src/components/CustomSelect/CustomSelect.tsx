import { Select } from "antd";
import React from "react";

interface Option {
  label: string; // React.ReactNode
  value: string;
}

interface CustomSelectProps {
  title: string;
  options: Option[];
  suffixIcon?: React.ReactNode;
  onChange?: (value: string) => void;
}

const CustomSelect = ({
  title,
  options,
  suffixIcon,
  onChange,
}: CustomSelectProps) => {
  return (
    <>
      <Select
        suffixIcon={suffixIcon}
        defaultValue={title}
        style={{
          width: 120,
        }}
        onChange={onChange}
        options={options}
      />
    </>
  );
};

export default CustomSelect;
