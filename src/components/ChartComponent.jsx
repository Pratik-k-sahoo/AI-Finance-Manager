import React from 'react'
import {
	ChartContainer,
} from "@/components/ui/chart";

const ChartComponent = ({chartConfig, children}) => {
  return (
		<ChartContainer config={chartConfig}>
			{children}
		</ChartContainer>
	);
}

export default ChartComponent