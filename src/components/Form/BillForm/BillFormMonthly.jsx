import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Select, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createMonthlyBill, getFileExcel } from "../../../store/bill/billSlice";
import { useSelector } from "react-redux";

const BillFormMonthly = ({
  dispatch,
  loading,
  isModalOpen,
  setIsModalOpen,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const { buildingList } = useSelector((state) => state.building);
  const [currentBuilding, setCurrentBuilding] = useState(null);
  useEffect(() => {
    if (buildingList.length > 0) {
      setCurrentBuilding(buildingList[0].id);
    }
  }, [buildingList]);

  const buildingListOptions = buildingList.map((item) => {
    return { value: item.id, label: item.name };
  });
  const onChange = (value) => {
    setCurrentBuilding(value);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const getExcelFile = () => {
    dispatch(getFileExcel({ buildingId: currentBuilding }));
  };
  return (
    <Modal
      title="MONTHLY BILL"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            const values = {
              uploadFile: fieldsValue.files[0].originFileObj,
            };
            dispatch(createMonthlyBill(values)).then((res) => {
              if (res.payload.status === 201) {
                form.resetFields();
                setIsModalOpen(false);
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
        name="create-monthly-bill-form"
        fields={[
          {
            name: ["buildingId"],
            value: currentBuilding,
          },
        ]}
        layout="vertical"
        autoComplete="off"
        style={{
          width: "100%",
        }}
      >
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
          <Button type="link" onClick={getExcelFile} target="_blank" download>
            Get excel file here
          </Button>
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

export default BillFormMonthly;
