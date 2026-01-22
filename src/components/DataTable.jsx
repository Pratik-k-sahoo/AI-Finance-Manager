import React from "react";
import { Card } from "./ui/card";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import useAppMutation from "@/hooks/useAppMutation";
import { deleteExpense, deleteIncome } from "@/lib/api";
import { Button } from "./ui/button";
import UpdateTransactionForm from "./UpdateTransactionForm";
import { Loader } from "lucide-react";

const DataTable = ({ details, id }) => {
	const {
		mutate: deleteTransaction,
		isPending: incomePending,
	} = useAppMutation({
		mutationFn: details.type === "expense" ? deleteExpense : deleteIncome,
		invalidateQueries: ["dashboard", id],
		onError: (error) => {
			console.error(error);
		},
	});

	const handleDeleteTransaction = async (id) => {
		await deleteTransaction(id);
	};
	return (
		<Card
			className={`p-6 ${
				details?.type === "income" ? "bg-accent/15" : "bg-destructive/15"
			}`}
		>
			<div className="flex items-center justify-between">
				<div>
					<div className="flex gap-6">
						<h3 className="text-lg font-medium underline underline-offset-2">
							{details.description}
						</h3>
						<Badge
							className={`text-md text-center capitalize ${
								details?.type === "income"
									? "bg-accent text-primary-foreground"
									: "bg-destructive"
							}`}
							variant=""
						>
							{details.category || details.source}
						</Badge>
					</div>
					<p className="text-foreground/50">
						{new Date(details.date).toLocaleString("en-IN", {
							dateStyle: "medium",
							timeStyle: "short",
						})}
					</p>
				</div>
				<div className="flex gap-10 text-xl font-bold">
					<h2
						className={`${
							details.type !== "expense" ? "text-accent" : "text-red-600"
						}`}
					>
						{details.type === "expense" ? "- " : "+ "}
						{details.amount.toLocaleString("en-IN", {
							maximumFractionDigits: 2,
							style: "currency",
							currency: "INR",
						})}
					</h2>
					<Button asChild className="w-fit">
						<UpdateTransactionForm details={details} id={id} />
					</Button>
					<Button
						asChild
						className="w-fit bg-orange-600 hover:bg-orange-400 cursor-pointer"
						onClick={() => handleDeleteTransaction(details._id)}
					>
						{incomePending ? (
							<Loader className="text-primary-foreground w-8 h-8 animate-pulse" />
						) : (
							<Trash2 className="text-primary-foreground w-8 h-8" />
						)}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default DataTable;
