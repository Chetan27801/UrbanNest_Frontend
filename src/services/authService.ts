import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
} from "@/types/auth";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import { loginSuccess, logout, setLoading } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

// Using your existing axios instance with interceptors

// API Functions
const authApiFunctions = {
	login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>(
			API_ENDPOINTS.AUTH.LOGIN,
			credentials
		);
		return response.data;
	},

	register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
		const response = await api.post<AuthResponse>(
			API_ENDPOINTS.AUTH.REGISTER,
			credentials
		);
		return response.data;
	},

	forgotPassword: async (email: string): Promise<{ message: string }> => {
		const response = await api.post<{ message: string }>(
			API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
			{ email }
		);
		return response.data;
	},

	resetPassword: async (
		token: string,
		password: string
	): Promise<{ message: string }> => {
		const response = await api.post<{ message: string }>(
			API_ENDPOINTS.AUTH.RESET_PASSWORD,
			{ token, password }
		);
		return response.data;
	},
};

// Custom Hooks
export const useLogin = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: authApiFunctions.login,
		onMutate: () => {
			dispatch(setLoading(true));
		},
		onSuccess: (data) => {
			const token = data.token;
			dispatch(loginSuccess({ user: data.user, token }));
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
		},
		onError: () => {
			dispatch(setLoading(false));
		},
	});
};

export const useRegister = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: authApiFunctions.register,
		onMutate: () => {
			dispatch(setLoading(true));
		},
		onSuccess: (data) => {
			const token = data.token;
			dispatch(loginSuccess({ user: data.user, token }));
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
		},
		onError: () => {
			dispatch(setLoading(false));
		},
	});
};

export const useLogout = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const [, , removeToken] = useLocalStorage("token", "");
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async () => {
			// Clear auth state - your axios interceptor will handle the cleanup
			return Promise.resolve();
		},
		onSuccess: () => {
			dispatch(logout());
			queryClient.clear();
			removeToken();
			navigate("/login");
		},
	});
};

export const useForgotPassword = () => {
	return useMutation({
		mutationFn: authApiFunctions.forgotPassword,
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationFn: ({ token, password }: { token: string; password: string }) =>
			authApiFunctions.resetPassword(token, password),
	});
};
