import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types/auth";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import { updateUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks";

// API Functions
const userApiFunctions = {
	getProfile: async (): Promise<User> => {
		const response = await api.get<User>(API_ENDPOINTS.USERS.GET_PROFILE);
		return response.data;
	},

	updateProfile: async (userData: Partial<User>): Promise<User> => {
		const response = await api.put<User>(
			API_ENDPOINTS.USERS.UPDATE_PROFILE,
			userData
		);
		return response.data;
	},

	uploadAvatar: async (formData: FormData): Promise<{ avatar: string }> => {
		const response = await api.post<{ avatar: string }>(
			API_ENDPOINTS.USERS.UPLOAD_AVATAR,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	},

	deleteProfile: async (): Promise<void> => {
		await api.delete(API_ENDPOINTS.USERS.DELETE_PROFILE);
	},
};

// Custom Hooks
export const useProfile = (enabled: boolean = true) => {
	return useQuery({
		queryKey: QUERY_KEYS.user.profile,
		queryFn: userApiFunctions.getProfile,
		enabled,
		retry: 1,
	});
};

export const useUpdateProfile = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApiFunctions.updateProfile,
		onSuccess: (data) => {
			dispatch(updateUser(data));
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
		},
	});
};

export const useUploadAvatar = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApiFunctions.uploadAvatar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
		},
	});
};

export const useDeleteProfile = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: userApiFunctions.deleteProfile,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile });
		},
	});
};
