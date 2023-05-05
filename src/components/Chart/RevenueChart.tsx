import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  Text,
  LineChart,
  CartesianGrid,
  Line,
} from "recharts";
import { IDashBoard } from "../../types/dashboard.type";

interface RevenueChartProps {
  data: IDashBoard[] | undefined;
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          right: 20,
          left: 0,
          bottom: 10,
        }}
      >
        <XAxis dataKey="month" tick={{ fontSize: 12 }}/>
        <YAxis tick={{ fontSize: 12 }}/>
        <Tooltip formatter={(value: number) => Number(new Intl.NumberFormat('en-Us').format(value))} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;
