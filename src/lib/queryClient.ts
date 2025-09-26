import { type PropertySearchFilters } from "@/types/property";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			staleTime: 5 * 60 * 1000, // 5 minutes
			gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
			refetchOnWindowFocus: false,
			refetchOnReconnect: true,
		},
		mutations: {
			retry: 1,
		},
	},
});

// Query Keys - organized by feature to match your API structure
export const QUERY_KEYS = {
	auth: {
		verify: ["auth", "verify"],
	},
	user: {
		profile: ["user", "profile"],
		allUsers: ["users", "all-users"],
		userById: (id: string) => ["user", "by-id", id],
		favoriteProperties: ["user", "favorite-properties"],
	},
	properties: {
		all: ["properties", "all"],
		byId: (id: string) => ["properties", "by-id", id],
		searchByFilters: (filters: PropertySearchFilters) => [
			"properties",
			"search",
			filters,
		],
		aiSearch: (query: string) => ["properties", "ai-search", query],
	},
	applications: {
		all: ["applications", "all"],
		allByLandlord: (status: string) => [
			"applications",
			"all",
			"landlord",
			status,
		],
		byId: (id: string) => ["applications", "by-id", id],
		checkStatus: (propertyId: string) => [
			"applications",
			"check-status",
			propertyId,
		],
	},
	leases: {
		all: ["leases", "all"],
		allByLandlord: (status: string) => ["leases", "all", "landlord", status],
		byId: (id: string) => ["leases", "by-id", id],
	},
	payments: {
		byLeaseId: (leaseId: string, limit: number, userId?: string) =>
			userId
				? ["payments", "lease", leaseId, limit, "user", userId]
				: ["payments", "lease", leaseId, limit],
		byId: (id: string, userId?: string) =>
			userId
				? ["payments", "by-id", id, "user", userId]
				: ["payments", "by-id", id],
		history: (status: string, userId?: string) =>
			userId
				? ["payments", "history", status, "user", userId]
				: ["payments", "history", status],
	},
	chat: {
		conversations: ["chat", "conversations"],
		messages: (conversationId: string) => ["chat", "messages", conversationId],
		sendMessage: (conversationId: string) => [
			"chat",
			"send-message",
			conversationId,
		],
		unreadCount: ["chat", "unread-count"],
	},
	stats: {
		admin: {
			overview: ["stats", "admin", "overview"],
			users: ["stats", "admin", "users"],
		},
		landlord: {
			overview: ["stats", "landlord", "overview"],
			financials: ["stats", "landlord", "financials"],
			totalPayments: ["stats", "landlord", "total-payments"],
		},
		tenant: {
			overview: ["stats", "tenant", "overview"],
			payments: ["stats", "tenant", "payments"],
		},
		propertyDataForHome: (type: string) => [
			"stats",
			"property",
			"data-for-home",
			type,
		],
	},
} as const;
