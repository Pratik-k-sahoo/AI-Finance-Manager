import React from "react";

const List = ({ tx, changeClass, amountColor }) => {
	return (
		<li key={tx.id} className="px-6 py-4">
			<div className="grid grid-cols-12 gap-4 items-center">
				<div className="col-span-12 md:col-span-6 flex items-center gap-4">
					<div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
						{tx.icon}
					</div>
					<div>
						<div className="text-sm font-medium text-gray-800">{tx.title}</div>
						<div className="text-xs text-gray-400">ID #{tx.id}</div>
					</div>
				</div>

				<div className="col-span-6 md:col-span-3">
					<div className="text-sm text-gray-700">{tx.category}</div>
				</div>

				<div className="col-span-6 md:col-span-3 text-right">
					<div className={`text-sm font-semibold ${amountColor}`}>
						{tx.amount.toLocaleString("en-IN", {
							style: "currency",
							currency: "INR",
						})}
					</div>
					<div className={`text-xs mt-1 ${changeClass}`}>
						{tx.change > 0
							? `+${tx.change.toLocaleString("en-IN", {
									style: "currency",
									currency: "INR",
							  })}`
							: `${tx.change.toLocaleString("en-IN", {
									style: "currency",
									currency: "INR",
							  })}`}
					</div>
				</div>
			</div>
		</li>
	);
};

export default List;
