import React, {useState} from 'react'
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
import DataBox from '../DataBox';

const BalanceCard = () => {
  const balance = 6000;
  const [currDate, setCurrDate] = useState(
		new Date().toLocaleString("default", { month: "long" }) +
			" " +
			new Date().getFullYear()
	);
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
						</div>
						<div className="text-4xl flex flex-col items-center gap-2">
							<h2 className="text-4xl font-bold tracking-tight flex items-center">
								{balance.toLocaleString("en-IN", {
									maximumFractionDigits: 2,
									style: "currency",
									currency: "INR",
								})}
							</h2>
							<p className="text-sm opacity-80 flex items-center gap-1 justify-center">
								<span>+${balance.toFixed(2)} this month</span>
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
								{balance.toLocaleString("en-IN", {
									maximumFractionDigits: 2,
									style: "currency",
									currency: "INR",
								})}
							</h2>
							<p className="text-sm opacity-80 flex items-center gap-1 justify-center">
								<span>+${balance.toFixed(2)} this month</span>
							</p>
						</div>
					</div>
				</div>
				<DataBox
					heading={"Biggest Expense Amount"}
					mainDetails={balance.toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					})}
          details={`+$${balance.toFixed(2)} this month`}
				/>
				<DataBox
					heading={"Biggest Expense Category"}
					mainDetails={balance.toLocaleString("en-IN", {
						maximumFractionDigits: 2,
						style: "currency",
						currency: "INR",
					})}
					details={`+$${balance.toFixed(2)} this month`}
				/>
				<Select defaultValue={currDate} onValueChange={(e) => console.log(e)}>
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
							<SelectItem value="January 2025">January 2025</SelectItem>
							<SelectItem value="February 2025">February 2025</SelectItem>
							<SelectItem value="March 2025">March 2025</SelectItem>
							<SelectItem value="April 2025">April 2025</SelectItem>
							<SelectItem value="May 2025">May 2025</SelectItem>
							<SelectItem value="June 2025">June 2025</SelectItem>
							<SelectItem value="July 2025">July 2025</SelectItem>
							<SelectItem value="August 2025">August 2025</SelectItem>
							<SelectItem value="September 2025">September 2025</SelectItem>
							<SelectItem value="October 2025">October 2025</SelectItem>
							<SelectItem value="November 2025">November 2025</SelectItem>
							<SelectItem value="December 2025">December 2025</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		</Card>
	);
}

export default BalanceCard