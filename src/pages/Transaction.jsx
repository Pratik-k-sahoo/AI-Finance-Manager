import { Wallet } from "lucide-react";
import { Utensils } from "lucide-react";
import { FireExtinguisher } from "lucide-react";
import { ReceiptIndianRupee } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import React from "react";
import Header from "../components/Transaction/Header";
import TransactionCard from "../components/Transaction/TransactionCard";

const transactions = [
	{
		id: 1,
		title: "Groceries",
		category: "Food",
		amount: 3150,
		change: -150,
		icon: <ShoppingCart />,
	},
	{
		id: 2,
		title: "Salary",
		category: "Income",
		amount: 3000,
		change: 3000,
		icon: <Wallet />,
	},
	{
		id: 3,
		title: "Electric Bill",
		category: "Bills",
		amount: -100,
		change: -100,
		icon: <ReceiptIndianRupee />,
	},
	{
		id: 4,
		title: "Restaurant",
		category: "Food",
		amount: -60,
		change: -60,
		icon: <Utensils />,
	},
	{
		id: 5,
		title: "Gas",
		category: "Transportation",
		amount: -40,
		change: -40,
		icon: <FireExtinguisher />,
	},
	// add more transactions here to test scrolling / "all" view
];

export default function Transaction() {
	return (
		<div className="h-screen w-full bg-gray-50">
			<Header transactions={transactions} />

			<main className="max-w-7xl mx-auto px-6 py-6">
				<TransactionCard transactions={transactions} />
			</main>
		</div>
	);
}
