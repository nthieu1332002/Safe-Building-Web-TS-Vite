import { Image, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getService } from "../../store/service/serviceSlice";
import { AiFillFilter } from "react-icons/ai";
import { serviceStatus, sortOption } from "../../ultis/types";
import "./style.scss";
import ServiceFormAdd from "../../components/Form/ServiceForm/ServiceFormAdd";
import { RootState, useAppDispatch } from "../../store/store";
import { ColumnsType } from "antd/es/table";
import { Service } from "../../types/service.type";
const firebaseEndpoint = process.env.REACT_APP_FIREBASE_ENDPOINT;

const Service = () => {
  const dispatch = useAppDispatch();
  const { services, searchKey, sortBy, order, page, size, totalPage, loading } =
    useSelector((state: RootState) => state.service);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(page);
  const [searchString, setSearchString] = useState(searchKey);
  const [sortByString, setSortByString] = useState(sortBy);
  const [sortByOrder, setSortByOrder] = useState(order);
  const columns: ColumnsType<Service> = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Price",
      dataIndex: "price",
      align: "center",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (text) => (
        <b>{new Intl.NumberFormat("en-Us").format(text)} VND</b>
      ),
    },
    {
      title: "Icon",
      dataIndex: "icon",
      align: "center",
      key: "icon",
      render: (text) => text && <Image width={50} src={text} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {serviceStatus.map((item) => {
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
  const getServiceList = () => {
    dispatch(
      getService({
        page: currentPage,
        size,
        searchKey: searchString,
        sortBy: sortByString,
        order: sortByOrder,
      })
    );
  };
  useEffect(() => {
    getServiceList();
  }, [currentPage, dispatch, searchString, size, sortByOrder, sortByString]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (value: string) => {
    setSearchString(value);
  };

  return (
    <>
      <div className="service-container">
        <div className="page-title">
          <h1>Service</h1>
        </div>
        <div className="service-content">
          <div className="service-action">
            <div className="service-action__search-group">
              <CustomSearch
                placeholder="Search service.."
                onSearch={onSearch}
              />
              <CustomSelect
                suffixIcon={<AiFillFilter size={15} />}
                title="Sort by"
                onChange={(value) => setSortByString(value)}
                options={[
                  {
                    value: "Price",
                    label: "Price",
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
            <CustomButton onClick={() => setIsModalAddOpen(true)}>
              Add new
            </CustomButton>
          </div>
          <Table
            // rowKey="citizenId"
            dataSource={services}
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
      <ServiceFormAdd
        loading={loading}
        dispatch={dispatch}
        isModalOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
        handleSubmit={getServiceList}
        handleCancel={() => setIsModalAddOpen(false)}
      />
    </>
  );
};

export default Service;
