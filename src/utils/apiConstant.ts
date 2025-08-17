const API_BASE_URL = import.meta.env.VITE_API_URL;

const API_ENDPOINTS = {
	// Authentication endpoints
	AUTH: {
		REGISTER: `${API_BASE_URL}/auth/register`,
		LOGIN: `${API_BASE_URL}/auth/login`,
		FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
		RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
		VERIFY_EMAIL_SEND: `${API_BASE_URL}/auth/verify-email-send`,
		VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
		GOOGLE_AUTH: `${API_BASE_URL}/auth/google`,
		GOOGLE_CALLBACK: `${API_BASE_URL}/auth/google/callback`,
	},

	// User management endpoints
	USERS: {
		GET_PROFILE: `${API_BASE_URL}/users/profile`,
		UPDATE_PROFILE: `${API_BASE_URL}/users/update-profile`,
		DELETE_PROFILE: `${API_BASE_URL}/users/delete-profile`,
		GET_ALL_USERS: (page: number, limit: number) =>
			`${API_BASE_URL}/users/all-users?page=${page}&limit=${limit}`,
		GET_USER_BY_ID: (id: string) => `${API_BASE_URL}/users/user-by-id/${id}`,
		UPLOAD_AVATAR: `${API_BASE_URL}/users/upload-avatar`,
		GET_AVATAR: `${API_BASE_URL}/users/get-avatar`,
		DELETE_AVATAR: `${API_BASE_URL}/users/delete-avatar`,
	},

	// Property management endpoints
	PROPERTIES: {
		CREATE: `${API_BASE_URL}/properties/create-property`,
		GET_ALL: `${API_BASE_URL}/properties/get-all`,
		GET_BY_ID: (id: string) => `${API_BASE_URL}/properties/get-by-id/${id}`,
		UPDATE: (id: string) => `${API_BASE_URL}/properties/update/${id}`,
		DELETE: (id: string) => `${API_BASE_URL}/properties/delete/${id}`,
		SEARCH: (query: string) => `${API_BASE_URL}/properties/search?${query}`,
		AI_SEARCH: `${API_BASE_URL}/properties/ai-search`,
		UPLOAD_IMAGE: `${API_BASE_URL}/properties/upload/image`,
		UPLOAD_VIDEO: `${API_BASE_URL}/properties/upload/video`,
		UPLOAD_MULTIPLE: `${API_BASE_URL}/properties/upload/multiple`,
	},

	// Application management endpoints
	APPLICATIONS: {
		APPLY: (propertyId: string) =>
			`${API_BASE_URL}/applications/apply/${propertyId}`,
		GET_ALL_APPLICATIONS_BY_LANDLORD: `${API_BASE_URL}/applications/get-all-applications-by-landlord`,
		GET_APPLICATION_BY_ID: (id: string) =>
			`${API_BASE_URL}/applications/get-application/${id}`,
		UPDATE_APPLICATION: (id: string) =>
			`${API_BASE_URL}/applications/update-application/${id}`,
	},

	// Lease management endpoints
	LEASES: {
		CREATE: `${API_BASE_URL}/leases/create-lease`,
		GET_ALL: `${API_BASE_URL}/leases/all-leases`,
		GET_BY_ID: (id: string) => `${API_BASE_URL}/leases/get-lease/${id}`,
		TERMINATE: (id: string) => `${API_BASE_URL}/leases/terminate-lease/${id}`,
	},

	// Payment management endpoints
	PAYMENTS: {
		GET_BY_LEASE_ID: (leaseId: string) =>
			`${API_BASE_URL}/payments/get-payments/lease/${leaseId}`,
		CREATE: `${API_BASE_URL}/payments/create-payment`,
		GET_BY_ID: (id: string) => `${API_BASE_URL}/payments/get-payment/${id}`,
		GET_HISTORY: `${API_BASE_URL}/payments/get-payment-history`,
	},

	// Chat/messaging endpoints
	CHAT: {
		START_CONVERSATION: `${API_BASE_URL}/chat/conversation`,
		GET_CONVERSATIONS: `${API_BASE_URL}/chat/all-conversations`,
		SEND_MESSAGE: `${API_BASE_URL}/chat/send-message`,
		GET_MESSAGES: (conversationId: string) =>
			`${API_BASE_URL}/chat/conversation/messages/${conversationId}`,
		MARK_AS_READ: (conversationId: string) =>
			`${API_BASE_URL}/chat/mark-as-read/${conversationId}`,
		GET_UNREAD_COUNT: `${API_BASE_URL}/chat/unread-count`,
	},

	// Statistics and dashboard endpoints
	STATS: {
		// Admin stats
		ADMIN: {
			OVERVIEW: `${API_BASE_URL}/stats/admin/overview`,
			GET_USERS: `${API_BASE_URL}/stats/admin/users`,
			VERIFY_LANDLORD: (id: string) =>
				`${API_BASE_URL}/stats/admin/verify-landlord/${id}`,
		},
		// Landlord stats
		LANDLORD: {
			OVERVIEW: `${API_BASE_URL}/stats/landlord/overview`,
			FINANCIALS: `${API_BASE_URL}/stats/landlord/financials`,
		},
		// Tenant stats
		TENANT: {
			OVERVIEW: `${API_BASE_URL}/stats/tenant/overview`,
			PAYMENTS: `${API_BASE_URL}/stats/tenant/payments`,
		},
	},

	// Media endpoints
	MEDIA: {
		GENERATE_PRESIGNED_URL: `${API_BASE_URL}/media/generate-presigned-url`,
		GET_MEDIA_URL: (key: string) =>
			`${API_BASE_URL}/media/media-url/${encodeURIComponent(key)}`,
	},
};

// Helper functions for dynamic endpoints
export const createApiUrl = {
	getUserById: (id: string) => API_ENDPOINTS.USERS.GET_USER_BY_ID(id),
	getPropertyById: (id: string) => API_ENDPOINTS.PROPERTIES.GET_BY_ID(id),
	updateProperty: (id: string) => API_ENDPOINTS.PROPERTIES.UPDATE(id),
	deleteProperty: (id: string) => API_ENDPOINTS.PROPERTIES.DELETE(id),
	applyForProperty: (propertyId: string) =>
		API_ENDPOINTS.APPLICATIONS.APPLY(propertyId),
	getApplicationById: (id: string) =>
		API_ENDPOINTS.APPLICATIONS.GET_APPLICATION_BY_ID(id),
	updateApplication: (id: string) =>
		API_ENDPOINTS.APPLICATIONS.UPDATE_APPLICATION(id),
	getLeaseById: (id: string) => API_ENDPOINTS.LEASES.GET_BY_ID(id),
	terminateLease: (id: string) => API_ENDPOINTS.LEASES.TERMINATE(id),
	getPaymentsByLeaseId: (leaseId: string) =>
		API_ENDPOINTS.PAYMENTS.GET_BY_LEASE_ID(leaseId),
	getPaymentById: (id: string) => API_ENDPOINTS.PAYMENTS.GET_BY_ID(id),
	getMessages: (conversationId: string) =>
		API_ENDPOINTS.CHAT.GET_MESSAGES(conversationId),
	markAsRead: (conversationId: string) =>
		API_ENDPOINTS.CHAT.MARK_AS_READ(conversationId),
	verifyLandlord: (id: string) => API_ENDPOINTS.STATS.ADMIN.VERIFY_LANDLORD(id),
};

export default API_ENDPOINTS;
