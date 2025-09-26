import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "./lib/queryClient.ts";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppToast from "./components/common/AppToast";
import { ChatProvider } from "./contexts/ChatContext.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<div>Loading...</div>} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<ChatProvider>
						<App />
						<AppToast />
					</ChatProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	</StrictMode>
);
