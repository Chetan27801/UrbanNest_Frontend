import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS, queryClient } from "@/lib/queryClient";
import toast from "react-hot-toast";
import { type CreateLeaseType } from "@/schema/lease.schema";
import type { LeaseResponse } from "@/types/lease";

export const leaseApiFunctions = {
	createLease: async (data: CreateLeaseType) => {
		const response = await api.post(API_ENDPOINTS.LEASES.CREATE, data);
		return response.data;
	},
	getAllLeases: async (
		page: number,
		limit: number,
		status: string
	): Promise<LeaseResponse> => {
		const response = await api.get(
			API_ENDPOINTS.LEASES.GET_ALL(page, limit, status)
		);
		return response.data;
	},
	getLeaseById: async (id: string) => {
		const response = await api.get(API_ENDPOINTS.LEASES.GET_BY_ID(id));
		return response.data;
	},
	terminateLease: async (id: string) => {
		const response = await api.put(API_ENDPOINTS.LEASES.TERMINATE(id));
		return response.data;
	},
};

export const useCreateLease = () => {
	return useMutation({
		mutationFn: leaseApiFunctions.createLease,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.leases.all });
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to create lease";
			toast.error(errorMessage);
		},
	});
};

export const useGetAllLeases = (limit: number, status: string) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.leases.allByLandlord(status),
		queryFn: ({ pageParam }) =>
			leaseApiFunctions.getAllLeases(pageParam as number, limit, status),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const useGetLeaseById = (id: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.leases.byId(id),
		queryFn: () => leaseApiFunctions.getLeaseById(id),
	});
};

export const useTerminateLease = () => {
	return useMutation({
		mutationFn: leaseApiFunctions.terminateLease,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.leases.all });
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.leases.allByLandlord("all"),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.leases.allByLandlord("active"),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.leases.allByLandlord("terminated"),
			});

			toast.success("Lease terminated successfully");
		},
		onError: (error: unknown) => {
			const errorMessage =
				error instanceof Error ? error.message : "Failed to terminate lease";
			toast.error(errorMessage);
		},
	});
};
