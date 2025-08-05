import {
	keepPreviousData,
	useInfiniteQuery,
	useQuery,
} from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import {
	type Property,
	type PropertySearchRequest,
	type PropertySearchResponse,
	type PropertyResponse,
} from "@/types/property";

export const propertyApiFunctions = {
	getProperties: async (
		page: number,
		limit: number
	): Promise<PropertyResponse> => {
		const response = await api.get(API_ENDPOINTS.PROPERTIES.GET_ALL, {
			params: {
				page,
				limit,
			},
		});
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

export const useProperties = (
	page: number,
	limit: number,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.all,
		queryFn: () => propertyApiFunctions.getProperties(page, limit),
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

export const useInfiniteProperties = (limit: number) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.properties.all,
		queryFn: ({ pageParam }) =>
			propertyApiFunctions.getProperties(pageParam, limit),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const usePropertySearch = (
	query: PropertySearchRequest,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.searchByFilters(query),
		queryFn: () => propertyApiFunctions.getPropertySearch(query),
		placeholderData: keepPreviousData,
		enabled,
	});
};
