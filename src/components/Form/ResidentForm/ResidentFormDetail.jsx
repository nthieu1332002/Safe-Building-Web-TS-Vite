import {
  Drawer,
  Descriptions,
  Divider,
  Tag,
  Button,
  Empty,
  List,
  Typography,
  Popconfirm,
} from "antd";
import React, { useState } from "react";
import { customerStatus, rentContractStatus } from "../../../ultis/types";
import { FilePdfTwoTone } from "@ant-design/icons";
import { AiOutlineDelete } from "react-icons/ai";
import ContractFormAdd from "../ContractForm/ContractFormAdd";
import { getAllBuilding } from "../../../store/building/buildingSlice";
import { deleteContractById } from "../../../store/contract/contractSlice";

const { Text } = Typography;
const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT;

const ResidentFormDetail = ({
  dispatch,
  onClose,
  open,
  customer,
  onDelete,
}) => {
  const [isModalAddContractOpen, setIsModalAddContractOpen] = useState(false);

  const handleDeleteContract = (id) => {
    dispatch(deleteContractById({ id: id })).then(() => {
      onDelete();
    });
  };
  return (
    <>
      <Drawer
        title={customer.fullname}
        closable={false}
        onClose={onClose}
        open={open}
        width="500px"
      >
        <Descriptions
          title="Personal"
          labelStyle={{ fontWeight: "bold" }}
          colon={false}
          layout="vertical"
        >
          <Descriptions.Item label="Email" span={2}>
            {customer.email}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" span={2}>
            {customer.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Gender" span={1}>
            {customer.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Date of birth" span={1}>
            {customer.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Status" span={1}>
            {customerStatus.map((item) => {
              return (
                <>
                  {item.status === customer.status ? (
                    <Tag className="tag" color={item.color}>
                      {customer.status}
                    </Tag>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {customer.address}
          </Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions
          title="Contract"
          labelStyle={{ fontWeight: "bold" }}
          colon={false}
          layout="horizontal"
          extra={
            <Button
              type="primary"
              onClick={() => {
                dispatch(
                  getAllBuilding({
                    page: 1,
                    size: 100,
                    searchKey: "",
                    sortBy: "name",
                    order: "asc",
                  })
                );
                setIsModalAddContractOpen(true);
                onClose();
              }}
            >
              Add
            </Button>
          }
        />
        {customer.contract !== "" ? (
          <List
            size="small"
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={customer.contract}
            renderItem={(contract) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="Delete contract"
                    description="Are you sure to delete this contract?"
                    onConfirm={() => handleDeleteContract(contract.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      disabled={contract.status === "DELETED"}
                      danger
                      type="text"
                    >
                      <AiOutlineDelete />
                    </Button>
                    ,
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <a
                      target="_blank"
                      href={`${firebaseEndpoint}${contract.link}`}
                    >
                      <Text ellipsis={{ tooltip: `${contract.title}` }}>
                        <FilePdfTwoTone /> {contract.title}
                      </Text>
                    </a>
                  }
                  description={
                    <>
                      Room {contract.roomNumber} - {contract.buildingName}
                    </>
                  }
                />
                {rentContractStatus.map((item) => {
                  return (
                    <>
                      {item.status === contract.status ? (
                        <Tag className="tag" color={item.color}>
                          {contract.status}
                        </Tag>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </List.Item>
            )}
          />
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Drawer>
      <ContractFormAdd
        dispatch={dispatch}
        handleCancel={() => setIsModalAddContractOpen(false)}
        isModalOpen={isModalAddContractOpen}
        setIsModalAddContractOpen={setIsModalAddContractOpen}
        customer={customer}
      />
      {/* <ContractFormEdit
        dispatch={dispatch}
        handleCancel={() => setIsModalEditContractOpen(false)}
        isModalOpen={isModalEditContractOpen}
        setIsModalEditContractOpen={setIsModalEditContractOpen}
        contract={contractDetail}
      /> */}
    </>
  );
};

export default ResidentFormDetail;
