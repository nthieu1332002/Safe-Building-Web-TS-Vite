import { Spin } from "antd";
import "./style.scss";

const Loading = () => {
  return (
    <div className="loading">
      <Spin />
    </div>
  );
};

export default Loading;
