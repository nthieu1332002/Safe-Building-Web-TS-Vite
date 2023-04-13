import React from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  sendMultiNotification,
  sendNotification,
} from "../../../store/notification/notificationSlice";

const NotiFormAdd = ({
  dispatch,
  isModalOpen,
  setIsModalOpen,
  handleCancel,
  token,
  fullname,
  customerId,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={`PUSH NOTIFICATION To ${
        customerId?.length === 0
          ? `${fullname}`
          : `${customerId.length} DEVICES`
      }`}
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              ...fieldsValue,
              token: token,
              data: {
                additionalProp1: "",
                additionalProp2: "",
                additionalProp3: "",
              },
            };
            const values2 = {
              ...fieldsValue,
              data: {
                additionalProp1: "",
                additionalProp2: "",
                additionalProp3: "",
              },
              customerIdList: customerId,
            };
            if (customerId.length !== 0) {
              dispatch(sendMultiNotification(values2)).then((res) => {
                if (res.payload.status === 200) {
                  form.resetFields();
                  setIsModalOpen(false);
                }
              });
            } else {
              dispatch(sendNotification(values)).then((res) => {
                if (res.payload.status === 200) {
                  form.resetFields();
                  setIsModalOpen(false);
                }
              });
            }
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        name="create-noti-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Title is required.",
            },
          ]}
        >
          <Input placeholder="Title" className="custom-input" />
        </Form.Item>
        <Form.Item
          name="body"
          label="Content"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Content is required.",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Content" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NotiFormAdd;
