import { QueryClient } from "@tanstack/react-query";
import AppProvider from "./components/AppProvider";
import AppContent from "./components/AppContent";

const queryClient = new QueryClient();

function App() {
  
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
}

export default App;
