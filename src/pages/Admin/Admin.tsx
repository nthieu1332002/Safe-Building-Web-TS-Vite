import { Table, Tag, Form, Input } from "antd";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomAction from "../../components/CustomAction/CustomAction";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import CustomSearch from "../../components/CustomSearch/CustomSearch";
import { getAdminAccount } from "../../store/admin/adminSlice";
import { adminStatus } from "../../ultis/types";
import { EditableCell } from "../../ultis/EditableCell";

import "./style.scss";
import { RootState, useAppDispatch } from "../../store/store";
import { Admin } from "../../types/admin.type";
import { ColumnsType } from "antd/es/table";

const Admin = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { adminAccounts, page, size, totalPage, loading } = useSelector(
    (state: RootState) => state.admin
  );
  const [currentPage, setCurrentPage] = useState(page);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState<Admin[]>(adminAccounts);
  useEffect(() => {
    const getAdminAccountList = () => {
      dispatch(getAdminAccount({ page: currentPage, size }));
    };
    getAdminAccountList();
  }, [currentPage, dispatch, size]);

  useEffect(() => {
    setData(adminAccounts);
  }, [adminAccounts]);

  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Admin) => record.id === editingKey;
  const edit = (record: Partial<Admin> & { id: React.Key }) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Admin;
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns: ColumnsType<Admin> = [
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
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <b>{text}</b>,
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <b>{text}</b>,
      editable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (
        <>
          {adminStatus.map((item) => {
            return (
              <>
                {item.status === text ? (
                  <Tag key={item.id} className="tag" color={item.color}>
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
      editable: true,
    },
    {
      title: "Action",
      align: "center",
      dataIndex: "action",
      render: (_: any, record: ) => {
        return (
          <CustomAction
            editable={isEditing(record)}
            onConfirm={cancel}
            onClickSave={() => save(record.id)}
            disabled={editingKey !== ""}
            onClickEdit={() => edit(record)} type="" />
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Admin) => ({
        record,
        tableName: "admin",
        inputType: col.dataIndex === "status" ? "status" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  const onSearch = (value: string) => {
    console.log("value", value);
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="admin-container">
        <div className="page-title">
          <h1>Admin</h1>
        </div>
        <div className="admin-content">
          <div className="admin-action">
            <CustomSearch
              placeholder="Search admin account.."
              onSearch={onSearch}
              width="30%"
            />
            <CustomButton onClick={handleAddNew}>Add new</CustomButton>
          </div>
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={false}
              loading={loading}
            />
          </Form>
          <CustomPagination
            onChange={onChange}
            currentPage={currentPage}
            totalPage={totalPage}
          />
        </div>
      </div>
    </>
  );
};

export default Admin;
