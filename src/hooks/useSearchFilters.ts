import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { PropertySearchFilters } from "@/types/property";
import { PropertyType, Amenity, Highlight } from "@/utils/enums";

const defaultFilters: PropertySearchFilters = {
	page: 1,
	limit: 10,
	sortBy: "postedAt",
	sortOrder: "desc",
	search: "",
	minPrice: 1,
	maxPrice: 1000000,
	propertyType: undefined,
	beds: undefined,
	baths: undefined,
	minSquareFeet: undefined,
	maxSquareFeet: 1000000,
	city: "",
	state: "",
	lat: undefined,
	lng: undefined,
	radius: 1000000,
	hasPool: false,
	hasGym: false,
	hasParking: false,
	hasPetFriendly: false,
	hasWifi: false,
	hasCable: false,
	hasDishwasher: false,
	amenities: [],
	highlights: [],
	moveInDate: undefined,
};

/**
 * Custom hook for managing search filters with URL synchronization
 * Provides a clean API for filter state management without infinite loops
 */
export const useSearchFilters = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	// Parse current filters from URL
	const filters = useMemo((): PropertySearchFilters => {
		const parseNumber = (val: string | null): number | undefined => {
			if (!val) return undefined;
			const num = Number(val);
			return Number.isFinite(num) ? num : undefined;
		};

		const parseBoolean = (val: string | null): boolean => {
			return val === "true";
		};

		const parseDate = (val: string | null): Date | undefined => {
			if (!val) return undefined;
			const date = new Date(val);
			return Number.isFinite(date.getTime()) ? date : undefined;
		};

		return {
			page: parseNumber(searchParams.get("page")) ?? defaultFilters.page,
			limit: parseNumber(searchParams.get("limit")) ?? defaultFilters.limit,
			sortBy:
				(searchParams.get("sortBy") as PropertySearchFilters["sortBy"]) ??
				defaultFilters.sortBy,
			sortOrder:
				(searchParams.get("sortOrder") as PropertySearchFilters["sortOrder"]) ??
				defaultFilters.sortOrder,
			search: searchParams.get("search") ?? defaultFilters.search,
			minPrice:
				parseNumber(searchParams.get("minPrice")) ?? defaultFilters.minPrice,
			maxPrice:
				parseNumber(searchParams.get("maxPrice")) ?? defaultFilters.maxPrice,
			propertyType:
				(searchParams.get("propertyType") as PropertyType) ??
				defaultFilters.propertyType,
			beds: parseNumber(searchParams.get("beds")) ?? defaultFilters.beds,
			baths: parseNumber(searchParams.get("baths")) ?? defaultFilters.baths,
			minSquareFeet:
				parseNumber(searchParams.get("minSquareFeet")) ??
				defaultFilters.minSquareFeet,
			maxSquareFeet:
				parseNumber(searchParams.get("maxSquareFeet")) ??
				defaultFilters.maxSquareFeet,
			city: searchParams.get("city") ?? defaultFilters.city,
			state: searchParams.get("state") ?? defaultFilters.state,
			lat: parseNumber(searchParams.get("lat")) ?? defaultFilters.lat,
			lng: parseNumber(searchParams.get("lng")) ?? defaultFilters.lng,
			radius: parseNumber(searchParams.get("radius")) ?? defaultFilters.radius,
			hasPool: searchParams.has("hasPool")
				? parseBoolean(searchParams.get("hasPool"))
				: defaultFilters.hasPool,
			hasGym: searchParams.has("hasGym")
				? parseBoolean(searchParams.get("hasGym"))
				: defaultFilters.hasGym,
			hasParking: searchParams.has("hasParking")
				? parseBoolean(searchParams.get("hasParking"))
				: defaultFilters.hasParking,
			hasPetFriendly: searchParams.has("hasPetFriendly")
				? parseBoolean(searchParams.get("hasPetFriendly"))
				: defaultFilters.hasPetFriendly,
			hasWifi: searchParams.has("hasWifi")
				? parseBoolean(searchParams.get("hasWifi"))
				: defaultFilters.hasWifi,
			hasCable: searchParams.has("hasCable")
				? parseBoolean(searchParams.get("hasCable"))
				: defaultFilters.hasCable,
			hasDishwasher: searchParams.has("hasDishwasher")
				? parseBoolean(searchParams.get("hasDishwasher"))
				: defaultFilters.hasDishwasher,
			amenities:
				(searchParams.getAll("amenities") as Amenity[]) ||
				defaultFilters.amenities,
			highlights:
				(searchParams.getAll("highlights") as Highlight[]) ||
				defaultFilters.highlights,
			moveInDate:
				parseDate(searchParams.get("moveInDate")) ?? defaultFilters.moveInDate,
		};
	}, [searchParams]);

	// Update a single filter value
	const updateFilter = useCallback(
		<K extends keyof PropertySearchFilters>(
			key: K,
			value: PropertySearchFilters[K]
		) => {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);

				// Handle different value types
				if (value === undefined || value === null || value === "") {
					newParams.delete(key);
				} else if (Array.isArray(value)) {
					newParams.delete(key);
					value.forEach((v) => newParams.append(key, String(v)));
				} else if (value instanceof Date) {
					newParams.set(key, value.toISOString());
				} else {
					newParams.set(key, String(value));
				}

				return newParams;
			});
		},
		[setSearchParams]
	);

	// Update multiple filters at once
	const updateFilters = useCallback(
		(updates: Partial<PropertySearchFilters>) => {
			setSearchParams((prev) => {
				const newParams = new URLSearchParams(prev);

				Object.entries(updates).forEach(([key, value]) => {
					if (value === undefined || value === null || value === "") {
						newParams.delete(key);
					} else if (Array.isArray(value)) {
						newParams.delete(key);
						value.forEach((v) => newParams.append(key, String(v)));
					} else if (value instanceof Date) {
						newParams.set(key, value.toISOString());
					} else {
						newParams.set(key, String(value));
					}
				});

				return newParams;
			});
		},
		[setSearchParams]
	);

	// Reset all filters to defaults
	const resetFilters = useCallback(() => {
		setSearchParams(new URLSearchParams());
	}, [setSearchParams]);

	// Helper to set price range from predefined buckets
	const setPriceRange = useCallback(
		(range: "under-15000" | "15000-30000" | "30000-45000" | "above-45000") => {
			const ranges = {
				"under-15000": { minPrice: 1, maxPrice: 15000 },
				"15000-30000": { minPrice: 15000, maxPrice: 30000 },
				"30000-45000": { minPrice: 30000, maxPrice: 45000 },
				"above-45000": { minPrice: 45000, maxPrice: 1000000 },
			};
			updateFilters(ranges[range]);
		},
		[updateFilters]
	);

	// Helper to get current price range bucket
	const getPriceRangeBucket = useCallback((): string => {
		const { minPrice, maxPrice } = filters;
		if (minPrice === 1 && maxPrice === 15000) return "under-15000";
		if (minPrice === 15000 && maxPrice === 30000) return "15000-30000";
		if (minPrice === 30000 && maxPrice === 45000) return "30000-45000";
		if (minPrice === 45000 && maxPrice === 1000000) return "above-45000";
		return "";
	}, [filters]);

	// Helper for sort options - maps frontend options to backend fields
	const setSortOption = useCallback(
		(option: "price-asc" | "price-desc" | "newest" | "rating") => {
			const sortMappings = {
				"price-asc": { sortBy: "pricePerMonth", sortOrder: "asc" },
				"price-desc": { sortBy: "pricePerMonth", sortOrder: "desc" },
				newest: { sortBy: "postedAt", sortOrder: "desc" },
				rating: { sortBy: "averageRating", sortOrder: "desc" },
			};
			updateFilters(sortMappings[option] as PropertySearchFilters);
		},
		[updateFilters]
	);

	// Helper to get current sort option - maps backend fields to frontend options
	const getSortOption = useCallback((): string => {
		const { sortBy, sortOrder } = filters;
		if (sortBy === "pricePerMonth" && sortOrder === "asc") return "price-asc";
		if (sortBy === "pricePerMonth" && sortOrder === "desc") return "price-desc";
		if (sortBy === "postedAt") return "newest";
		if (sortBy === "averageRating") return "rating";
		return "newest"; // default fallback
	}, [filters]);

	// Toggle amenity in the amenities array
	const toggleAmenity = useCallback(
		(amenity: Amenity) => {
			const currentAmenities = filters.amenities || [];
			const newAmenities = currentAmenities.includes(amenity)
				? currentAmenities.filter((a) => a !== amenity)
				: [...currentAmenities, amenity];
			updateFilter("amenities", newAmenities);
		},
		[filters.amenities, updateFilter]
	);

	return {
		filters,
		updateFilter,
		updateFilters,
		resetFilters,
		setPriceRange,
		getPriceRangeBucket,
		setSortOption,
		getSortOption,
		toggleAmenity,
	};
};
