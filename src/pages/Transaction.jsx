import React, { useEffect, useMemo, useState } from "react";
import {
	Wallet,
	Utensils,
	BringToFront,
	FireExtinguisher,
	ReceiptIndianRupee,
	ShoppingCart,
	Search as SearchIcon,
	ChevronsDown,
	ChevronDown,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useExpenseAnalytics } from "@/hooks/useExpenseAnalytics";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { Tv } from "lucide-react";
import { Plus } from "lucide-react";
import { Book } from "lucide-react";
import { PiggyBank } from "lucide-react";
import { Banknote } from "lucide-react";
import { HandCoins } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import AddTransactionForm from "@/components/AddTransactionForm";
import { deleteExpense, deleteIncome } from "@/lib/api";
import useAppMutation from "@/hooks/useAppMutation";
import ExportDialog from "@/components/ExportDialog";

const CATEGORIES = [
	"All",
	"Food",
	"Bills",
	"Travel",
	"Shopping",
	"Entertainment",
	"Healthcare",
	"Education",
	"Income",
	"Salary",
	"Freelance",
	"Other",
];

const Icon = ({ name, className = "w-5 h-5 text-gray-700" }) => {
	switch (name) {
		case "food":
			return <Utensils className={className} />;
		case "bills":
			return <ReceiptIndianRupee className={className} />;
		case "travel":
			return <Car className={className} />;
		case "shopping":
			return <ShoppingCart className={className} />;
		case "entertainment":
			return <Tv className={className} />;
		case "healthcare":
			return <Plus className={className} />;
		case "education":
			return <Book className={className} />;
		case "income":
			return <PiggyBank className={className} />;
		case "salary":
			return <Banknote className={className} />;
		case "freelance":
			return <HandCoins className={className} />;
		default:
			return <BringToFront className={className} />;
	}
};

export default function Transaction() {
	const { data } = useSelector((state) => state.dashboard);
	const { transactions } = useExpenseAnalytics();
	const { user } = useSelector((state) => state.auth);
	const [isOpen, setIsOpen] = useState(false);
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [filterCategory, setFilterCategory] = useState("all");
	const [minAmount, setMinAmount] = useState("");
	const [maxAmount, setMaxAmount] = useState("");
	const [sortBy, setSortBy] = useState("newest");
	const [myTransaction, setMyTransaction] = useState(transactions);
	console.log(myTransaction);
	const handleDelete = (id) => {};

	const resetFilters = () => {
		setSearch("");
		setFilterCategory("all");
		setMinAmount("");
		setMaxAmount("");
		setSortBy("newest");
	};

	useEffect(() => {
		setMyTransaction(transactions);
	}, [transactions]);

	const visibleTransactions = useMemo(() => {
		let list = [...myTransaction];

		if (search.trim()) {
			const q = search.trim().toLowerCase();
			list = list.filter((tx) => {
				return (
					tx?.description?.toLowerCase().includes(q) ||
					tx?.category?.toLowerCase().includes(q) ||
					tx?.source?.toLowerCase().includes(q) ||
					String(tx._id)?.includes(q) ||
					String(tx.amount)?.includes(q)
				);
			});
		}

		if (filterCategory && filterCategory.toLowerCase() !== "all") {
			list = list.filter(
				(tx) =>
					tx?.category?.toLowerCase() === filterCategory?.toLowerCase() ||
					tx?.source?.toLowerCase() === filterCategory?.toLowerCase()
			);
		}

		const min = minAmount === "" ? null : Number(minAmount);
		const max = maxAmount === "" ? null : Number(maxAmount);
		if (min !== null) {
			list = list.filter((tx) => tx.amount >= min);
		}
		if (max !== null) {
			list = list.filter((tx) => tx.amount <= max);
		}

		switch (sortBy) {
			case "newest":
				list.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);
				break;
			case "oldest":
				list.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
				);
				break;
			case "amountDesc":
				list.sort((a, b) => b.amount - a.amount);
				break;
			case "amountAsc":
				list.sort((a, b) => a.amount - b.amount);
				break;
		}

		return list;
	}, [myTransaction, search, filterCategory, minAmount, maxAmount, sortBy]);

	const { mutate: deleteExpenseTransaction } = useAppMutation({
		mutationFn: deleteExpense,
		invalidateQueries: ["dashboard", user._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const { mutate: deleteIncomeTransaction } = useAppMutation({
		mutationFn: deleteIncome,
		invalidateQueries: ["dashboard", user._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const handleDeleteTransaction = async (id, type) => {
		if (type === "expense") {
			deleteExpenseTransaction(id);
		} else deleteIncomeTransaction(id);
	};

	return (
		<div className="h-screen w-full bg-gray-50">
			<header className="max-w-7xl w-full bg-white border-b border-gray-200 mx-auto rounded-b-2xl">
				<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
					<div>
						<h1 className="text-2xl font-semibold text-gray-800">
							Transactions
						</h1>
						<p className="text-sm text-gray-500">
							Total: {transactions.length}
						</p>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<Button
							onClick={() => setMyTransaction(data.incomes)}
							variant="secondary"
						>
							Incomes
						</Button>
						<Button
							onClick={() => setMyTransaction(data.expenses)}
							variant="secondary"
						>
							Expenses
						</Button>
						<Button
							onClick={() => {
								console.log(data.last30DaysExpenses.transactions);
								setMyTransaction(data.last30DaysExpenses.transactions);
							}}
							variant="secondary"
						>
							Last 30 days Expenses
						</Button>
						<Button
							onClick={() =>
								setMyTransaction(data.last60DaysIncome.transactiion)
							}
							variant="secondary"
						>
							Last 60 days Incomes
						</Button>
						<Button
							onClick={() => {
								console.log(data.recentTransaction);
								setMyTransaction(data.recentTransaction);
							}}
							variant="secondary"
						>
							Recent Transactions
						</Button>
						<Button
							onClick={() => {
								console.log(transactions);
								setMyTransaction(transactions);
							}}
							variant="secondary"
						>
							Default
						</Button>
					</div>
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-2 py-1">
							<SearchIcon className="w-4 h-4 text-gray-400" />
							<input
								placeholder="Search transactions..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="text-sm outline-none"
							/>
						</div>

						<ExportDialog />
						<AddTransactionForm variant="outline" />
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-72px)]">
				<div className="h-full bg-blue-50/40 rounded-2xl border border-blue-200 shadow-sm overflow-hidden flex flex-col">
					<div className="px-6 py-3 border-b border-gray-200">
						<button
							type="button"
							onClick={() => setIsFiltersOpen((s) => !s)}
							className="w-full flex items-center justify-between gap-3 bg-white/60 px-4 py-3 rounded-lg border border-gray-100"
							aria-expanded={isFiltersOpen}
						>
							<div className="flex items-center gap-3">
								<ChevronsDown className="w-5 h-5 text-gray-600" />
								<span className="font-medium text-gray-800">Filters</span>
								<span className="text-sm text-gray-500"></span>
							</div>
							<div>
								<ChevronDown
									className={`w-5 h-5 text-gray-500 transform ${
										isFiltersOpen ? "rotate-180" : ""
									}`}
								/>
							</div>
						</button>

						{isFiltersOpen && (
							<div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
								<div className="md:col-span-3">
									<label className="block text-xs text-gray-600 mb-1">
										Category
									</label>
									<Select
										value={filterCategory}
										defaultValue="all"
										onValueChange={(e) => setFilterCategory(e)}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue
												className="placeholder:text-black"
												placeholder="Select a fruit"
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{CATEGORIES.map((c) => (
													<SelectItem key={c} value={c.toLowerCase()}>
														{c}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div className="md:col-span-3">
									<label className="block text-xs text-gray-600 mb-1">
										Min Amount
									</label>
									<Input
										value={minAmount}
										onChange={(e) => setMinAmount(e.target.value)}
										placeholder="e.g., -100"
										type="number"
									/>
								</div>

								<div className="md:col-span-3">
									<label className="block text-xs text-gray-600 mb-1">
										Max Amount
									</label>
									<Input
										value={maxAmount}
										onChange={(e) => setMaxAmount(e.target.value)}
										placeholder="e.g., 5000"
										type="number"
									/>
								</div>

								<div className="md:col-span-3">
									<label className="block text-xs text-gray-600 mb-1">
										Sort
									</label>
									<Select value={sortBy} onValueChange={(e) => setSortBy(e)}>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a fruit" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="newest">Newest</SelectItem>
												<SelectItem value="oldest">Oldest</SelectItem>
												<SelectItem value="amountDesc">
													Highest Amount
												</SelectItem>
												<SelectItem value="amountAsc">Lowest Amount</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								<div className="md:col-span-12 flex gap-3 justify-end">
									<Button type="button" variant="ghost" onClick={resetFilters}>
										Reset Filters
									</Button>
								</div>
							</div>
						)}
					</div>

					<div className="px-6 py-3 border-b border-gray-200 hidden md:flex items-center text-sm text-gray-600">
						<div className="w-1/2">Description</div>
						<div className="w-1/4 text-center">Category / Source</div>
						<div className="w-1/4 text-right">Amount</div>
					</div>

					<div className="flex-1 overflow-auto">
						<ul className="divide-y divide-gray-200">
							{visibleTransactions.map((tx) => (
								<li key={tx._id} className="px-6 py-4">
									<div className="md:flex md:items-center md:gap-4">
										<div className="md:w-1/2 flex items-center gap-4">
											<div className="w-12 h-12 flex items-center justify-center bg-white rounded-xl border">
												<Icon name={tx.category || tx.source} />
											</div>
											<div>
												<div className="text-sm font-medium text-gray-800">
													{tx.description}
												</div>
												<div className="text-xs text-gray-400">
													ID #{tx._id}
												</div>
											</div>
										</div>

										<div className="md:w-1/4 text-sm text-center text-gray-700 mt-3 md:mt-0">
											{tx.category || tx.source}
										</div>

										<div className="md:w-1/4 text-right mt-3 md:mt-0">
											<div
												className={`text-sm font-semibold ${
													tx.type === "expense"
														? "text-red-900"
														: "text-green-600"
												}`}
											>
												{tx.amount?.toLocaleString("en-IN", {
													maximumFractionDigits: 2,
													style: "currency",
													currency: "INR",
												})}
											</div>
											<div className="mt-2">
												<button
													onClick={() =>
														handleDeleteTransaction(tx._id, tx.type)
													}
													className="text-xs text-red-500 hover:underline cursor-pointer"
												>
													Delete
												</button>
											</div>
										</div>
									</div>
								</li>
							))}

							{visibleTransactions.length === 0 && (
								<li className="px-6 py-8 text-center text-gray-500">
									No matching results found.
								</li>
							)}
						</ul>
					</div>

					<div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
						<div className="text-sm text-gray-500">
							Showing {visibleTransactions.length} items
						</div>
						<div className="text-sm text-gray-500">
							Total: {transactions.length}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
