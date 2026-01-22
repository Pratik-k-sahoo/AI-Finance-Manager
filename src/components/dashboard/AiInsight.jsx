import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useExpenseAnalytics } from "@/hooks/useExpenseAnalytics";
import { Sparkles, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useSelector } from "react-redux";

export const AiInsight = () => {
	const { month } = useSelector((state) => state.dashboard);
	const { alerts, suggestions } = useExpenseAnalytics(month);
	return (
		<Card className="p-6">
			<div className="flex items-center gap-2 mb-4">
				<Sparkles className="h-5 w-5 text-primary" />
				<h3 className="text-lg font-semibold">AI Insights & Suggestions</h3>
			</div>

			<div className="space-y-3">
				{alerts.map((alert, index) => {
					const Icon =
						alert.type === "warning"
							? AlertTriangle
							: alert.type === "success"
								? CheckCircle2
								: Info;

					const variant =
						alert.type === "warning"
							? "destructive"
							: alert.type === "success"
								? "default"
								: "default";

					return (
						<Alert
							key={index}
							variant={variant}
							className={
								alert.type === "success" ? "border-success bg-success/10" : ""
							}
						>
							<Icon className="h-4 w-4" />
							<AlertDescription className="ml-2">
								{alert.message}
							</AlertDescription>
						</Alert>
					);
				})}

				{suggestions.length > 0 && (
					<div className="mt-4 pt-4 border-t space-y-2">
						<h4 className="font-medium text-sm text-muted-foreground">
							Smart Recommendations
						</h4>
						{suggestions.map((suggestion, index) => (
							<div
								key={index}
								className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10"
							>
								<Sparkles className="h-4 w-4 text-primary mt-0.5 shrink-0" />
								<p className="text-sm">{suggestion}</p>
							</div>
						))}
					</div>
				)}

				{alerts.length === 0 && suggestions.length === 0 && (
					<div className="text-center py-8 text-muted-foreground">
						<Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
						<p>Add more transactions to get personalized insights</p>
					</div>
				)}
			</div>
		</Card>
	);
};
