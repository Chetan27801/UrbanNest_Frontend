import { useMutation, useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS, queryClient } from "@/lib/queryClient";

import type { ApplicationResponse, Application } from "@/types/application";
import toast from "react-hot-toast";

export const applicationApiFunctions = {
	getAllApplicationsByLandlord: async (): Promise<ApplicationResponse> => {
		const response = await api.get(
			API_ENDPOINTS.APPLICATIONS.GET_ALL_APPLICATIONS_BY_LANDLORD
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
		application: Application
	): Promise<ApplicationResponse> => {
		const response = await api.put(
			API_ENDPOINTS.APPLICATIONS.UPDATE_APPLICATION(id),
			application
		);
		return response.data;
	},
};

export const useGetAllApplicationsByLandlord = () => {
	return useQuery({
		queryKey: QUERY_KEYS.applications.allByLandlord,
		queryFn: applicationApiFunctions.getAllApplicationsByLandlord,
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
		mutationFn: (application: Application) =>
			applicationApiFunctions.updateApplication(id, application),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.applications.allByLandlord,
			});
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};
