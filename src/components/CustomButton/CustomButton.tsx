import { PlusOutlined } from "@ant-design/icons";
import React, { MouseEventHandler } from "react";
import "./style.scss";

interface CustomButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({ onClick }: CustomButtonProps) => {
  return (
    <button className="custom-button" onClick={onClick}>
      <PlusOutlined />
      Add new
    </button>
  );
};

export default CustomButton;
