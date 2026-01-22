import { useMemo, useState, useEffect } from "react";
import {
	startOfMonth,
	endOfMonth,
	isWithinInterval,
	parseISO,
	format,
	subMonths,
	startOfYear,
	differenceInCalendarMonths,
} from "date-fns";
import { useSelector } from "react-redux";

export const useExpenseAnalytics = (month) => {
	const { data } = useSelector((state) => state.dashboard);
	const targetMonth = month || new Date();
	const monthStart = startOfMonth(targetMonth);
	const monthEnd = endOfMonth(targetMonth);

	const transactions = useMemo(() => {
		const incomes = Array.isArray(data?.incomes) ? data.incomes : [];
		const expenses = Array.isArray(data?.expenses) ? data.expenses : [];
		const details = [
			...incomes?.map((txn) => ({
				...txn,
				type: "income",
			})),
			...expenses?.map((txn) => ({
				...txn,
				type: "expense",
			})),
		].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
		return details || [];
	}, [data]);

	const monthTransactions = useMemo(() => {
		return transactions.filter((t) => {
			const date = new Date(t.date);
			if (isNaN(date.getTime())) return false;
			return isWithinInterval(date, {
				start: monthStart,
				end: monthEnd,
			});
		});
	}, [transactions, monthStart, monthEnd]);

	const prevMonthTransactions = useMemo(() => {
		return {
			data: transactions.filter((t) => {
				const date = new Date(t.date);
				if (isNaN(date.getTime())) return false;
				return isWithinInterval(date, {
					start: startOfYear(monthStart),
					end: endOfMonth(subMonths(monthStart, 1)),
				});
			}),
			monthCount:
				differenceInCalendarMonths(
					endOfMonth(subMonths(monthStart, 1)),
					startOfYear(monthStart),
				) + 1,
		};
	}, [transactions, monthStart, monthEnd]);

	const analytics = useMemo(() => {
		const expenses = monthTransactions.filter((t) => t.type === "expense");
		const income = monthTransactions.filter((t) => t.type === "income");
		const biggestExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0];
		const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
		const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
		const recentTransaction = [
			...income?.map((txn) => ({
				...txn,
				type: "income",
			})),
			...expenses?.map((txn) => ({
				...txn,
				type: "expense",
			})),
		]
			.sort((a, b) => {
				const dateDiff =
					new Date(b.date).getTime() - new Date(a.date).getTime();
				if (dateDiff !== 0) return dateDiff;
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			})
			.slice(0, 10);

		const categoryMap = new Map();

		expenses.forEach((transaction) => {
			const current = categoryMap.get(transaction.category) || {
				amount: 0,
				count: 0,
			};
			categoryMap.set(transaction.category, {
				amount: current.amount + transaction.amount,
				count: current.count + 1,
			});
		});

		const categoryBreakdown = Array.from(categoryMap.entries())
			.map(([category, data]) => ({
				category,
				amount: data.amount,
				count: data.count,
				percentage: totalExpenses > 0 ? (data.amount / totalExpenses) * 100 : 0,
			}))
			.sort((a, b) => b.amount - a.amount);

		return {
			recentTransaction,
			totalIncome,
			totalExpenses,
			biggestExpense,
			netSavings: totalIncome - totalExpenses,
			categoryBreakdown,
			averageTransactionAmount:
				prevMonthTransactions.data.length > 0
					? prevMonthTransactions.data.reduce(
							(sum, t) => sum + (t.type === "income" ? t.amount : -t.amount),
							0,
						) / prevMonthTransactions.monthCount
					: 0,
			transactionCount: monthTransactions.length,
		};
	}, [monthTransactions]);

	const alerts = useMemo(() => {
		const alerts = [];

		analytics.categoryBreakdown.forEach((cat) => {
			if (cat.percentage > 30) {
				alerts.push({
					type: "warning",
					message: `${cat.category} spending is ${cat.percentage.toFixed(
						0,
					)}% of your total expenses`,
					category: cat.category,
				});
			}
		});

		// Check for negative balance
		if (data?.totalBalance < 0) {
			alerts.push({
				type: "warning",
				message: "Your balance is negative. Consider reviewing your expenses.",
			});
		}

		// Check for good savings rate
		if (analytics.netSavings > 0 && analytics.totalIncome > 0) {
			const savingsRate = (analytics.netSavings / analytics.totalIncome) * 100;
			if (savingsRate >= 20) {
				alerts.push({
					type: "success",
					message: `Excellent! You're saving ${savingsRate.toFixed(
						0,
					)}% of your income.`,
				});
			}
		}

		if (
			analytics.totalExpenses > analytics.totalIncome &&
			analytics.totalIncome > 0
		) {
			alerts.push({
				type: "warning",
				message: "Your expenses exceed your income this month.",
			});
		}

		return alerts;
	}, [analytics, data?.totalBalance]);

	const suggestions = useMemo(() => {
		const suggestions = [];

		const topCategory = analytics.categoryBreakdown[0];
		if (topCategory && topCategory.percentage > 35) {
			suggestions.push(
				`Consider reducing ${topCategory.category} expenses by 10-15% to improve your savings.`,
			);
		}

		if (analytics.totalIncome > 0) {
			const savingsRate = (analytics.netSavings / analytics.totalIncome) * 100;
			if (savingsRate < 10 && savingsRate > 0) {
				suggestions.push(
					"Try to save at least 20% of your income for a healthier financial future.",
				);
			}
		}

		if (analytics.transactionCount < 5 && analytics.totalIncome > 0) {
			suggestions.push(
				"Track more daily expenses to get better insights into your spending habits.",
			);
		}

		return suggestions;
	}, [analytics]);

	const monthlyBreakdown = useMemo(() => {
		const monthlyMap = new Map();

		transactions.forEach((txn) => {
			if (!txn?.date) return;
			const date =
				typeof txn?.date === "string"
					? parseISO(txn?.date)
					: new Date(txn?.date);

			if (isNaN(date.getTime())) return;

			const monthKey = format(date, "MMM yyyy");

			const current = monthlyMap.get(monthKey) || {
				income: 0,
				expense: 0,
			};

			if (txn.type === "income") {
				current.income += txn.amount;
			} else {
				current.expense += txn.amount;
			}

			monthlyMap.set(monthKey, current);
		});

		return Array.from(monthlyMap.entries())
			.map(([month, data]) => ({
				month,
				income: data.income,
				expense: data.expense,
				savings: data.income - data.expense,
			}))
			.sort((a, b) => new Date(`1 ${b.month}`) - new Date(`1 ${a.month}`));
	}, [transactions]);

	return {
		transactions,
		analytics,
		alerts,
		suggestions,
		monthTransactions,
		monthlyBreakdown,
	};
};
