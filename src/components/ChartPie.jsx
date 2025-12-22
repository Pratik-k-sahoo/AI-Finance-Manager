import React from "react";
import { Pie, PieChart } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
	{ browser: "safari", visitors: 200, fill: "var(--color-safari)" },
	{ browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
	{ browser: "edge", visitors: 173, fill: "var(--color-edge)" },
	{ browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const ChartPie = () => {
	return (
		<PieChart width={400} height={400} className="mx-auto">
			<ChartTooltip
				cursor={false}
				content={<ChartTooltipContent hideLabel />}
			/>
			<Pie data={chartData} dataKey="visitors" nameKey="browser" stroke="0" />
		</PieChart>
	);
};

export default ChartPie;
