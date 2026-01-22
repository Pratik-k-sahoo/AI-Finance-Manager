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
import {
	addExpenseTransaction,
	addIncomeTransaction,
	updateExpenseTransaction,
	updateIncomeTransaction,
} from "@/lib/api";
import { useSelector } from "react-redux";
import { Pencil } from "lucide-react";
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

const UpdateTransactionForm = ({
	variant = "default",
	details = {},
	id = "",
}) => {
	const { user } = useSelector((state) => state.auth);
	const [type, setType] = useState(details?.type);
	const [open, setOpen] = useState(false);
	const form = useForm({
		defaultValues: {
			type: details?.type,
			amount: details?.amount,
			category: details?.category || details?.source,
			description: details?.description,
			date: new Date(
				new Date(details?.date).getTime() -
					new Date(details?.date).getTimezoneOffset() * 60 * 1000,
			)
				.toISOString()
				.slice(0, 16),
		},
	});
	const { reset } = form;

	const { mutate: updateIncome } = useAppMutation({
		mutationFn: updateIncomeTransaction,
		invalidateQueries: ["dashboard", user?._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const { mutate: updateExpense } = useAppMutation({
		mutationFn: updateExpenseTransaction,
		invalidateQueries: ["dashboard", user?._id],
		onError: (error) => {
			console.error(error);
		},
	});

	const handleUpdateTransaction = async (formData) => {
		try {
			const payload = {
				...formData,
				amount: Number(formData.amount),
				date: new Date(formData.date).toISOString(),
			};
			if (type === "expense") {
				updateExpense({payload, id: details._id});
			} else {
				const credentials = {
					source: payload.category,
					amount: payload.amount,
					date: payload.date,
					description: payload.description,
				};
				updateIncome({credentials, id: details._id});
			}
			reset();
			setType(details?.type);
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant={variant}>
					<Pencil className="text-primary-foreground w-8 h-8" />
				</Button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-[425px] max-h-3/5 overflow-auto">
				<form
					id="transaction-form"
					onSubmit={form.handleSubmit(handleUpdateTransaction)}
				>
					<DialogHeader>
						<DialogTitle>Update Your Transaction</DialogTitle>
						<DialogDescription>
							Update your transaction for minor errors.
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

export default UpdateTransactionForm;
