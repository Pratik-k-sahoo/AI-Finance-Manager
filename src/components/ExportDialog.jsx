import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { downloadExpenseExcel, downloadIncomeExcel, downloadTransactionExcel } from "@/lib/api";

const ExportDialog = ({ variant = "default" }) => {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant={variant}>
					<Download />
					<h4>Export</h4>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] max-h-3/5 overflow-auto">
				<DialogHeader>
					<DialogTitle>Want to download the transactions</DialogTitle>
					<DialogDescription>
						Choose any one and click to download
					</DialogDescription>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4">
					<Button onClick={downloadIncomeExcel}>Income</Button>

					<Button onClick={downloadExpenseExcel}>Expense</Button>

					<Button className="col-span-2" onClick={downloadTransactionExcel}>All Transactions</Button>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								reset();
								setType("expense");
							}}
						>
							Cancel
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ExportDialog;
