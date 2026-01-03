import React from "react";
import { Card } from "../ui/card";

const Header = ({ transactions }) => {
	return (
		<Card className="max-w-7xl mx-auto bg-primary-foreground border-b border-foreground/20">
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">
						Transactions
					</h1>
					<p className="text-sm text-foreground/50 mt-0.5">
						All transactions — total {transactions.length}
					</p>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="button"
						className="inline-flex items-center px-3 py-2 border border-gray-200 rounded-md text-sm bg-white hover:bg-gray-50"
					>
						Export
					</button>
					<button
						type="button"
						className="inline-flex items-center px-3 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/80 cursor-pointer"
					>
						Add Transaction
					</button>
				</div>
			</div>
		</Card>
	);
};

export default Header;
