import React, { useState } from "react";
import { Card } from "../ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import DataTable from "../DataTable";
import { useSelector } from "react-redux";
import { useExpenseAnalytics } from "@/hooks/useExpenseAnalytics";
import AddTransactionForm from "../AddTransactionForm";

const categories = [
	{
		value: "all",
		name: "All Categories",
	},
	{
		value: "food",
		name: "Food",
	},
	{
		value: "bills",
		name: "Bills",
	},
	{
		value: "travel",
		name: "Travel",
	},
	{
		value: "shopping",
		name: "Shopping",
	},
	{
		value: "entertainment",
		name: "Entertainment",
	},
	{
		value: "healthcare",
		name: "Healthcare",
	},
	{
		value: "education",
		name: "Education",
	},
	{
		value: "income",
		name: "Income",
	},
	{
		value: "others",
		name: "Others",
	},
];

const TransactionCard = () => {
  const {month} = useSelector(state => state.dashboard)
	const { analytics } = useExpenseAnalytics(month);
	const { user } = useSelector((state) => state.auth);
	const [category, setCategory] = useState("all");

	const transactions = analytics.recentTransaction
		.filter((t) => {
			if (category === "all") return true;
			else {
				return t.category === category || t.type === category;
			}
		})
		.sort((a, b) => b.date - a.date);

	return (
		<div className="w-full">
			<Card className="p-6 space-y-6">
				<div className="flex justify-between">
					<h2 className="text-3xl text-primary font-bold tracking-wide">
						Transcation
					</h2>
					<div className="flex gap-4">
						<Select
							value={category}
							onValueChange={(value) => {
								setCategory(value);
							}}
						>
							<SelectTrigger className="h-full w-48 capitalize">
								<SelectValue placeholder="Select Category" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categories.map((item) => (
										<SelectItem
											key={item.value}
											value={item.value}
											className="capitalize"
										>
											{item.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						<AddTransactionForm />
					</div>
				</div>
				<div className="flex flex-col gap-4 mx-10">
					{transactions.map((transactionData, idx) => (
						<DataTable key={idx} details={transactionData} id={user?._id} />
					))}
				</div>
			</Card>
		</div>
	);
};

export default TransactionCard;
