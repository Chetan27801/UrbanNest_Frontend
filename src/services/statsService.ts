import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/apiAxios";
import API_ENDPOINTS from "@/utils/apiConstant";
import { QUERY_KEYS } from "@/lib/queryClient";

// Types
interface AdminStatsOverview {
	totalUsers: number;
	totalProperties: number;
	totalLeases: number;
	totalPayments: number;
	totalApplications: number;
}

interface TenantStatsOverview {
	currentActiveLeases: number;
	upcomingPayments: number;
	recentApplications: number;
}

interface LandlordStatsOverview {
	totalProperties: number;
	occupiedProperties: number;
	vacantProperties: number;
	totalPendingApplications: number;
	totalPendingLeases: number;
	totalPendingPayments: number;
}

interface OverduePayment {
	_id: string;
	amount: number;
	dueDate: string;
	tenant: string;
	property: string;
}

interface LandlordFinancials {
	totalRevenue: number;
	totalRevenueThisMonth: number;
	totalRevenueThisYear: number;
	listOfOverduePayments: OverduePayment[];
}

interface TotalPayments {
	totalPayments: number;
	totalPaymentThisMonth: number;
}

// API Functions
const statsApiFunctions = {
	getAdminOverview: async (): Promise<AdminStatsOverview> => {
		const response = await api.get(API_ENDPOINTS.STATS.ADMIN.OVERVIEW);
		return response.data.data;
	},

	getTenantOverview: async (): Promise<TenantStatsOverview> => {
		const response = await api.get(API_ENDPOINTS.STATS.TENANT.OVERVIEW);
		return response.data.data;
	},

	getLandlordOverview: async (): Promise<LandlordStatsOverview> => {
		const response = await api.get(API_ENDPOINTS.STATS.LANDLORD.OVERVIEW);
		return response.data.data;
	},

	getLandlordFinancials: async (): Promise<LandlordFinancials> => {
		const response = await api.get(API_ENDPOINTS.STATS.LANDLORD.FINANCIALS);
		return response.data.data;
	},

	getTotalPayments: async (): Promise<TotalPayments> => {
		const response = await api.get(API_ENDPOINTS.STATS.LANDLORD.TOTAL_PAYMENTS);
		return response.data.data;
	},
};

// React Query Hooks
export const useGetAdminOverview = () => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.admin.overview,
		queryFn: statsApiFunctions.getAdminOverview,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

export const useGetTenantOverview = () => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.tenant.overview,
		queryFn: statsApiFunctions.getTenantOverview,
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetLandlordOverview = () => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.landlord.overview,
		queryFn: statsApiFunctions.getLandlordOverview,
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetLandlordFinancials = () => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.landlord.financials,
		queryFn: statsApiFunctions.getLandlordFinancials,
		staleTime: 1000 * 60 * 5,
	});
};

export const useGetTotalPayments = () => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.landlord.totalPayments,
		queryFn: statsApiFunctions.getTotalPayments,
		staleTime: 1000 * 60 * 5,
	});
};

// Export types for use in components
export type {
	AdminStatsOverview,
	TenantStatsOverview,
	LandlordStatsOverview,
	LandlordFinancials,
	TotalPayments,
};
