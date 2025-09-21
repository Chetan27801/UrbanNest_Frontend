import { useMutation, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS, queryClient } from "@/lib/queryClient";

import type {
	ApplicationResponse,
	ApplicationStatusResponse,
} from "@/types/application";
import toast from "react-hot-toast";
import type { ApplicationFormData } from "@/schema/application.schema";
import type { Lease } from "@/types/lease";
import type { ApplicationStatus } from "@/utils/enums";

export const applicationApiFunctions = {
	getAllApplications: async (
		page: number,
		limit: number
	): Promise<ApplicationResponse> => {
		const response = await api.get(
			API_ENDPOINTS.APPLICATIONS.GET_ALL_APPLICATIONS(page, limit)
		);
		return response.data;
	},
	getAllApplicationsByLandlord: async (
		page: number,
		limit: number,
		status: string
	): Promise<ApplicationResponse> => {
		const response = await api.get(
			API_ENDPOINTS.APPLICATIONS.GET_ALL_APPLICATIONS_BY_LANDLORD(
				page,
				limit,
				status
			)
		);
		return response.data;
	},
	getApplicationById: async (id: string): Promise<ApplicationResponse> => {
		const response = await api.get(
			API_ENDPOINTS.APPLICATIONS.GET_APPLICATION_BY_ID(id)
		);
		return response.data;
	},
	updateApplication: async (
		id: string,
		status: ApplicationStatus,
		leaseDetails: Partial<Lease>
	): Promise<ApplicationResponse> => {
		const response = await api.put(
			API_ENDPOINTS.APPLICATIONS.UPDATE_APPLICATION(id),
			{ status, leaseDetails }
		);
		return response.data;
	},

	applyForProperty: async (propertyId: string, data: ApplicationFormData) => {
		const response = await api.post(
			API_ENDPOINTS.APPLICATIONS.APPLY(propertyId),
			data
		);
		return response.data;
	},
	checkApplicationStatus: async (
		propertyId: string
	): Promise<ApplicationStatusResponse> => {
		const response = await api.get(
			API_ENDPOINTS.APPLICATIONS.CHECK_STATUS(propertyId)
		);
		return response.data;
	},
};

export const useGetAllApplications = (limit: number) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.applications.all,
		queryFn: ({ pageParam }) =>
			applicationApiFunctions.getAllApplications(pageParam, limit),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage) => {
			if (firstPage.pagination.hasPreviousPage) {
				return firstPage.pagination.page - 1;
			}
			return undefined;
		},
	});
};

export const useGetAllApplicationsByLandlord = (
	limit: number,
	status: string
) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.applications.allByLandlord(status),
		queryFn: ({ pageParam }) =>
			applicationApiFunctions.getAllApplicationsByLandlord(
				pageParam,
				limit,
				status
			),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
		getPreviousPageParam: (firstPage) => {
			if (firstPage.pagination.hasPreviousPage) {
				return firstPage.pagination.page - 1;
			}
			return undefined;
		},
	});
};

export const useGetApplicationById = (id: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.applications.byId(id),
		queryFn: () => applicationApiFunctions.getApplicationById(id),
	});
};

export const useUpdateApplication = (id: string) => {
	return useMutation({
		mutationFn: ({
			status,
			leaseDetails,
		}: {
			status: ApplicationStatus;
			leaseDetails: Partial<Lease>;
		}) => applicationApiFunctions.updateApplication(id, status, leaseDetails),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["applications", "all", "landlord"],
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export const useCheckApplicationStatus = (propertyId: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.applications.checkStatus(propertyId),
		queryFn: () => applicationApiFunctions.checkApplicationStatus(propertyId),
		enabled: !!propertyId,
	});
};

export const useApplyForProperty = () => {
	return useMutation({
		mutationFn: ({
			propertyId,
			data,
		}: {
			propertyId: string;
			data: ApplicationFormData;
		}) =>
			applicationApiFunctions.applyForProperty(
				propertyId,
				data
			) as Promise<ApplicationResponse>,
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.applications.all,
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.applications.checkStatus(variables.propertyId),
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
