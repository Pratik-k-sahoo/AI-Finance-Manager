import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState: {
		data: [],
		month: new Date().toLocaleString("default", { month: "long" }),
	},
	reducers: {
		setDashboardData(state, action) {
			state.data = action.payload;
		},
		setMonth(state, action) {
			state.month = action.payload;
		},
		resetDashboard(state) {
			state.data = null;
			state.month = null;
		},
	},
});

export const { setDashboardData, setMonth, resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
