export interface User {
	id: string;
	email: string;
	name: string;
	role?: string;
	avatar?: string;
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
