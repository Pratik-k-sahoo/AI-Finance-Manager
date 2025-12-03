import { cn } from '@/lib/utils';
import React from 'react'

const DataBox = ({heading, mainDetails, details, className}) => {
  return (
		<div className={cn("p-4 rounded-2xl shadow-md bg-linear-to-br from-foreground/50 to-foreground/40 h-[8.7rem] flex flex-col items-center justify-between", className)}>
			<span className="font-semibold text-shadow-md">
				{heading}
			</span>
			<div className="text-4xl flex flex-col items-center gap-2">
				<h2 className="text-4xl font-bold tracking-tight flex items-center">
					{mainDetails}
				</h2>
				<p className="text-sm opacity-80 flex items-center gap-1 justify-center">
					<span>{details}</span>
				</p>
			</div>
		</div>
	);
}

export default DataBox