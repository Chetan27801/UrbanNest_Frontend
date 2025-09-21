import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/queryClient";
import { userApiFunctions } from "@/services/userService";

const AuthCallbackPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();
	useEffect(() => {
		const handleGoogleAuthSuccess = async () => {
			try {
				// Get data from URL parameters
				const token = searchParams.get("token");
				const error = searchParams.get("error");

				if (error) {
					toast.error(error);
					navigate("/login");
					return;
				}

				if (token) {
					// First, store the token in Redux so the API interceptor can use it
					dispatch(loginSuccess({ user: null, token }));

					// Now fetch the user profile with the token available
					const user = await userApiFunctions.getProfile();

					// Update Redux with the complete user data
					dispatch(loginSuccess({ user, token }));
					queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
					toast.success("Login successful");
					navigate("/home");
				} else {
					toast.error("No authentication data found");
					navigate("/login");
				}
			} catch (error) {
				toast.error("Authentication failed. Please try again.");
				console.error("Google auth success error:", error);
				navigate("/login");
			}
		};

		// Execute the auth success flow
		handleGoogleAuthSuccess();
	}, [navigate, dispatch, searchParams, queryClient]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
			</div>
		</div>
	);
};

export default AuthCallbackPage;
