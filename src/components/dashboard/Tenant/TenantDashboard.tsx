import SidebarLayout from "../../layouts/SidebarLayout";
import { useAuth } from "@/hooks/useAuth";
import { TENANT_DASHBOARD_LIST } from "@/utils/Constants";
import { useState } from "react";

const TenantDashboard = () => {
	const { user } = useAuth();
	const [activeTab, setActiveTab] = useState<string>(
		TENANT_DASHBOARD_LIST[0].id
	);
	const handleTabChange = (tab: string) => {
		setActiveTab(tab);
	};
	return (
		<SidebarLayout
			menuItems={TENANT_DASHBOARD_LIST}
			user={user}
			activeView={activeTab}
			handleMenuClick={handleTabChange}
		>
			{TENANT_DASHBOARD_LIST.find((item) => item.id === activeTab)?.component}
		</SidebarLayout>
	);
};
export default TenantDashboard;
