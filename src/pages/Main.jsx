
import BalanceCard from "@/components/dashboard/BalanceCard";
import StatsCard from "@/components/dashboard/StatsCard";
import TransactionCard from "@/components/dashboard/TransactionCard";
import React, { useState } from "react";

function Main() {
	return (
		<div className="min-h-[calc(100vh-4.05rem)] bg-linear-to-br from-primary/5 via-background to-secondary/5">
			{" "}
			{/*min-h-screen*/}
			<main className="container mx-auto px-4 py-8 space-y-6">
				<BalanceCard />
				<StatsCard />
				<TransactionCard />
			</main>
		</div>
	);
}

export default Main;
