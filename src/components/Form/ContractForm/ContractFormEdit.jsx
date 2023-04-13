import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Upload,
} from "antd";
import dayjs from "dayjs";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postContract } from "../../../store/contract/contractSlice";
import { UploadOutlined } from "@ant-design/icons";
import { getFlatByBuilding } from "../../../store/building/buildingSlice";
import { current } from "@reduxjs/toolkit";
import { rentContractStatus } from "../../../ultis/types";

const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT;

const ContractFormEdit = ({
  isModalOpen,
  handleCancel,
  setIsModalEditContractOpen,
  handleSubmit,
  contract,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { buildingList, flatList } = useSelector((state) => state.building);
  const { loading } = useSelector((state) => state.contract);

  const [currentBuilding, setCurrentBuilding] = useState(contract.buildingId);

  useEffect(() => {
    if (buildingList.length > 0) {
      setCurrentBuilding(buildingList[0].id);
    }
  }, [buildingList]);

  const fetchFlatList = () => {
    dispatch(getFlatByBuilding(currentBuilding));
  };
  useEffect(() => {
    if (currentBuilding) {
      fetchFlatList();
    }
  }, [currentBuilding]);
  const buildingListOptions = buildingList.map((item) => {
    return { value: item.id, label: item.name };
  });

  const flatListOptions = flatList.map((item) => {
    return { value: item.id, label: item.roomNumber };
  });

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChange = (value) => {
    setCurrentBuilding(value);
  };

  return (
    <Modal
      title="EDIT CONTRACT"
      open={isModalOpen}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Save"
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              files: fieldsValue.files[0].originFileObj || '',
              requestContract: JSON.stringify({
                contractId: contract.id,
                customerId: contract.customerId,
                flatId: fieldsValue.flatId,
                startDate: fieldsValue["startDate"].format("YYYY-MM-DD"),
                expiryDate: fieldsValue["expiryDate"].format("YYYY-MM-DD"),
                title: fieldsValue.title,
                value: fieldsValue.value,
                isChange: fieldsValue.files[0].originFileObj ? true : false,
                oldFlatId: contract.flatId,
                oldLink: contract.rentContractLink
              }),
            };
            dispatch(postContract(values)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalEditContractOpen(false);
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
            name: ["title"],
            value: contract.title,
          },
          {
            name: ["startDate"],
            value: dayjs(contract.startDate, "DD/MM/YYYY"),
          },
          {
            name: ["expiryDate"],
            value: dayjs(contract.expiryDate, "DD/MM/YYYY"),
          },
          {
            name: ["value"],
            value: contract.value,
          },
          {
            name: ["buildingId"],
            value: buildingListOptions[0]?.value,
          },
          {
            name: ["flatId"],
            value: flatListOptions[0]?.value,
          },
        ]}
        name="edit-contract-form"
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
        <Form.Item
          name="title"
          label="Contract name"
          rules={[
            {
              type: "string",
              whitespace: true,
              required: true,
              message: "Contract name is required.",
            },
          ]}
        >
          <Input placeholder="Contract name" className="custom-input" />
        </Form.Item>
        <Space size="large">
          <Form.Item
            name="buildingId"
            label="Building"
            rules={[
              {
                required: true,
                message: "Building is not valid.",
              },
            ]}
          >
            <Select
              options={buildingListOptions}
              style={{
                width: 180,
              }}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item
            name="flatId"
            label="Room"
            rules={[
              {
                required: true,
                message: "Room is not valid.",
              },
            ]}
            disabled={flatListOptions.length === 0}
          >
            <Select
              disabled={flatListOptions.length === 0}
              options={flatListOptions}
              style={{
                width: 180,
              }}
            />
          </Form.Item>
        </Space>
        <Form.Item
          name="value"
          label="Value"
          rules={[
            {
              required: true,
              type: "number",
              message: "Value is not valid.",
            },
          ]}
        >
          <InputNumber
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            min={1}
            placeholder="Value"
            className="custom-input"
            addonAfter="VND"
          />
        </Form.Item>
        <Space size="large">
          <Form.Item
            name="startDate"
            label="Start date"
            rules={[
              {
                required: true,
                message: "Start date is required.",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Expiry date"
            rules={[
              {
                required: true,
                message: "Expiry date is required.",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Space>
        <Form.Item
          name="files"
          label="File"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="files"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              setFileList([...fileList, file]);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContractFormEdit;
