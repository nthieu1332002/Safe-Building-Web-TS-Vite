import React from "react";
import { DatePicker, Form, Input, Modal, Radio, Select, Space } from "antd";
import dayjs from "dayjs";
import { customerStatus } from "../../../ultis/types";
import { updateResident } from "../../../store/resident/residentSlice";
import { ResidentDetail } from "../../../types/resident.type";

interface ResidentFormEditProps {
  loading: boolean;
  isModalOpen: boolean;
  handleCancel: () => void;
  item: ResidentDetail | null,
  dispatch: any,
  setIsModalEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

const ResidentFormEdit = ({
  loading,
  isModalOpen,
  handleCancel,
  item,
  dispatch,
  setIsModalEditOpen,
  handleSubmit
}: ResidentFormEditProps) => {
  const [form] = Form.useForm();
  const options = customerStatus.map((item) => {
    return { value: item.status, label: item.status };
  });
  return (
    <Modal
      title="EDIT RESIDENT ACCOUNT"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Save"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              ...fieldsValue,
              id: item?.id,
              email: fieldsValue["email"] || "",
              citizenId: "ctid",
              dateOfBirth: fieldsValue["dateOfBirth"].format("YYYY-MM-DD"),
            };

            dispatch(updateResident(values)).then((res: { payload: { status: number; }; }) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalEditOpen(false);
                handleSubmit()
              }
            });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        fields={[
          {
            name: ["fullname"],
            value: item?.fullname,
          },
          {
            name: ["email"],
            value: item?.email,
          },
          {
            name: ["phone"],
            value: item?.phone,
          },
          {
            name: ["status"],
            value: item?.status,
          },
          {
            name: ["gender"],
            value: item?.gender,
          },
          {
            name: ["dateOfBirth"],
            value: dayjs(item?.dateOfBirth, "YYYY/MM/DD"),
          },
          {
            name: ["address"],
            value: item?.address,
          },
        ]}
        name="edit-customer-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="fullname"
          label="Full Name"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Full name is required.",
            },
          ]}
        >
          <Input
            value={item?.fullname}
            placeholder="Full name"
            className="custom-input"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: "email",
              message: "Email is not valid.",
            },
          ]}
        >
          <Input placeholder="Email (Optional)" className="custom-input" />
        </Form.Item>
        <Space size="large">
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: "Phone is not valid.",
              },
              {
                pattern: /^\d+$/,
                message: "Phone is not valid.",
              },
            ]}
          >
            <Input placeholder="Phone" className="custom-input" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select
              options={options}
              style={{
                width: 120,
              }}
            />
          </Form.Item>
        </Space>
        <Space size="large">
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Gender is required.",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="MALE">Male</Radio>
              <Radio value="FEMALE">Female</Radio>
              <Radio value="OTHER">Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of birth"
            rules={[
              {
                required: true,
                message: "DOB is required.",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Space>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Address is required.",
            },
          ]}
        >
          <Input placeholder="Address" className="custom-input" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResidentFormEdit;
