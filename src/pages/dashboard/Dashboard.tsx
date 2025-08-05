import { useAuth } from "@/hooks/useAuth";
import AdminDashboard from "../../components/dashboard/Admin/AdminDashboard";
import TenantDashboard from "../../components/dashboard/Tenant/TenantDashboard";
import LandloardDashboard from "../../components/dashboard/Landlord/LandloardDashboard";

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
