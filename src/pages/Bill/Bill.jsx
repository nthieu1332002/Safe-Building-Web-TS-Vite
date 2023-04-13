import { Table, Tag } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAction from "../../components/CustomAction/CustomAction";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import BillFormAdd from "../../components/Form/BillForm/BillFormAdd";
import BillFormDetail from "../../components/Form/BillForm/BillFormDetail";
import { getBill, getBillById } from "../../store/bill/billSlice";
import { getAllBuilding } from "../../store/building/buildingSlice";
import { getService } from "../../store/service/serviceSlice";
import { billStatus } from "../../ultis/types";
import { RiNewspaperLine } from "react-icons/ri";
import "./style.scss";
import BillFormMonthly from "../../components/Form/BillForm/BillFormMonthly";

const Bill = () => {
  const dispatch = useDispatch();
  const { bills, billDetail, page, size, totalPage, loading } = useSelector(
    (state) => state.bill
  );
  const [currentPage, setCurrentPage] = useState(page);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isMonthlyModalOpen, setIsMonthlyModalOpen] = useState(false);
  const columns = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Building Name",
      dataIndex: "buildingName",
      key: "buildingName",
      sorter: (a, b) => a.buildingName.localeCompare(b.buildingName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Room number",
      dataIndex: "room_number",
      key: "room_number",
      align: "center",
      sorter: (a, b) => a.room_number - b.room_number,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      align: "center",
      sorter: (a, b) => a.value - b.value,
      render: (text) => (
        <b>{new Intl.NumberFormat("en-Us").format(text)} VND</b>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {billStatus.map((item) => {
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
            type="bill"
            onClickDetail={() => onClickDetail(record)}
          />
        );
      },
    },
  ];

  const onClickDetail = (record) => {
    dispatch(getBillById({ id: record.id }));
    setIsModalDetailOpen(true);
  };
  const getBillList = () => {
    dispatch(
      getBill({
        page: currentPage,
        size,
      })
    );
  };

  useEffect(() => {
    getBillList();
  }, [currentPage, dispatch, size]);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddNew = () => {
    dispatch(
      getAllBuilding({
        page: 1,
        size: 100,
        searchKey: "",
        sortBy: "name",
        order: "asc",
      })
    );
    dispatch(
      getService({
        page: currentPage,
        size,
        searchKey: "",
        sortBy: "",
        order: "",
      })
    );
    setIsModalAddOpen(true);
  };

  const handleMonthlyBill = () => {
    setIsMonthlyModalOpen(true);
    dispatch(
      getAllBuilding({
        page: 1,
        size: 100,
        searchKey: "",
        sortBy: "name",
        order: "asc",
      })
    );
  };
  return (
    <>
      <div className="bill-container">
        <div className="page-title">
          <h1>Bill</h1>
        </div>
        <div className="bill-content">
          <div className="bill-action">
            <CustomSearch
              placeholder="Search bill account.."
              allowClear
              //   onSearch={onSearch}
              width="30%"
            />

            <div className="bill-action__button-group">
              <button className="custom-button" onClick={handleMonthlyBill}>
                Monthly bill
                <RiNewspaperLine />
              </button>
              <CustomButton onClick={handleAddNew}>Add new</CustomButton>
            </div>
          </div>
          <Table
            dataSource={bills}
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
      <BillFormAdd
        dispatch={dispatch}
        loading={loading}
        isModalOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
        handleSubmit={getBillList}
        handleCancel={() => setIsModalAddOpen(false)}
      />
      <BillFormDetail
        isModalOpen={isModalDetailOpen}
        handleCancel={() => setIsModalDetailOpen(false)}
        bill={billDetail}
      />
      <BillFormMonthly
        dispatch={dispatch}
        loading={loading}
        isModalOpen={isMonthlyModalOpen}
        setIsModalOpen={setIsMonthlyModalOpen}
        handleCancel={() => setIsMonthlyModalOpen(false)}
      />
    </>
  );
};

export default Bill;
