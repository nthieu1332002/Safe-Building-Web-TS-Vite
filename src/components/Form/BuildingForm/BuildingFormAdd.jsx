import { Form, Input, InputNumber, Modal, Select, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { createBuilding } from "../../../store/building/buildingSlice";
import { buildingStatus } from "../../../ultis/types";

const BuildingFormAdd = ({
  loading,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const options = buildingStatus.map((item) => {
    return { value: item.status, label: item.status };
  });
  return (
    <Modal
      title="CREATE A NEW BUILDING"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            dispatch(createBuilding(values)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalAddOpen(false);
                handleSubmit();
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
            name: ["status"],
            value: options[0]?.value,
          },
        ]}
        name="create-building-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="name"
          label="Building name"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Building name is required.",
            },
          ]}
        >
          <Input placeholder="Building name" className="custom-input" />
        </Form.Item>
        <Space size="large">
          <Form.Item
            name="capacity"
            label="Capacity"
            rules={[
              {
                type: "number",
                required: true,
                message: "Capacity is required.",
              },
            ]}
          >
            <InputNumber
              min={1}
              placeholder="Capacity"
              className="custom-input"
              style={{
                width: 180,
              }}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Status is not valid.",
              },
            ]}
          >
            <Select
              options={options}
              style={{
                width: 120,
              }}
            />
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

export default BuildingFormAdd;
