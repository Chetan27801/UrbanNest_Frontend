import axios, { type AxiosResponse, type AxiosError } from "axios";
import toast from "react-hot-toast";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

// Smart logout handler - centralized token expiration handling
const smartLogout = () => {
	store.dispatch(logout());
	toast.error("Session expired. Please login again.");
	window.location.href = "/login";
};

// Check if JWT token is expired
const isTokenExpired = (token: string): boolean => {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.exp < Date.now() / 1000;
	} catch {
		return true; // If token is malformed, consider it expired
	}
};

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor - proactive token validation
api.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.token;

		if (token) {
			// Check token expiration before making request
			if (isTokenExpired(token)) {
				smartLogout();
				return Promise.reject(new Error("Token expired"));
			}
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

// Response interceptor - handle server-side token validation
api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: AxiosError) => {
		// Handle authentication errors
		if (error.response?.status === 401) {
			smartLogout();
		}
		return Promise.reject(error);
	}
);

//Export the api instance

export default api;
