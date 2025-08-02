import type { PropertySearchRequest } from "@/types/property";
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
		allUsers: ["user", "all"],
		userById: (id: string) => ["user", "by-id", id],
	},
	properties: {
		all: ["properties", "all"],
		byId: (id: string) => ["properties", "by-id", id],
		searchByFilters: (filters: PropertySearchRequest) => ["properties", "search", filters],
		aiSearch: (query: string) => ["properties", "ai-search", query],
	},
	applications: {
		all: ["applications", "all"],
		byId: (id: string) => ["applications", "by-id", id],
	},
	leases: {
		all: ["leases", "all"],
		byId: (id: string) => ["leases", "by-id", id],
	},
	payments: {
		byLeaseId: (leaseId: string) => ["payments", "lease", leaseId],
		byId: (id: string) => ["payments", "by-id", id],
		history: ["payments", "history"],
	},
	chat: {
		conversations: ["chat", "conversations"],
		messages: (conversationId: string) => ["chat", "messages", conversationId],
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
		},
		tenant: {
			overview: ["stats", "tenant", "overview"],
			payments: ["stats", "tenant", "payments"],
		},
	},
} as const; 
