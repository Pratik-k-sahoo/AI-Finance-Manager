import { Admin, Analytics, Auth, Main, NotFound, Transaction } from "@/pages";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import useGetQuery from "@/hooks/useGetQuery";
import { fetchDashboardData } from "@/lib/api";
import { setDashboardData } from "@/redux/slices/dashboardSlice";

const AppContent = () => {
	const [currDate, setCurrDate] = useState(
		new Date().toLocaleString("default", { month: "long" }) +
			" " +
			new Date().getFullYear()
	);
	const dispatch = useDispatch();
	const {
		isPending: fetchDashboardDataPending,
		isError: isFetchDashboardDataError,
		data: dashboardData,
		error: fetchDashboardDataError,
		isSuccess,
	} = useGetQuery({
		queryKey: ["dashboard"],
		queryFn: fetchDashboardData,
	});

	useEffect(() => {
		if (!isSuccess && !dashboardData?.data) return;
		dispatch(setDashboardData(dashboardData?.data));
	}, [isSuccess, dashboardData, dispatch]);
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/auth/:reason" element={<Auth />} />
				<Route
					path="/"
					element={
						<ProtectedRoutes>
							<Main currDate={currDate} setCurrDate={setCurrDate} />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/transaction"
					element={
						<ProtectedRoutes>
							<Transaction />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/analytics"
					element={
						<ProtectedRoutes>
							<Analytics />
						</ProtectedRoutes>
					}
				/>
				<Route
					path="/admin"
					element={
						<ProtectedRoutes>
							<Admin />
						</ProtectedRoutes>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default AppContent;
