import { useAppSelector } from "./useRedux";

export const useAuth = () => {
	const auth = useAppSelector((state) => state.auth);

	return {
		user: auth.user,
		token: auth.token,
		isAuthenticated: auth.isAuthenticated,
		isLoading: auth.isLoading,
	};
};
