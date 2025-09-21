export interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
	avatar?: string;
	phoneNumber?: string;
	isVerified?: boolean;
	isOnline?: boolean;
	lastActive?: Date;
}

export interface AuthState {
	user: User | null;
	token: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface AuthResponse {
	success: boolean;
	message: string;
	token: string;
	user: User;
}

export interface RegisterCredentials {
	name: string;
	email: string;
	password: string;
	role: "tenant" | "landlord";
	avatar?: string;
}

export interface GetUsersResponse {
	success: boolean;
	message: string;
	users: User[];
	pagination: {
		page: number;
		limit: number;
		totalPages: number;
		totalUsers: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

export interface ProfileFormData {
	name?: string;
	email?: string;
	phoneNumber?: string;
	avatar?: string;
	password?: string;
}
