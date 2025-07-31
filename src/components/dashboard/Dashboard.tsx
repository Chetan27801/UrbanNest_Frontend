import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "./Admin/AdminDashboard";
import TenantDashboard from "./Tenant/TenantDashboard";
import LandloardDashboard from "./Landlord/LandloardDashboard";

const Dashboard = () => {
	const { user } = useAuth();
	return (
		<div>
			{user?.role === "admin" && <AdminDashboard />}
			{user?.role === "tenant" && <TenantDashboard />}
			{user?.role === "landlord" && <LandloardDashboard />}
		</div>
	);
};

export default Dashboard;
