import {
	keepPreviousData,
	useMutation,
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import API_ENDPOINTS from "@/utils/apiConstant";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import {
	type PropertySearchResponse,
	type PropertyResponse,
	type PropertyDetailResponse,
	type PropertySearchFilters,
	type PropertyDataForHomeResponse,
} from "@/types/property";
import type { CreatePropertyTypeWithImages } from "@/schema/property.schema";

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

	getPropertyById: async (id: string): Promise<PropertyDetailResponse> => {
		const response = await api.get(API_ENDPOINTS.PROPERTIES.GET_BY_ID(id));
		return response.data;
	},

	getPropertySearch: async (
		query: PropertySearchFilters
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
	createProperty: async (data: CreatePropertyTypeWithImages) => {
		const response = await api.post(API_ENDPOINTS.PROPERTIES.CREATE, data);
		return response.data;
	},

	getPropertyDataForHome: async (
		type: string
	): Promise<PropertyDataForHomeResponse> => {
		const response = await api.get(
			API_ENDPOINTS.STATS.PUBLIC.PROPERTY_DATA_FOR_HOME(type)
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
	query: PropertySearchFilters,
	enabled: boolean = true
) => {
	return useQuery({
		queryKey: QUERY_KEYS.properties.searchByFilters(query),
		queryFn: () => propertyApiFunctions.getPropertySearch(query),
		placeholderData: keepPreviousData,
		enabled,
	});
};

export const useInfinitePropertySearch = (query: PropertySearchFilters) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.properties.searchByFilters(query),
		queryFn: ({ pageParam }) =>
			propertyApiFunctions.getPropertySearch({
				...query,
				page: pageParam as number,
			}),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const useCreateProperty = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreatePropertyTypeWithImages) =>
			propertyApiFunctions.createProperty(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.properties.all });
		},
	});
};

export const useGetPropertyDataForHome = (type: string) => {
	return useQuery({
		queryKey: QUERY_KEYS.stats.propertyDataForHome(type),
		queryFn: () => propertyApiFunctions.getPropertyDataForHome(type),
	});
};
