import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import HomePage from "./pages/public/HomePage";
import Dashboard from "./pages/dashboard/Dashboard";
import Support from "./pages/public/Support";
import DealsPage from "./pages/public/DealsPage";
import NavbarLayout from "./components/layouts/NavbarLayout";
import FooterLayout from "./components/layouts/FooterLayout";
import SearchPage from "./pages/public/SearchPage";
import PropertyDetail from "./pages/private/PropertyDetail";
import { useTokenValidator } from "./hooks/useTokenValidator";
import "leaflet/dist/leaflet.css";
import AuthCallbackPage from "./pages/auth/AuthCallbackPage";
import PaymentSuccess from "./pages/private/PaymentSuccess";
import PaymentCancel from "./pages/private/PaymentCancel";

function App() {
	// Automatic token validation
	useTokenValidator();

	return (
		<Router>
			<Routes>
				{/* Auth Routes */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/auth-callback" element={<AuthCallbackPage />} />

				<Route element={<NavbarLayout />}>
					<Route element={<FooterLayout />}>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/support" element={<Support />} />
						<Route path="/deals" element={<DealsPage />} />
						<Route path="/search" element={<SearchPage />} />
						<Route path="/property/:id" element={<PropertyDetail />} />
					</Route>
				</Route>

				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/payment/success" element={<PaymentSuccess />} />
				<Route path="/payment/cancel" element={<PaymentCancel />} />
			</Routes>
		</Router>
	);
}

export default App;
