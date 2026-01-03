import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Main, Auth, Admin, NotFound, Transaction, Analytics } from "@/pages";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import ProtectedRoutes from "./components/ProtectedRoutes";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Toaster />
				<Navbar />
				<Routes>
					<Route path="/auth/:reason" element={<Auth />} />
					<Route
						path="/"
						element={
							<ProtectedRoutes>
								<Main />
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
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
