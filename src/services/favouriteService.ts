import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS, queryClient } from "@/lib/queryClient";
import type { Property } from "@/types/property";
import { useAuth } from "@/hooks";
import toast from "react-hot-toast";

// API Functions
export const favoriteApiFunctions = {
	getFavorites: async (
		page: number,
		limit: number
	): Promise<{
		success: boolean;
		message: string;
		properties: Property[];
		pagination: {
			page: number;
			limit: number;
			totalPages: number;
			hasNextPage: boolean;
			hasPreviousPage: boolean;
			totalItems: number;
		};
		appliedFilters: {
			page: number;
			limit: number;
		};
	}> => {
		const response = await api.get(
			API_ENDPOINTS.USERS.GET_FAVORITE_PROPERTIES(page, limit)
		);
		return response.data;
	},

	toggleFavorite: async (
		propertyId: string
	): Promise<{
		success: boolean;
		message: string;
		data: {
			propertyId: string;
			action: "added" | "removed";
			isFavorited: boolean;
			totalFavorites: number;
		};
	}> => {
		const response = await api.post(
			API_ENDPOINTS.USERS.TOGGLE_FAVORITE(propertyId),
			{
				propertyId,
			}
		);
		return response.data;
	},
};

// Custom Hooks
export const useFavorites = (page: number, limit: number) => {
	const { isAuthenticated, user } = useAuth();
	const {
		data,
		isLoading,
		isError,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	} = useInfiniteQuery({
		queryKey: QUERY_KEYS.user.favoriteProperties,
		queryFn: () => favoriteApiFunctions.getFavorites(page, limit),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
		enabled: isAuthenticated && user?.role === "tenant",
	});

	return {
		data,
		isLoading,
		isError,
		isFetching,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
	};
};

export const useToggleFavorite = () => {
	return useMutation({
		mutationFn: (propertyId: string) =>
			favoriteApiFunctions.toggleFavorite(propertyId),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.user.favoriteProperties,
			});
			const action = data.data.action;
			toast.success(
				action === "added" ? "Added to favorites" : "Removed from favorites"
			);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
