import { redirect } from "react-router";
import { toast } from "sonner";
import api from "./axiosBase";

export async function createUser(credentials) {
	try {
		const response = await api.post(
			`/${import.meta.env.VITE_USER_URL}/register`,
			credentials
		);

		if (response?.status !== 201) {
			throw new Error(response?.data?.message || "Failed to create a account.");
		}
		console.log(response.data);
		return response?.data;
	} catch (error) {
		throw new Error(error?.message || "Something went wrong.");
	}
}

export async function loginUser(credentials) {
	try {
		const response = await api.post(
			`/${import.meta.env.VITE_USER_URL}/login`,
			credentials
		);

		if (response?.status !== 200) {
			throw new Error(
				response?.data?.message || "Failed to login into the account."
			);
		}

		return response?.data;
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function fetchDashboardData() {
	try {
		const response = await api.get(`/${import.meta.env.VITE_DASHBOARD_URL}/`);
		console.log(response.status);
		return response?.data;
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function addIncomeTransaction(credentials) {
	try {
		const response = await api.post(
			`/${import.meta.env.VITE_INCOME_URL}/add`,
			credentials
		);

		return response?.data.income;
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function addExpenseTransaction(credentials) {
	try {
		const response = await api.post(
			`/${import.meta.env.VITE_EXPENSE_URL}/add`,
			credentials
		);

		return response?.data.income;
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function deleteIncome(id) {
	try {
		await api.delete(`/${import.meta.env.VITE_INCOME_URL}/${id}`);
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function deleteExpense(id) {
	try {
		await api.delete(`/${import.meta.env.VITE_EXPENSE_URL}/${id}`);
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function downloadIncomeExcel() {
	try {
		const response = await api.get(
			`/${import.meta.env.VITE_INCOME_URL}/downloadexcel`,
			{
				responseType: "blob",
			}
		);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "income.xlsx");
		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function downloadTransactionExcel() {
	try {
		console.log("Exporting dashboard");
		const response = await api.get(
			`/${import.meta.env.VITE_DASHBOARD_URL}/downloadexcel`,
			{
				responseType: "blob",
			}
		);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "transaction.xlsx");
		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}

export async function downloadExpenseExcel() {
	try {
		const response = await api.get(
			`/${import.meta.env.VITE_EXPENSE_URL}/downloadexcel`,
			{
				responseType: "blob",
			}
		);
		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "expense.xlsx");
		document.body.appendChild(link);
		link.click();
		link.remove();
	} catch (error) {
		throw new Error(
			error?.response?.data?.message ||
				error?.data?.message ||
				error?.message ||
				"Something went wrong."
		);
	}
}
