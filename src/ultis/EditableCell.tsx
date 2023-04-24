import React from "react"
import { Form, Input, Select } from "antd";
import { adminStatus, customerStatus, flatStatus } from "./types";
import { Admin } from "../types/admin.type";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string,
  title: any,
  inputType: string;
  tableName: string,
  record: Admin;
  index: number;
  children: React.ReactNode,
}


export const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  tableName,
  record,
  index,
  children,
  ...restProps
}: EditableCellProps) => {
  let statusType;
  switch (tableName) {
    case "admin":
      statusType = adminStatus;
      break;
    case "customer":
      statusType = customerStatus;
      break;
    case "flat":
      statusType = flatStatus;
      break;
    default:
      statusType = adminStatus;
  }
  const options = statusType.map((item) => {
    return { value: item.status, label: item.status };
  });
  const inputNode =
    inputType === "status" ? (
      <Select defaultValue={record.status} options={options}/>
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
