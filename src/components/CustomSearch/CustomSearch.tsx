import { Input } from "antd";
import "./style.scss";

const { Search } = Input;

interface CustomSearchProps {
  placeholder: string;
  onSearch?: (value: string) => void;
  width?: string;
}

const CustomSearch = ({ placeholder, onSearch, width }: CustomSearchProps) => {
  return (
    <div className="custom-search" style={{ width: width }}>
      <Search
        placeholder={placeholder}
        allowClear
        onSearch={onSearch}
        size="large"
      />
    </div>
  );
};

export default CustomSearch;
