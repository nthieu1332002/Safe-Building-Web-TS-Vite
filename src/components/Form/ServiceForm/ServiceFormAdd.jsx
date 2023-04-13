import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import { createService } from "../../../store/service/serviceSlice";
import TextArea from "antd/es/input/TextArea";
import { serviceStatus } from "../../../ultis/types";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const ServiceFormAdd = ({
  loading,
  dispatch,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const options = serviceStatus.map((item) => {
    return { value: item.status, label: item.status };
  });
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  function isFileImage(file) {
    return file["type"].split("/")[0] === "image";
  }
  return (
    <Modal
      title="CREATE SERVICE"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              icon: fieldsValue.icon[0].originFileObj,
              requestObject: JSON.stringify({
                name: fieldsValue.name,
                description: fieldsValue.description,
                price: fieldsValue.price,
                status: fieldsValue.status,
              }),
            };
            dispatch(createService(values)).then((res) => {
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
        name="create-service-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="name"
          label="Service Name"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Service name is required.",
            },
          ]}
        >
          <Input placeholder="Service name" className="custom-input" />
        </Form.Item>

        <Space size="large">
          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                type: "number",
                message: "Price is not valid.",
              },
            ]}
          >
            <InputNumber
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              min={1}
              placeholder="Price"
              className="custom-input"
              addonAfter="VND"
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
          name="description"
          label="Description"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Description is required.",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Description" />
        </Form.Item>
        <Form.Item
          name="icon"
          label="Icon"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Icon is required." }]}
        >
          <Upload
            name="icon"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isAllowedType = isFileImage(file);
              if (!isAllowedType) {
                setFileList([...fileList]);
                toast.error("Files must be image!");
                return false;
              }
              setFileList([...fileList, file]);
              return false;
            }}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ServiceFormAdd;
