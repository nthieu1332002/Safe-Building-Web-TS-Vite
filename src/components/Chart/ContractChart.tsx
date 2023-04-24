import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Text,
} from "recharts";
import { DashBoard } from "../../types/dashboard.type";

interface ContractChartProps {
  data: DashBoard[] | undefined;
}

const ContractChart = ({ data }: ContractChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          right: 20,
          left: 0,
          bottom: 10,
        }}
      >
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Text scaleToFit={true} />
        <Tooltip />
        <Area type="monotone" dataKey="value" stroke="#ffbc80" fill="#ffbc80" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ContractChart;
