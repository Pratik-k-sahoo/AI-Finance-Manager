import { createSelector } from "@reduxjs/toolkit";

export const selectDashboardRaw = (state) => state.dashboard.data;

export const selectTotals = createSelector([selectDashboardRaw], (data) => {
	if (!data) {
		return {
			totalIncome: 0,
			totalExpense: 0,
			balance: 0,
		};
	}

	const totalIncome =
		data.income?.reduce((sum, row) => sum + row.amount, 0) || 0;

	const totalExpense =
		data.expense?.reduce((sum, row) => sum + row.amount, 0) || 0;

	return {
		totalIncome,
		totalExpense,
		balance: totalIncome - totalExpense,
	};
});
