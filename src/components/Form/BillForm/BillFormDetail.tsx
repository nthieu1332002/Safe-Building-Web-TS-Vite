import React, { useEffect, useState } from "react";
import { Modal, Table } from "antd";
import { ColumnProps } from "antd/es/table";

interface Bill {
  serviceName: string,
  quantity: number,
  price: number,
}

interface BillFormDetailProps {
  bill: Bill[],
  isModalOpen: boolean,
  handleCancel: () => void,
}

const BillFormDetail = ({ bill, isModalOpen, handleCancel }: BillFormDetailProps) => {
  const [data, setData] = useState<Bill[]>([]);
  useEffect(() => {
    if (bill.length > 0) {
      setData(bill)
    }
  }, [bill])
  const columns: ColumnProps<Bill>[] = [
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: (a: Bill, b: Bill) => a.serviceName.localeCompare(b.serviceName),
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a: Bill, b: Bill) => a.quantity - b.quantity,
      render: (text: number) => <b>{text}</b>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      sorter: (a: Bill, b: Bill) => a.price - b.price,
      render: (text: number) => (
        <b>{new Intl.NumberFormat("en-Us").format(text)} VND</b>
      ),
    },
  ];
  return (
    <Modal title="BILL DETAIL" open={isModalOpen} onCancel={handleCancel}>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default BillFormDetail;
