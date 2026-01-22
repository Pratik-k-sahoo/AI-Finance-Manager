import React from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import List from "./List";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TransactionCard = ({transactions}) => {
	return (
		<Card className="bg-blue-50/40 shadow-sm overflow-hidden flex flex-col">
			<div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-primary text-primary-foreground">
				<div className="flex items-center gap-4">
					<h2 className="text-lg font-medium">All Transactions</h2>
					<span className="text-sm">Showing {transactions.length} items</span>
				</div>

				<div className="flex items-center gap-3">
					<Input
						placeholder="Search Transaction..."
						className="text-sm h-9 text-foreground"
					/>
					<Select defaultValue="all">
						<SelectTrigger className="w-48 h-9 rounded-sm text-foreground">
							<SelectValue placeholder="Select Any Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="food">Food</SelectItem>
							<SelectItem value="income">Income</SelectItem>
							<SelectItem value="bills">Bills</SelectItem>
							<SelectItem value="transportation">Transportation</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className="flex-1 overflow-auto">
				<div className="hidden md:grid grid-cols-12 items-center gap-4 px-6 py-3 border-b border-gray-100 text-sm text-gray-500 sticky top-0 bg-white z-10">
					<div className="col-span-6">Description</div>
					<div className="col-span-3">Category</div>
					<div className="col-span-3 text-right">Amount / Change</div>
				</div>

				<ul className="divide-y divide-gray-100">
					{transactions.map((tx) => {
						const isPositiveChange = tx.change > 0;
						const changeClass = isPositiveChange
							? "text-green-600"
							: "text-red-500";
						const amountColor =
							tx.type === "expense" ? "text-red-900" : "text-green-700";

						return (
							<List
								tx={tx}
								key={tx.id}
								changeClass={changeClass}
								amountColor={amountColor}
							/>
						);
					})}
				</ul>
			</div>

			<div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
				<div className="text-sm text-gray-500">Showing all transactions</div>
				<div className="text-sm text-gray-500">
					Total: {transactions.length}
				</div>
			</div>
		</Card>
	);
};

export default TransactionCard;
