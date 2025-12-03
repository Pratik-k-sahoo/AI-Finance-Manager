import React, {useState} from 'react'
import DataBox from '../DataBox'
import {
	Card,
} from "@/components/ui/card";
import ChartPie from '../ChartPie';


import ChartComponent from '../ChartComponent';
import ChartLine from '../ChartLine';



const lineChartConfig = {
	views: {
		label: "Page Views",
	},
	desktop: {
		label: "Desktop",
		color: "var(--color-chart-1)",
	},
	mobile: {
		label: "Mobile",
		color: "var(--color-chart-2)",
	},
};

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	chrome: {
		label: "Chrome",
		color: "var(--color-chart-1)",
	},
	safari: {
		label: "Safari",
		color: "var(--color-chart-2)",
	},
	firefox: {
		label: "Firefox",
		color: "var(--color-chart-3)",
	},
	edge: {
		label: "Edge",
		color: "var(--color-chart-4)",
	},
	other: {
		label: "Other",
		color: "var(--color-chart-5)",
	},
};

const StatsCard = () => {
  const [balance, setBalance] = useState(2000);
  return (
		<div className="flex w-full gap-7">
			<div className="w-1/2 text-foreground">
				<Card className="p-6 flex items-start h-fit mb-8 bg-primary/20">
					<DataBox
						heading={"Spent This Month"}
						mainDetails={balance.toLocaleString("en-IN", {
							maximumFractionDigits: 2,
							style: "currency",
							currency: "INR",
						})}
						className={"w-full flex items-start bg-transparent text-foreground"}
					/>
				</Card>
				<Card className="p-6 flex items-center justify-center bg-foreground">
					<ChartComponent chartConfig={lineChartConfig}>
						<ChartLine />
					</ChartComponent>
				</Card>
			</div>
			<Card className="w-1/2 flex items-center justify-center overflow-hidden">
				<ChartComponent chartConfig={chartConfig}>
					<ChartPie />
				</ChartComponent>
			</Card>
		</div>
	);
}

export default StatsCard