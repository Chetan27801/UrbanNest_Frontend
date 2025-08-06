import {
	useQuery,
	useMutation,
	useQueryClient,
	useInfiniteQuery,
} from "@tanstack/react-query";
import type { GetUsersResponse, User } from "@/types/auth";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import { updateUser } from "@/store/slices/authSlice";
import { useAppDispatch, useAuth } from "@/hooks";
import type { ProfileFormData } from "@/types/auth";

// API Functions
const userApiFunctions = {
	getProfile: async (): Promise<User> => {
		const response = await api.get<User>(API_ENDPOINTS.USERS.GET_PROFILE);
		return response.data;
	},

	updateProfile: async (userData: ProfileFormData): Promise<User> => {
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

	getUsers: async (page: number, limit: number): Promise<GetUsersResponse> => {
		const response = await api.get<GetUsersResponse>(
			API_ENDPOINTS.USERS.GET_ALL_USERS(page, limit)
		);
		return response.data;
	},
};

// Custom Hooks
export const useProfile = () => {
	const { isAuthenticated } = useAuth();
	return useQuery({
		queryKey: QUERY_KEYS.user.profile,
		queryFn: userApiFunctions.getProfile,
		enabled: isAuthenticated,
		refetchOnMount: "always",
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

export const useGetUsers = ({
	page,
	limit,
}: {
	page: number;
	limit: number;
}) => {
	return useQuery({
		queryKey: QUERY_KEYS.user.allUsers,
		queryFn: () => userApiFunctions.getUsers(page, limit),
	});
};

export const useInfiniteUsers = (limit: number) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.user.allUsers,
		queryFn: ({ pageParam }) => userApiFunctions.getUsers(pageParam, limit),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
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
