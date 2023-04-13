import { Pagination } from "antd";
import "./style.scss";

interface CustomPaginationProps {
  onChange?: (page: number) => void;
  currentPage: number;
  totalPage: number;
}

const CustomPagination = ({
  onChange,
  currentPage,
  totalPage,
}: CustomPaginationProps) => {
  return (
    <div className="custom-pagination">
      <Pagination
        defaultPageSize={1}
        onChange={onChange}
        current={currentPage}
        total={totalPage}
      />
    </div>
  );
};

export default CustomPagination;
