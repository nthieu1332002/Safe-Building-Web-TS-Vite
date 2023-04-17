import { Button, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import {
  getResident,
  getResidentById,
} from "../../store/resident/residentSlice";
import "./style.scss";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import CustomButton from "../../components/CustomButton/CustomButton";
import { customerStatus, sortOption } from "../../ultis/types";
import CustomAction from "../../components/CustomAction/CustomAction";
import ResidentFormAdd from "../../components/Form/ResidentForm/ResidentFormAdd";
import ResidentFormDetail from "../../components/Form/ResidentForm/ResidentFormDetail.jsx";
import ResidentFormEdit from "../../components/Form/ResidentForm/ResidentFormEdit";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { AiFillFilter } from "react-icons/ai";
import { MdOutlineNotificationsActive } from "react-icons/md";
import NotiFormAdd from "../../components/Form/NotiForm/NotiFormAdd";
import { toast } from "react-toastify";
import { RootState, useAppDispatch } from "../../store/store";
import { ColumnsType } from "antd/es/table";
import { Resident, ResidentDetail } from "../../types/resident.type";

const Resident = () => {
  const dispatch = useAppDispatch();
  const {
    residents,
    residentDetail,
    page,
    size,
    totalPage,
    searchKey,
    sortBy,
    order,
    loading,
  } = useSelector((state: RootState) => state.resident);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDetailOpen, setIsModalDetailOpen] = useState(false);
  const [isNotiOpen, setIsNotiOpen] = useState(false);
  const [isMultiNotiOpen, setIsMultiNotiOpen] = useState(false);

  const [fullname, setFullname] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(page);

  const [searchString, setSearchString] = useState(searchKey);
  const [sortByString, setSortByString] = useState(sortBy);
  const [sortByOrder, setSortByOrder] = useState(order);

  const columns: ColumnsType<Resident> = [
    {
      title: "#",
      key: "index",
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: "Full name",
      dataIndex: "fullname",
      key: "fullname",
      sorter: (a, b) => a.fullname.localeCompare(b.fullname),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
          {customerStatus.map((item) => {
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
            type="resident"
            onClickEdit={() => onClickEdit(record)}
            onClickDetail={() => onClickDetail(record)}
            onClickNoti={() => onClickNoti(record)}
          />
        );
      },
    },
  ];
  const getResidentList = () => {
    dispatch(
      getResident({
        page: currentPage,
        size,
        searchKey: searchString,
        sortBy: sortByString,
        order: sortByOrder,
      })
    );
  };

  useEffect(() => {
    getResidentList();
  }, [currentPage, dispatch, searchString, size, sortByOrder, sortByString]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (value: string) => {
    setSearchString(value);
  };

  const fetchResidentById = (id: string) => {
    dispatch(getResidentById({ id }));
  };

  const onClickEdit = (record: Resident) => {
    fetchResidentById(record.id);
    setIsModalEditOpen(true);
  };
  const onClickDetail = (record: Resident) => {
    fetchResidentById(record.id);
    setIsModalDetailOpen(true);
  };
  const onDelete = () => {
    if (residentDetail != null) {
      fetchResidentById(residentDetail.id);
      setIsModalDetailOpen(true);
    }
  };
  const onClickNoti = (record: Resident) => {
    setFullname(record.fullname);
    setToken(record.devices[0]?.token);
    setIsNotiOpen(true);
  };

  const onClickMultiNoti = () => {
    if (selectedRowKeys.length !== 0) {
      setIsNotiOpen(true);
    } else {
      toast.warning(
        "You must choose at least 1 resident to push notification!"
      );
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <>
      <div className="resident-container">
        <div className="page-title">
          <h1>Resident</h1>
        </div>
        <div className="resident-content">
          <div className="resident-action">
            <div className="resident-action__search-group">
              <CustomSearch
                placeholder="Search resident.."
                onSearch={onSearch}
              />
              <CustomSelect
                suffixIcon={<AiFillFilter size={15} />}
                title="Sort by"
                onChange={(value) => setSortByString(value)}
                options={[
                  {
                    value: "fullname",
                    label: "Name",
                  },
                  {
                    value: "phone",
                    label: "Phone",
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
            <div className="resident-action__button-group">
              <button className="custom-button" onClick={onClickMultiNoti}>
                Push notification <MdOutlineNotificationsActive />
              </button>
              <CustomButton onClick={() => setIsModalAddOpen(true)}>
                Add new
              </CustomButton>
            </div>
          </div>
          <Table<Resident>
            rowKey={(record) => record.id}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            dataSource={residents}
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
      <ResidentFormAdd
        loading={loading}
        isModalOpen={isModalAddOpen}
        setIsModalAddOpen={setIsModalAddOpen}
        handleSubmit={getResidentList}
        handleCancel={() => setIsModalAddOpen(false)}
      />
      <ResidentFormEdit
        dispatch={dispatch}
        loading={loading}
        isModalOpen={isModalEditOpen}
        setIsModalEditOpen={setIsModalEditOpen}
        handleSubmit={getResidentList}
        handleCancel={() => setIsModalEditOpen(false)}
        item={residentDetail}
      />
      <ResidentFormDetail
        dispatch={dispatch}
        onClose={() => setIsModalDetailOpen(false)}
        open={isModalDetailOpen}
        customer={residentDetail}
        onDelete={onDelete}
      />
      <NotiFormAdd
        dispatch={dispatch}
        isModalOpen={isNotiOpen}
        setIsModalOpen={setIsNotiOpen}
        handleCancel={() => setIsNotiOpen(false)}
        token={token}
        fullname={fullname}
        customerId={selectedRowKeys}
      />
    </>
  );
};

export default Resident;
