import React from "react";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IndianRupee } from "lucide-react";
import { Wallet } from "lucide-react";
import DataBox from "../DataBox";
import { useSelector } from "react-redux";
import { useExpenseAnalytics } from "@/hooks/useExpenseAnalytics";
import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { setMonth } from "@/redux/slices/dashboardSlice";

const BalanceCard = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { data, month } = useSelector((state) => state.dashboard);

	const { analytics, transactions } = useExpenseAnalytics(month);
	const biggestExpense = transactions
		.filter((t) => t.type === "expense")
		.sort((a, b) => b.amount - a.amount)[0];
	const isPositive = analytics.netSavings >= 0;

	return (
		<Card
			id="balance-card"
			className="p-6 bg-primary text-primary-foreground shadow-md border-0"
		>
			<div className="flex justify-between items-center">
				<div className="flex items-center justify-between w-1/2 p-4 rounded-2xl shadow-md bg-linear-to-br from-foreground/50 to-foreground/40">
					<div className="flex flex-col items-center justify-center">
						<div className="flex items-center gap-2">
							<div className="bg-primary-foreground/20 p-2 rounded-lg">
								<Wallet />
							</div>
							<span className="font-semibold text-shadow-md">
								Current Balance
							</span>
							{isPositive ? (
								<TrendingUp className="h-5 w-5 opacity-80" />
							) : (
								<TrendingDown className="h-5 w-5 opacity-80" />
							)}
						</div>
						<div className="text-4xl flex flex-col items-center gap-2">
							<h2 className="text-4xl font-bold tracking-tight flex items-center">
								{data?.totalBalance?.toLocaleString("en-IN", {
									maximumFractionDigits: 2,
									style: "currency",
									currency: "INR",
								})}
							</h2>
							<p className="text-sm opacity-80 flex items-center gap-1 justify-center">
								{isPositive ? (
									<>
										<TrendingUp className="h-3 w-3" />
										<span>
											{analytics.netSavings.toLocaleString("en-IN", {
												maximumFractionDigits: 2,
												style: "currency",
												currency: "INR",
											})}{" "}
											this month
										</span>
									</>
								) : (
									<>
										<TrendingDown className="h-3 w-3" />
										<span>
											{Math.abs(analytics.netSavings).toLocaleString("en-IN", {
												maximumFractionDigits: 2,
												style: "currency",
												currency: "INR",
											})}{" "}
											deficit this month
										</span>
									</>
								)}
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center">
						<div className="flex items-center gap-2">
							<div className="bg-primary-foreground/20 p-2 rounded-lg">
								<IndianRupee />
							</div>
							<span className="font-semibold text-shadow-md">Total Income</span>
						</div>
						<div className="text-4xl flex flex-col items-center gap-2">
							<h2 className="text-4xl font-bold tracking-tight flex items-center">
								{data?.totalIncome?.toLocaleString("en-IN", {
									maximumFractionDigits: 2,
									style: "currency",
									currency: "INR",
								})}
							</h2>
							<p className="text-sm opacity-80 flex items-center gap-1 justify-center">
								<span>
									{analytics.totalIncome.toLocaleString("en-IN", {
										maximumFractionDigits: 2,
										style: "currency",
										currency: "INR",
									})}{" "}
									this month
								</span>
							</p>
						</div>
					</div>
				</div>
				<DataBox
					heading={"Biggest Expense Amount"}
					mainDetails={(biggestExpense?.amount || 0).toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					})}
					details={`${
						analytics?.biggestExpense?.amount?.toLocaleString("en-IN", {
							maximumFractionDigits: 2,
							style: "currency",
							currency: "INR",
						}) || "NA"
					} this month`}
				/>
				<DataBox
					heading={"Biggest Expense Category"}
					mainDetails={biggestExpense?.category?.toUpperCase() || "NA"}
					details={`${
						analytics?.biggestExpense?.category?.toUpperCase() || "NA"
					} this month`}
				/>
				<Select
					defaultValue={month}
					onValueChange={(value) => dispatch(setMonth(value))}
				>
					<SelectTrigger className="w-fit text-black font-bold">
						<SelectValue
							className="placeholder:font-bold"
							placeholder={
								new Date().toLocaleString("default", { month: "long" }) +
								" " +
								new Date().getFullYear()
							}
						/>
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Select month</SelectLabel>
							<SelectItem value="January 2026">January 2026</SelectItem>
							<SelectItem value="February 2026">February 2026</SelectItem>
							<SelectItem value="March 2026">March 2026</SelectItem>
							<SelectItem value="April 2026">April 2026</SelectItem>
							<SelectItem value="May 2026">May 2026</SelectItem>
							<SelectItem value="June 2026">June 2026</SelectItem>
							<SelectItem value="July 2026">July 2026</SelectItem>
							<SelectItem value="August 2026">August 2026</SelectItem>
							<SelectItem value="September 2026">September 2026</SelectItem>
							<SelectItem value="October 2026">October 2026</SelectItem>
							<SelectItem value="November 2026">November 2026</SelectItem>
							<SelectItem value="December 2026">December 2026</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</Card>
	);
};

export default BalanceCard;
