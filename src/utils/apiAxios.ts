import axios, { type AxiosResponse, type AxiosError } from "axios";
import toast from "react-hot-toast";
import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";

//Create axios instance

export const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

//Request interceptor to add auth token to headers

api.interceptors.request.use(
	(config) => {
		const state = store.getState(); //Axios interceptor is a plain JavaScript module, not a React component. This means you cannot use React hooks like useSelector to access the Redux state.
		const token = state.auth.token;

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//Response interceptor to handle errors globally
api.interceptors.response.use(
	(response: AxiosResponse) => {
		return response;
	},
	(error: AxiosError) => {
		if (error.response?.status === 401) {
			store.dispatch(logout());
			toast.error("Session expired. Please login again.");
			window.location.href = "/login";
		} else if (error.response?.status === 403) {
			toast.error("Access denied. Please login again.");
		} else if (error.response?.status === 404) {
			toast.error("Resource not found.");
		} else if (error.response?.status === 400) {
			toast.error("Bad request. Please check your input.");
		} else if (error.response?.status === 500) {
			toast.error("Internal server error. Please try again later.");
		}

		return Promise.reject(error);
	}
);

//Export the api instance

export default api;
