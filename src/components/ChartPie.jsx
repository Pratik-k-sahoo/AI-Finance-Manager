import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const ChartPie = ({ chartData }) => {
	return (
		<PieChart width={400} height={400} className="mx-auto">
			<Pie
				data={chartData}
				cx="50%"
				cy="50%"
				labelLine={false}
				label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
			>
				{chartData.map((entry, index) => (
					<Cell key={`cell-${index}`} fill={entry.fill} />
				))}
			</Pie>
			<Tooltip
				formatter={(value) =>
					`${value.toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					})}`
				}
				contentStyle={{
					backgroundColor: "hsl(var(--card))",
					border: "1px solid hsl(var(--border))",
					borderRadius: "0.5rem",
				}}
			/>
      <Legend />
		</PieChart>
	);
};

export default ChartPie;
