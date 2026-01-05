import React, { useState } from "react";
import DataBox from "../DataBox";
import { Card } from "@/components/ui/card";
import ChartPie from "../ChartPie";
import ChartComponent from "../ChartComponent";
import ChartLine from "../ChartLine";
import { useExpenseAnalytics } from "@/hooks/useExpenseAnalytics";
import { ResponsiveContainer } from "recharts";
import { AiInsight } from "./AiInsight";
import { useSelector } from "react-redux";

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
const COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
	"hsl(var(--chart-5))",
];

const StatsCard = ({ currDate }) => {
	const { analytics, transactions } = useExpenseAnalytics(currDate);
	const chartData = analytics.categoryBreakdown.map((cat, index) => ({
		name: cat.category,
		value: cat.amount,
		percentage: cat.percentage,
		fill: COLORS[index % COLORS.length],
	}));
	return (
		<div className="flex w-full gap-7">
			<div className="w-1/2 text-foreground">
				<Card className="p-6 flex items-start h-fit mb-8 bg-primary/20">
					<DataBox
						heading={"Spent This Month"}
						mainDetails={analytics.totalExpenses.toLocaleString("en-IN", {
							maximumFractionDigits: 2,
							style: "currency",
							currency: "INR",
						})}
						className={"w-full flex items-start bg-transparent text-foreground"}
					/>
				</Card>
				<Card className="p-6 flex items-center justify-center bg-foreground">
					<AiInsight currDate={currDate} />
				</Card>
			</div>
			<Card className="w-1/2 flex flex-col items-center justify-between p-8 overflow-hidden">
				<h3 className="text-3xl font-semibold mb-4">Spending by Category</h3>
				{chartData.length === 0 && (
					<div className="p-6">
						<div className="h-[300px] flex items-center justify-center text-muted-foreground">
							No expense data available
						</div>
					</div>
				)}
				{chartData.length !== 0 && (
					<ResponsiveContainer>
						<ChartPie chartData={chartData} />
					</ResponsiveContainer>
				)}
			</Card>
		</div>
	);
};

export default StatsCard;
