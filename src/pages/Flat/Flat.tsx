import { Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAction from "../../components/CustomAction/CustomAction";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import FlatFormAdd from "../../components/Form/FlatForm/FlatFormAdd";
import { getAllBuilding } from "../../store/building/buildingSlice";
import { getFlat, getFlatType } from "../../store/flat/flatSlice";
import { flatStatus } from "../../ultis/types";
import "./style.scss";
import { RootState, useAppDispatch } from "../../store/store";
import { IFlat } from "../../types/flat.type";
import { ColumnsType } from "antd/es/table";

const Flat = () => {
  const dispatch = useAppDispatch();
  const { flats, flatType, page, size, totalPage, loading } = useSelector(
    (state: RootState) => state.flat
  );
  const [currentPage, setCurrentPage] = useState(page);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const columns: ColumnsType<IFlat> = [
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
      title: "Room number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      align: "center",
      sorter: (a, b) => a.roomNumber - b.roomNumber,
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Flat type",
      dataIndex: "flatType",
      key: "flatType",
      sorter: (a, b) => a.flatType.localeCompare(b.flatType),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <b>{new Intl.NumberFormat("en-Us").format(text)} VND</b>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {flatStatus.map((item) => {
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
        return <CustomAction type="" />;
      },
    },
  ];

  const getFlatList = () => {
    dispatch(getFlat({ page: currentPage, size }));
  };

  useEffect(() => {
    getFlatList();
  }, [currentPage, dispatch, size]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  const fetchFlatType = () => {
    dispatch(getFlatType());
  };
  const fetchBuildingList = () => {
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
  const handleAddNew = () => {
    fetchFlatType();
    fetchBuildingList();
    setIsModalAddOpen(true);
  };
  const handleUpdate = () => {
    fetchFlatType();
    fetchBuildingList();
    setIsModalUpdateOpen(true);
  };

  return (
    <>
      <div className="flat-container">
        <div className="page-title">
          <h1>Flat</h1>
        </div>
        <div className="flat-content">
          <div className="flat-action">
            <CustomSearch
              placeholder="Search flat.."
              onSearch={onSearch}
              width="30%"
            />
            <CustomButton onClick={handleAddNew}>Add new</CustomButton>
          </div>
          <Table<IFlat>
            // rowKey="citizenId"
            dataSource={flats}
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
      <FlatFormAdd
        dispatch={dispatch}
        loading={loading}
        isModalOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
        handleSubmit={getFlatList}
        handleCancel={() => setIsModalAddOpen(false)}
        flatType={flatType}
      />
    </>
  );
};

export default Flat;
