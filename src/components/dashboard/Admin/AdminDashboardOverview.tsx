import { useGetAdminOverview } from "@/services/statsService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NormalLoader } from "@/components/common/Loader";
import {
	Users,
	Home,
	FileText,
	DollarSign,
	ClipboardList,
	TrendingUp,
	Activity,
} from "lucide-react";

const AdminDashboardOverview = () => {
	const { data: stats, isLoading, error } = useGetAdminOverview();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-full min-h-[400px]">
				<NormalLoader />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-full min-h-[400px]">
				<p className="text-red-500">Error loading dashboard statistics</p>
			</div>
		);
	}

	const statsCards = [
		{
			title: "Total Users",
			value: stats?.totalUsers || 0,
			icon: Users,
			color: "text-blue-600",
			bgColor: "bg-blue-50",
			description: "Registered users on the platform",
		},
		{
			title: "Total Properties",
			value: stats?.totalProperties || 0,
			icon: Home,
			color: "text-green-600",
			bgColor: "bg-green-50",
			description: "Properties listed on the platform",
		},
		{
			title: "Active Leases",
			value: stats?.totalLeases || 0,
			icon: FileText,
			color: "text-purple-600",
			bgColor: "bg-purple-50",
			description: "Currently active lease agreements",
		},
		{
			title: "Total Payments",
			value: stats?.totalPayments || 0,
			icon: DollarSign,
			color: "text-emerald-600",
			bgColor: "bg-emerald-50",
			description: "Payment transactions processed",
		},
		{
			title: "Applications",
			value: stats?.totalApplications || 0,
			icon: ClipboardList,
			color: "text-orange-600",
			bgColor: "bg-orange-50",
			description: "Total rental applications",
		},
		{
			title: "Platform Activity",
			value: "Active",
			icon: Activity,
			color: "text-cyan-600",
			bgColor: "bg-cyan-50",
			description: "System status",
		},
	];

	return (
		<div className="flex flex-col gap-6 w-full p-6 bg-gray-50 min-h-screen">
			{/* Header */}
			<div className="space-y-2">
				<h1 className="text-3xl font-bold text-gray-900">
					Admin Dashboard Overview
				</h1>
				<p className="text-gray-600">
					Monitor and manage your platform's key metrics and statistics
				</p>
			</div>

			{/* Welcome Banner */}
			<Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none shadow-lg">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold mb-2">
								Welcome to UrbanNest Admin
							</h2>
							<p className="text-blue-100">
								Here's a quick overview of your platform's performance
							</p>
						</div>
						<TrendingUp className="h-16 w-16 text-white/80" />
					</div>
				</CardContent>
			</Card>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{statsCards.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<Card
							key={index}
							className="hover:shadow-lg transition-all duration-300 border-l-4 hover:scale-[1.02]"
							style={{
								borderLeftColor:
									stat.color === "text-blue-600"
										? "#2563eb"
										: stat.color === "text-green-600"
										? "#16a34a"
										: stat.color === "text-purple-600"
										? "#9333ea"
										: stat.color === "text-emerald-600"
										? "#059669"
										: stat.color === "text-orange-600"
										? "#ea580c"
										: "#0891b2",
							}}
						>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium text-gray-600">
									{stat.title}
								</CardTitle>
								<div className={`p-2 rounded-lg ${stat.bgColor}`}>
									<Icon className={`h-5 w-5 ${stat.color}`} />
								</div>
							</CardHeader>
							<CardContent>
								<div className="text-3xl font-bold text-gray-900">
									{typeof stat.value === "number"
										? stat.value.toLocaleString()
										: stat.value}
								</div>
								<p className="text-xs text-gray-500 mt-2">{stat.description}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Quick Stats Summary */}
			<Card className="shadow-md">
				<CardHeader>
					<CardTitle className="text-xl font-bold text-gray-900">
						Platform Summary
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="p-4 bg-blue-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-1">User Engagement</p>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-bold text-blue-600">
									{stats?.totalUsers || 0}
								</span>
								<span className="text-sm text-gray-500">total users</span>
							</div>
						</div>
						<div className="p-4 bg-green-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-1">Property Inventory</p>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-bold text-green-600">
									{stats?.totalProperties || 0}
								</span>
								<span className="text-sm text-gray-500">active listings</span>
							</div>
						</div>
						<div className="p-4 bg-purple-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-1">Active Contracts</p>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-bold text-purple-600">
									{stats?.totalLeases || 0}
								</span>
								<span className="text-sm text-gray-500">lease agreements</span>
							</div>
						</div>
						<div className="p-4 bg-orange-50 rounded-lg">
							<p className="text-sm text-gray-600 mb-1">Pending Reviews</p>
							<div className="flex items-baseline gap-2">
								<span className="text-2xl font-bold text-orange-600">
									{stats?.totalApplications || 0}
								</span>
								<span className="text-sm text-gray-500">applications</span>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDashboardOverview;
