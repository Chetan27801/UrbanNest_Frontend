import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./useRedux";
import { logout } from "@/store/slices/authSlice";

// Simple hook for automatic token validation
export const useTokenValidator = () => {
	const { token, isAuthenticated } = useAppSelector((state) => state.auth);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!token || !isAuthenticated) return;

		try {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const isExpired = payload.exp < Date.now() / 1000;

			if (isExpired) {
				dispatch(logout());
			}
		} catch {
			dispatch(logout());
		}
	}, [token, isAuthenticated, dispatch]);
};
