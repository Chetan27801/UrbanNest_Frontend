import { useQuery } from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import {
	type Property,
	type PropertySearchRequest,
	type PropertySearchResponse,
} from "@/types/property";

export const propertyApiFunctions = {
	getProperties: async (): Promise<Property[]> => {
		const response = await api.get(API_ENDPOINTS.PROPERTIES.GET_ALL);
		return response.data;
	},

	getPropertyById: async (id: string): Promise<Property> => {
		const response = await api.get(API_ENDPOINTS.PROPERTIES.GET_BY_ID(id));
		return response.data;
	},

	getPropertySearch: async (
		query: PropertySearchRequest
	): Promise<PropertySearchResponse> => {
		let queryString = "";
		for (const [key, value] of Object.entries(query)) {
			if (value) {
				queryString += `${key}=${value}&`;
			}
		}
		const response = await api.get(
			API_ENDPOINTS.PROPERTIES.SEARCH(queryString)
		);

		return response.data;
	},
};

export const useProperties = (enabled: boolean = true) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.all,
		queryFn: () => propertyApiFunctions.getProperties(),
		enabled,
	});
};

export const usePropertyById = (id: string, enabled: boolean = true) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.byId(id),
		queryFn: () => propertyApiFunctions.getPropertyById(id),
		enabled,
	});
};

export const usePropertySearch = (
	query: PropertySearchRequest,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.search(query.search),
		queryFn: () => propertyApiFunctions.getPropertySearch(query),
		enabled,
	});
};
