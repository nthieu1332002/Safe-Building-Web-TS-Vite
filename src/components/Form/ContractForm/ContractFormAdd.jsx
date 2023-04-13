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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postContract } from "../../../store/contract/contractSlice";
import { UploadOutlined } from "@ant-design/icons";

import { getFlatByBuilding } from "../../../store/building/buildingSlice";
const ResidentFormAddContract = ({
  isModalOpen,
  handleCancel,
  setIsModalAddContractOpen,
  handleSubmit,
  customer,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const { buildingList, flatList } = useSelector((state) => state.building);
  const { loading } = useSelector((state) => state.contract);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [currentFlat, setCurrentFlat] = useState(null);
  const [currentValue, setCurrentValue] = useState(null);

  useEffect(() => {
    if (buildingList.length > 0) {
      setCurrentBuilding(buildingList[0].id);
    }
  }, [buildingList]);

  useEffect(() => {
    if (flatList.length > 0) {
      setCurrentFlat(flatList[0].id);
      setCurrentValue(flatList[0].value);
    }
  }, [flatList]);

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
    return { value: item.id, label: item.roomNumber};
  });
  const token = customer.devices?.map((item) => {
    return [item.token];
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
  const handleChange = (value) => {
    setCurrentFlat(value)
    setCurrentValue(flatList.find((item) => item.id === value).value)
  };
  return (
    <Modal
      title="CREATE CONTRACT"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              files: fieldsValue.files[0].originFileObj,
              requestContract: JSON.stringify({
                customerId: customer.id,
                flatId: fieldsValue.flatId,
                value: fieldsValue.value,
                title: fieldsValue.title,
                startDate: fieldsValue["startDate"].format("YYYY-MM-DD"),
                expiryDate: fieldsValue["expiryDate"].format("YYYY-MM-DD"),
              }),
              deviceTokens: JSON.stringify(token),
            };
            dispatch(postContract(values)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalAddContractOpen(false);
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
            name: ["buildingId"],
            value: currentBuilding,
          },
          {
            name: ["flatId"],
            value: currentFlat,
          },
          {
            name: ["value"],
            value: currentValue,
          },
        ]}
        name="create-contract-form"
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
              onChange={handleChange}
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
          rules={[{ required: true, message: "File is required." }]}
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

export default ResidentFormAddContract;
