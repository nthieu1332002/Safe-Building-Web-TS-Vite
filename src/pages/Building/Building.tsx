import { Table, Tag, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { getBuilding } from "../../store/building/buildingSlice";
import { buildingStatus, sortOption } from "../../ultis/types";
import { AiFillFilter } from "react-icons/ai";
import "./style.scss";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import BuildingFormAdd from "../../components/Form/BuildingForm/BuildingFormAdd";
import { RootState, useAppDispatch } from "../../store/store";
import { IBuilding } from "../../types/building.type";
import { ColumnsType } from "antd/es/table";
const { Text } = Typography;

const Building = () => {
  const dispatch = useAppDispatch();
  const {
    buildings,
    searchKey,
    sortBy,
    order,
    page,
    size,
    totalPage,
    loading,
  } = useSelector((state: RootState) => state.building);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(page);
  const [searchString, setSearchString] = useState(searchKey);
  const [sortByString, setSortByString] = useState(sortBy);
  const [sortByOrder, setSortByOrder] = useState(order);
  const [ellipsis, setEllipsis] = useState(true);
  const columns: ColumnsType<IBuilding> = [
    {
      title: "#",
      key: "index",
      render: (value: any, item: any, index: number) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Building name",
      dataIndex: "name",
      key: "name",
      sorter: (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name),
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text: string) => (
        <Text ellipsis style={ellipsis ? { width: 250 } : undefined}>
          <b>{text}</b>
        </Text>
      ),
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      align: "center",
      sorter: (a: {capacity: number}, b: {capacity: number}) => a.capacity - b.capacity,
      render: (text: number) => <b>{text}</b>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      sorter: (a: {status: string}, b: {status: string}) => a.status.localeCompare(b.status),
      render: (text: string ) => (
        <>
          {buildingStatus.map((item) => {
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
  ];

  const getBuildingList = () => {
    dispatch(
      getBuilding({
        page: currentPage,
        size,
        searchKey: searchString,
        sortBy: sortByString,
        order: sortByOrder,
      })
    );
  };

  useEffect(() => {
    getBuildingList();
  }, [currentPage, dispatch, searchString, size, sortByOrder, sortByString]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (value: string) => {
    setSearchString(value);
  };

  const handleAddNew = () => {
    setIsModalAddOpen(true);
  };

  return (
    <>
      <div className="building-container">
        <div className="page-title">
          <h1>Building</h1>
        </div>
        <div className="building-content">
          <div className="building-action">
            <div className="building-action__search-group">
              <CustomSearch
                placeholder="Search building.."
                onSearch={onSearch}
              />
              <CustomSelect
                suffixIcon={<AiFillFilter size={15} />}
                title="Sort by"
                onChange={(value) => setSortByString(value)}
                options={[
                  {
                    value: "Name",
                    label: "Name",
                  },
                  {
                    value: "Address",
                    label: "Address",
                  },
                  {
                    value: "Status",
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
            <CustomButton onClick={handleAddNew}>Add new</CustomButton>
          </div>
          <Table<IBuilding>
            // rowKey="id"
            dataSource={buildings}
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
      <BuildingFormAdd
        loading={loading}
        isModalOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
        handleSubmit={getBuildingList}
        handleCancel={() => setIsModalAddOpen(false)}
      />
    </>
  );
};

export default Building;
