
import BalanceCard from "@/components/dashboard/BalanceCard";
import StatsCard from "@/components/dashboard/StatsCard";
import React, { useState } from "react";

function Main() {
	return (
		<div className="min-h-[calc(100vh-4.05rem)] bg-linear-to-br from-primary/5 via-background to-secondary/5">
			{" "}
			{/*min-h-screen*/}
			<main className="container mx-auto px-4 py-8 space-y-6">
				<BalanceCard />
				<StatsCard />
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<h3>SpendingChart</h3>
					<h3>AIInsights</h3>
				</div>
				<h3>SavingGoals</h3>
				<h3>TransactionList</h3>
			</main>
		</div>
	);
}

export default Main;
