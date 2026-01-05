import BalanceCard from "@/components/dashboard/BalanceCard";
import StatsCard from "@/components/dashboard/StatsCard";
import TransactionCard from "@/components/dashboard/TransactionCard";
import useGetQuery from "@/hooks/useGetQuery";
import { fetchDashboardData } from "@/lib/api";
import { setDashboardData } from "@/redux/slices/dashboardSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function Main({ currDate, setCurrDate }) {
	return (
		<div className="min-h-[calc(100vh-4.05rem)] bg-linear-to-br from-primary/5 via-background to-secondary/5">
			{" "}
			{/*min-h-screen*/}
			<main className="container mx-auto px-4 py-8 space-y-6">
				<BalanceCard currDate={currDate} setCurrDate={setCurrDate} />
				<StatsCard currDate={currDate} setCurrDate={setCurrDate} />
				<TransactionCard currDate={currDate} setCurrDate={setCurrDate} />
			</main>
		</div>
	);
}

export default Main;
