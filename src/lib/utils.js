import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

const monthMap = {
	January: 0,
	February: 1,
	March: 2,
	April: 3,
	May: 4,
	June: 5,
	July: 6,
	August: 7,
	September: 8,
	October: 9,
	November: 10,
	December: 11,
};

export const parseMonthLabel = (label) => {
	if (!label) return null;

	const [monthName, year] = label.split(" ");
	const month = monthMap[monthName];

	if (month === undefined || !year) return null;

	return {
		month,
		year: Number(year),
	};
};
