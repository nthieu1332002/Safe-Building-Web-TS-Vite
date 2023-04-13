import React from "react";
import "./style.scss";

interface CustomCardProps {
  height: string;
  width: string;
  children: React.ReactNode;
}
const CustomCard = ({ height, width, children }: CustomCardProps) => {
  return (
    <div className="custom-card" style={{ width: width, height: height }}>
      {children}
    </div>
  );
};

export default CustomCard;
