import { DatePicker, Form, Input, Modal, Radio, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { createResident } from "../../../store/resident/residentSlice";

const ResidentFormAdd = ({
  loading,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  return (
    <Modal
      title="CREATE RESIDENT ACCOUNT"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              ...fieldsValue,
              dateOfBirth: fieldsValue["dateOfBirth"].format("YYYY-MM-DD"),
              email: fieldsValue["email"] || "",
              citizenId: "ctid",
            };
            dispatch(createResident(values)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalAddOpen(false);
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
        name="create-customer-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="fullName"
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
          <Input placeholder="Full name" className="custom-input" />
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
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                type: "string",
                whitespace: true,
                required: true,
                message: "Password is required.",
              },
            ]}
          >
            <Input
              placeholder="Password"
              type="password"
              className="custom-input"
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

export default ResidentFormAdd;
