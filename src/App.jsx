import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import {Main, Auth, Admin, NotFound, Transaction, Analytics} from "@/pages";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
        <Toaster />
        <Navbar />
				<Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Main />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
