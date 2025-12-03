import React from "react";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import DataTable from "../DataTable";

const data = [
	{
		Type: "Expense",
		Amount: 1200,
		Category: "food",
		Description: "Monthly groceries and dining out",
	},
	{
		Type: "Expense",
		Amount: 2500,
		Category: "bills",
		Description: "Electricity and internet bills",
	},
	{
		Type: "Expense",
		Amount: 1800,
		Category: "travel",
		Description: "Cab fares and weekend trip",
	},
	{
		Type: "Expense",
		Amount: 3000,
		Category: "shopping",
		Description: "Clothes and household items",
	},
	{
		Type: "Expense",
		Amount: 1500,
		Category: "entertainment",
		Description: "Movie tickets and streaming subscriptions",
	},
	{
		Type: "Income",
		Amount: 50000,
		Category: "income",
		Description: "Monthly salary credited",
	},
];

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
		name: "shopping",
	},
	{
		value: "entertainment",
		name: "entertainment",
	},
	{
		value: "healthcare",
		name: "healthcare",
	},
	{
		value: "education",
		name: "education",
	},
	{
		value: "income",
		name: "income",
	},
	{
		value: "others",
		name: "others",
	},
];

const TransactionCard = () => {
	return (
		<div className="w-full">
			<Card className="p-6">
				<div className="flex justify-between">
					<h2 className="text-3xl text-primary font-bold tracking-wide">
						Transcation
					</h2>
					<div className="flex gap-4">
						<Select defaultValue="all" onValueChange={(e) => console.log(e)}>
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
						<Button>
							<Plus />
							<h4>Add Transaction</h4>
						</Button>
					</div>
				</div>
				<div className="flex flex-col gap-4 mx-10">
					{data.map((transactionData, idx) => (
						<DataTable key={idx} details={transactionData} />
					))}
				</div>
			</Card>
		</div>
	);
};

export default TransactionCard;
