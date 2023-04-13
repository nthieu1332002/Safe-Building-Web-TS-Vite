import { Table, Tag, Form, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import moment from "moment";
import { FilePdfTwoTone } from "@ant-design/icons";
import { AiFillFilter } from "react-icons/ai";

import "./style.scss";

import {
  deleteContractById,
  getContract,
} from "../../store/contract/contractSlice";

import CustomSearch from "../../components/CustomSearch/CustomSearch";

import { rentContractStatus, sortOption } from "../../ultis/types";
import CustomAction from "../../components/CustomAction/CustomAction";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
const { Text } = Typography;

const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT;
const Contract = () => {
  const dispatch = useDispatch();
  const {
    contracts,
    page,
    size,
    totalPage,
    loading,
    searchKey,
    sortBy,
    order,
  } = useSelector((state) => state.contract);
  const [currentPage, setCurrentPage] = useState(page);
  const [ellipsis, setEllipsis] = useState(true);

  const [searchString, setSearchString] = useState(searchKey);
  const [sortByString, setSortByString] = useState(sortBy);
  const [sortByOrder, setSortByOrder] = useState(order);

  const getContractList = () => {
    dispatch(
      getContract({
        page: currentPage,
        size,
        searchKey: searchString,
        sortBy: sortByString,
        order: sortByOrder,
      })
    );
  };

  useEffect(() => {
    getContractList();
  }, [currentPage, dispatch, size, searchString, sortByOrder, sortByString]);

  const handleDeleteContract = (id) => {
    dispatch(deleteContractById({ id: id })).then(() => {
      getContractList();
    });
  };
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Building",
      dataIndex: "buildingName",
      key: "buildingName",
      sorter: (a, b) => a.buildingName.localeCompare(b.buildingName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Room",
      dataIndex: "roomNumber",
      key: "roomNumber",
      sorter: (a, b) => a.roomNumber - b.roomNumber,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Resident",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Expiration Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      sorter: (a, b) =>
        moment(a.expiryDate).unix() - moment(b.expiryDate).unix(),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Contract",
      dataIndex: ["title", "rentContractLink"],
      // key: "rentContractLink",
      render: (text, record) => (
        <b>
          <a
            target="_blank"
            href={`${firebaseEndpoint}${record.rentContractLink}`}
          >
            <Text
              ellipsis={{ tooltip: `${record.title}` }}
              style={ellipsis ? { width: 250 } : undefined}
            >
              <FilePdfTwoTone /> {record.title}
            </Text>
          </a>
        </b>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {rentContractStatus.map((item) => {
            return (
              <>
                {item.status === text ? (
                  <Tag className="tag" color={item.color}>
                    {text}
                  </Tag>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: (_, record) => {
        return (
          <CustomAction
            type="contract"
            onClickDelete={() => handleDeleteContract(record.id)}
            // onClickEdit={() => onClickEdit(record)}
            // onClickDetail={() => onClickDetail(record)}
          />
        );
      },
    },
  ];

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const onSearch = (value) => {
    setSearchString(value);
  };

  const handleAddNew = () => {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contract-container">
      <div className="page-title">
        <h1>Contract</h1>
      </div>
      <div className="contract-content">
        <div className="contract-action">
          <div className="contract-action__search-group">
            <CustomSearch
              placeholder="Search contract.."
              allowClear
              onSearch={onSearch}
            />
            <CustomSelect
              suffixIcon={<AiFillFilter size={15} />}
              title="Sort by"
              onChange={(value) => setSortByString(value)}
              options={[
                {
                  value: "customerName",
                  label: "Resident Name",
                },
                {
                  value: "buildingName",
                  label: "Building",
                },
                {
                  value: "roomNumber",
                  label: "Room",
                },
                {
                  value: "status",
                  label: "Status",
                },
              ]}
            />
            <CustomSelect
              title="Default"
              onChange={(value) => setSortByOrder(value)}
              options={sortOption}
            />
          </div>
          {/* <CustomButton onClick={showModal}>Add new</CustomButton> */}
        </div>
        <Table
          // rowKey="citizenId"
          dataSource={contracts}
          columns={columns}
          pagination={false}
          loading={loading}
        />
        <CustomPagination
          onChange={onChange}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      </div>
    </div>
  );
};

export default Contract;
