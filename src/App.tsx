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
import "leaflet/dist/leaflet.css";
import PropertyDetail from "./pages/private/PropertyDetail";

function App() {
	return (
		<Router>
			<Routes>
				{/* Auth Routes */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />

				<Route element={<NavbarLayout />}>
					<Route element={<FooterLayout />}>
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="/home" element={<HomePage />} />
						<Route path="/support" element={<Support />} />
						<Route path="/deals" element={<DealsPage />} />
						<Route path="/search" element={<SearchPage />} />
					</Route>
				</Route>

				<Route path="/property/:id" element={<PropertyDetail />} />

				<Route path="/dashboard" element={<Dashboard />} />
			</Routes>
		</Router>
	);
}

export default App;
