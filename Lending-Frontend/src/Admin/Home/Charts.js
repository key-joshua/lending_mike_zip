import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function App({ points, type }) {
  return (
    <AreaChart
      width={500}
      height={250}
      data={[
        ...points.map((obj) => {
          return { name: obj._id, uv: obj.count };
        }),
      ]}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="1%" stopColor="#285BE2" stopOpacity={0.6} />
          <stop offset="99%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="1%" stopColor="#E22849" stopOpacity={0.6} />
          <stop offset="99%" stopColor="#ffffff" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="transparent"
        fill={`url(${type === "granted" ? "#colorPv" : "#colorUv"})`}
      />
    </AreaChart>
  );
}
