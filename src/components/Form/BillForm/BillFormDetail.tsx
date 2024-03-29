import { Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IBillDetail } from "../../../types/bill.type";

interface BillFormDetailProps {
  bill: IBillDetail[];
  isModalOpen: boolean;
  handleCancel: () => void;
}

const BillFormDetail = ({
  bill,
  isModalOpen,
  handleCancel,
}: BillFormDetailProps) => {
  const columns: ColumnsType<IBillDetail> = [
    {
      title: "Service",
      dataIndex: "serviceName",
      key: "serviceName",
      sorter: (a, b) => a.serviceName.localeCompare(b.serviceName),
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
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
  ];
  return (
    <Modal title="BILL DETAIL" open={isModalOpen} onCancel={handleCancel}>
      <Table<IBillDetail>
        dataSource={bill}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default BillFormDetail;
