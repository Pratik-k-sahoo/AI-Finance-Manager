import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const AppProvider = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<TooltipProvider>
					<Toaster />
					{children}
				</TooltipProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
};

export default AppProvider;
