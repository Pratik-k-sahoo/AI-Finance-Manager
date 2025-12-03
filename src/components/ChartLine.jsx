import React from 'react'
import {
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartData = [
	{ date: "2024-04-01", desktop: 222, mobile: 150 },
	{ date: "2024-04-02", desktop: 97, mobile: 180 },
	{ date: "2024-04-03", desktop: 167, mobile: 120 },
	{ date: "2024-04-04", desktop: 242, mobile: 260 },
	{ date: "2024-04-05", desktop: 373, mobile: 290 },
];

const ChartLine = () => {
  return (
		<LineChart
      width={620}
      height={300}
			accessibilityLayer
			data={chartData}
			margin={{
				left: 12,
				right: 12,
			}}
		>
			<CartesianGrid vertical={false} />
			<XAxis
				dataKey="date"
				tickLine={false}
				axisLine={false}
				tickMargin={8}
				minTickGap={32}
				tickFormatter={(value) => {
					const date = new Date(value);
					return date.toLocaleDateString("en-US", {
						month: "short",
						day: "numeric",
					});
				}}
			/>
			<ChartTooltip
				content={
					<ChartTooltipContent
						className="w-[150px]"
						nameKey="views"
						labelFormatter={(value) => {
							return new Date(value).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric",
							});
						}}
					/>
				}
			/>
			<Line
				dataKey={"desktop"}
				type="monotone"
				stroke={`var(--color-${"desktop"})`}
				strokeWidth={2}
				dot={false}
			/>
		</LineChart>
	);
}

export default ChartLine