import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "@/types/auth";

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
	isLoading: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		loginSuccess: (
			state,
			action: PayloadAction<{ user: User | null; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		updateUser: (state, action: PayloadAction<User>) => {
			state.user = { ...state.user, ...action.payload };
		},
		clearAuth: () => {
			try {
				localStorage.removeItem("persist:auth");
				localStorage.removeItem("token");
			} catch (error) {
				console.error("Error clearing auth state:", error);
			}
			return initialState;
		},
	},
});

export const { setLoading, loginSuccess, logout, updateUser, clearAuth } =
	authSlice.actions;
export default authSlice.reducer;
