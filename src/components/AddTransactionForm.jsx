import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import useAppMutation from "@/hooks/useAppMutation";
import { addExpenseTransaction, addIncomeTransaction } from "@/lib/api";
import { useSelector } from "react-redux";
const expense_categories = [
	{
		value: "food",
		name: "Food",
	},
	{
		value: "bills",
		name: "Bills",
	},
	{
		value: "travel",
		name: "Travel",
	},
	{
		value: "shopping",
		name: "shopping",
	},
	{
		value: "entertainment",
		name: "entertainment",
	},
	{
		value: "healthcare",
		name: "healthcare",
	},
	{
		value: "education",
		name: "education",
	},
	{
		value: "others",
		name: "Others",
	},
];

const income_categories = [
	{
		value: "salary",
		name: "Salary",
	},
	{
		value: "freelance",
		name: "Freelance",
	},
	{
		value: "others",
		name: "Others",
	},
];

const AddTransactionForm = ({ variant = "default" }) => {
	const { user } = useSelector((state) => state.auth);
	const [type, setType] = useState("expense");
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {
			type: "expense",
			amount: "",
			category: "others",
			description: "",
			date: new Date().toISOString().split("T")[0],
		},
	});
	const { reset } = form;

	const { mutate: addIncome } = useAppMutation({
		mutationFn: addIncomeTransaction,
		invalidateQueries: ["dashboard", user?._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const { mutate: addExpense } = useAppMutation({
		mutationFn: addExpenseTransaction,
		invalidateQueries: ["dashboard", user?._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const handleAddTransaction = async (formData) => {
		try {
			const payload = {
				...formData,
				amount: Number(formData.amount),
				date: new Date(formData.date).toISOString(),
			};
			if (type === "expense") {
				addExpense(payload);
			} else {
				const credentials = {
					source: payload.category,
					amount: payload.amount,
					date: payload.date,
					description: payload.description,
				};
				addIncome(credentials);
			}
			reset();
			setType("expense");
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant={variant}>
					<Plus />
					<h4>Add Transaction</h4>
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] max-h-3/5 overflow-auto">
				<form
					id="transaction-form"
					onSubmit={form.handleSubmit(handleAddTransaction)}
				>
					<DialogHeader>
						<DialogTitle>Add Your Transaction</DialogTitle>
						<DialogDescription>
							Add your transaction for one place analysis.
						</DialogDescription>
					</DialogHeader>

					<FieldGroup>
						<Controller
							name="type"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className="text-lg" htmlFor="type">
										Type:
									</FieldLabel>
									<Select
										value={field.value}
										onValueChange={(value) => {
											field.onChange(value);
											setType(value);
										}}
									>
										<SelectTrigger className="h-full w-48 capitalize">
											<SelectValue placeholder="Select Category" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												<SelectItem value="expense" className="capitalize">
													Expense
												</SelectItem>
												<SelectItem value="income" className="capitalize">
													Income
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</Field>
							)}
						/>
						<Controller
							name="amount"
							control={form.control}
							rules={{
								required: "Amount is required",
								validate: (value) =>
									!isNaN(Number(value)) || "Only numbers are allowed",
							}}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className="text-lg" htmlFor="amount">
										Amount:
									</FieldLabel>
									<Input
										{...field}
										id="amount"
										type="text"
										inputMode="decimal"
										placeholder="Enter amount"
										aria-invalid={fieldState.invalid}
										required
										onChange={(e) => {
											const value = e.target.value;
											if (/^\d*\.?\d*$/.test(value)) {
												field.onChange(value);
											}
										}}
									/>
									{fieldState.error && (
										<p className="text-xs text-red-500 mt-1">
											{fieldState.error.message}
										</p>
									)}
								</Field>
							)}
						/>
						<Controller
							name="category"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className="text-lg" htmlFor="category">
										Category:
									</FieldLabel>
									{type === "expense" ? (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="h-full w-48 capitalize">
												<SelectValue placeholder="Select Category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{expense_categories.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
															className="capitalize"
														>
															{item.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									) : (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger className="h-full w-48 capitalize">
												<SelectValue placeholder="Select Category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{income_categories.map((item) => (
														<SelectItem
															key={item.value}
															value={item.value}
															className="capitalize"
														>
															{item.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								</Field>
							)}
						/>
						<Controller
							name="description"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className="text-lg" htmlFor="description">
										Description:
									</FieldLabel>
									<Input
										{...field}
										type="text"
										className="w-full"
										required
										id="description"
										aria-invalid={fieldState.invalid}
										placeholder="Enter Your Description"
									/>
								</Field>
							)}
						/>
						<Controller
							name="date"
							control={form.control}
							rules={{ required: true }}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel className="text-lg" htmlFor="date">
										Date:
									</FieldLabel>
									<Input
										{...field}
										type="datetime-local"
										className="w-full"
										id="date"
										aria-invalid={fieldState.invalid}
										placeholder="Enter Your Date"
									/>
								</Field>
							)}
						/>
					</FieldGroup>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="outline"
								onClick={() => {
									reset();
									setType("expense");
								}}
							>
								Cancel
							</Button>
						</DialogClose>
						<Button
							type="submit"
							className="border px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium cursor-pointer"
						>
							Add Transaction
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddTransactionForm;
