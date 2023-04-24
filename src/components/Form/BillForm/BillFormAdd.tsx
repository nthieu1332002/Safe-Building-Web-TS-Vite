import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getFlatByBuilding } from "../../../store/building/buildingSlice";
import { createBill } from "../../../store/bill/billSlice";
import { RootState } from "../../../store/store";

interface BillFormAddProps {
  dispatch: any;
  loading: boolean;
  isModalOpen: boolean;
  handleCancel: () => void;
  setIsModalAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

const BillFormAdd = ({
  dispatch,
  loading,
  isModalOpen,
  handleCancel,
  setIsModalAddOpen,
  handleSubmit,
}: BillFormAddProps) => {
  const [form] = Form.useForm();

  const { buildingList, flatList } = useSelector((state: RootState) => state.building);
  const { services } = useSelector((state: RootState) => state.service);
  const [currentBuilding, setCurrentBuilding] = useState<string>('');
  const [currentFlat, setCurrentFlat] = useState<string>('');

  useEffect(() => {
    if (buildingList.length > 0) {
      setCurrentBuilding(buildingList[0].id);
    }
  }, [buildingList]);

  useEffect(() => {
    if (flatList.length > 0) {
      setCurrentFlat(flatList[0].id);
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

  const onChange = (value: string) => {
    setCurrentBuilding(value);
  };
  const handleChange = (value: string) => {
    setCurrentFlat(value);
  };

  const buildingListOptions = buildingList.map((item) => {
    return { value: item.id, label: item.name };
  });

  const flatListOptions = flatList.map((item) => {
    return { value: item.id, label: item.roomNumber };
  });
  const serviceListOptions = services.map((item) => {
    return { value: item.id, label: item.name };
  });
  return (
    <Modal
      title="CREATE BILL"
      open={isModalOpen}
      onCancel={handleCancel}
      okText="Create"
      confirmLoading={loading}
      onOk={() => {
        form
          .validateFields()
          .then((fieldsValue) => {
            delete fieldsValue.buildingId;
            dispatch(createBill(fieldsValue)).then((res: { payload: { status: number; }; }) => {
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
            name: ["buildingId"],
            value: currentBuilding,
          },
          {
            name: ["flatId"],
            value: currentFlat,
          },
        ]}
        name="create-bill-form"
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
          <Form.Item
            name="flatId"
            label="Room"
            rules={[
              {
                required: true,
                message: "Room is not valid.",
              },
            ]}
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
        <Form.List name="service">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} size="large" align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Service"
                        name={[field.name, "id"]}
                        rules={[
                          {
                            required: true,
                            message: "Service is required",
                          },
                        ]}
                      >
                        <Select
                          options={serviceListOptions}
                          style={{
                            width: 180,
                          }}
                        />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Quantity"
                    name={[field.name, "quantity"]}
                    rules={[
                      {
                        required: true,
                        message: "Quantity is required",
                      },
                    ]}
                  >
                    <InputNumber<number>
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => Number(value?.replace(/\$\s?|(,*)/g, ""))}
                      min={1}
                      placeholder="Quantity"
                      className="custom-input"
                      style={{
                        width: 180,
                      }}
                    />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add services
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default BillFormAdd;
