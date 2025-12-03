import React, {useState} from 'react'
import DataBox from '../DataBox'
import { Pie, PieChart } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--chart-5)",
	},
};

const StatsCard = () => {
  const [balance, setBalance] = useState(2000);
  return (
		<div className="flex w-full gap-7">
			<Card className="p-6 w-1/2 text-foreground flex items-start h-fit">
				<DataBox
					heading={"Spent This Month"}
					mainDetails={balance.toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					})}
					className={"w-full flex items-start"}
				/>
			</Card>
			<Card className="w-1/2">
				<ChartContainer config={chartConfig}>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Pie
							data={chartData}
							dataKey="visitors"
							nameKey="browser"
							stroke="0"
						/>
					</PieChart>
				</ChartContainer>
			</Card>
		</div>
	);
}

export default StatsCard