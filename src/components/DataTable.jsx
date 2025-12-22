import React from "react";
import { Card } from "./ui/card";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DataTable = ({ details }) => {
	return (
		<Card className="p-6">
			<div className="flex items-center justify-between">
				<div>
					<div className="flex gap-6">
						<h3 className="text-lg font-medium underline underline-offset-2">
							{details.Description}
						</h3>
						<Badge
							className={`text-md text-center capitalize ${
								details.Category === "income"
									? "bg-accent text-primary-foreground"
									: "bg-foreground"
							}`}
							variant=""
						>
							{details.Category}
						</Badge>
					</div>
					<p className="text-foreground/50">
						{new Date().toLocaleDateString()}
					</p>
				</div>
				<div className="flex gap-10 text-xl font-bold">
					<h2
						className={`${
							details.Type !== "Expense" ? "text-accent" : "text-red-600"
						}`}
					>
						{details.Type === "Expense" ? "- " : "+ "}
						{details.Amount.toLocaleString("en-IN", {
							maximumFractionDigits: 2,
							style: "currency",
							currency: "INR",
						})}
					</h2>
					<button>
						<Pencil />
					</button>
					<button>
						<Trash2 />
					</button>
				</div>
			</div>
		</Card>
	);
};

export default DataTable;
