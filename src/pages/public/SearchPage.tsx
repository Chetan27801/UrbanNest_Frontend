import TopFilterSearch from "@/components/common/TopFilterSearch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import LeftFilterSidebar from "@/components/common/LeftFilterSidebar";
import MapView from "@/components/common/MapView";
import PropertyListings from "@/components/common/PropertyListings";
import { useSearchParams } from "react-router-dom";
import type { newProperty, newPropertySearchFilters } from "@/types/property";
import { Amenity, Highlight, PropertyType } from "@/utils/enums";
import { usePropertySearch } from "@/services/propertyService";

const initialSearchFilters: newPropertySearchFilters = {
	page: 1,
	limit: 10,
	sortBy: "price",
	sortOrder: "asc",
	search: "",
	minPrice: 0,
	maxPrice: 1000000,
	propertyType: "Apartment",
	beds: 1,
	baths: 1,
	minSquareFeet: 0,
	maxSquareFeet: 1000000,
	city: "",
	state: "",
	lat: 0,
	lng: 0,
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

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchFilters, setSearchFilters] =
		useState<newPropertySearchFilters>(initialSearchFilters);
	useEffect(() => {
		setSearchFilters((prev) => ({
			...prev,
			page: parseInt(searchParams.get("page") || "1"),
			limit: parseInt(searchParams.get("limit") || "10"),
			sortBy: searchParams.get("sortBy") || "price",
			sortOrder: searchParams.get("sortOrder") || "asc",
			search: searchParams.get("search") || "",
			minPrice: parseInt(searchParams.get("minPrice") || "0"),
			maxPrice: parseInt(searchParams.get("maxPrice") || "1000000"),
			propertyType: searchParams.get("propertyType") as PropertyType,
			beds: parseInt(searchParams.get("beds") || "1"),
			baths: parseInt(searchParams.get("baths") || "1"),
			minSquareFeet: parseInt(searchParams.get("minSquareFeet") || "0"),
			maxSquareFeet: parseInt(searchParams.get("maxSquareFeet") || "1000000"),
			city: searchParams.get("city") || "",
			state: searchParams.get("state") || "",
			lat: parseInt(searchParams.get("lat") || "0"),
			lng: parseInt(searchParams.get("lng") || "0"),
			radius: parseInt(searchParams.get("radius") || "1000000"),
			hasPool: searchParams.get("hasPool") === "true",
			hasGym: searchParams.get("hasGym") === "true",
			hasParking: searchParams.get("hasParking") === "true",
			hasPetFriendly: searchParams.get("hasPetFriendly") === "true",
			hasWifi: searchParams.get("hasWifi") === "true",
			hasCable: searchParams.get("hasCable") === "true",
			hasDishwasher: searchParams.get("hasDishwasher") === "true",
			amenities: searchParams.get("amenities")?.split(",") as Amenity[],
			highlights: searchParams.get("highlights")?.split(",") as Highlight[],
			moveInDate: searchParams.get("moveInDate")
				? new Date(searchParams.get("moveInDate")!)
				: undefined,
		}));
	}, [searchParams]);

	const [isFilter, setIsFilter] = useState(true);
	const handleFilter = () => {
		setIsFilter((prev) => !prev);
	};

	const buildSearchQuery = () => {
		const params = {
			search: searchFilters.search,
			minPrice: searchFilters.minPrice,
			maxPrice: searchFilters.maxPrice,
			propertyType: searchFilters.propertyType,
			beds: searchFilters.beds,
			baths: searchFilters.baths,
			minSquareFeet: searchFilters.minSquareFeet,
			maxSquareFeet: searchFilters.maxSquareFeet,
			city: searchFilters.city,
			state: searchFilters.state,
			lat: searchFilters.lat,
			lng: searchFilters.lng,
			radius: searchFilters.radius,
			hasPool: searchFilters.hasPool,
			hasGym: searchFilters.hasGym,
			hasParking: searchFilters.hasParking,
			hasPetFriendly: searchFilters.hasPetFriendly,
			hasWifi: searchFilters.hasWifi,
			hasCable: searchFilters.hasCable,
			hasDishwasher: searchFilters.hasDishwasher,
			amenities: searchFilters.amenities,
			highlights: searchFilters.highlights,
			moveInDate: searchFilters.moveInDate,
		};

		const query = Object.fromEntries(
			Object.entries(params).filter(([_, value]) => value !== undefined)
		);

		return query;
	};

	const updateSearchFilter = <K extends keyof newPropertySearchFilters>(
		key: K,
		value: newPropertySearchFilters[K]
	) => {
		setSearchFilters((prev) => ({ ...prev, [key]: value }));
	};

	const handleApplyFilters = () => {
		const params = new URLSearchParams();
		Object.entries(searchFilters).forEach(([key, value]) => {
			if (value !== undefined && value !== "" && value !== null) {
				params.set(key, value.toString());
			}
		});
		setSearchParams(params);
	};

	const handleClearFilters = () => {
		setSearchFilters(initialSearchFilters);
		setSearchParams(
			new URLSearchParams(
				initialSearchFilters as unknown as Record<string, string>
			)
		);
	};

	const { data: properties, isLoading } = usePropertySearch(buildSearchQuery());

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<TooltipProvider>
			<div className="flex flex-col h-screen bg-white overflow-hidden">
				<TopFilterSearch
					isFilter={isFilter}
					handleFilter={handleFilter}
					searchFilters={searchFilters}
					updateSearchFilter={updateSearchFilter}
					handleApplyFilters={handleApplyFilters}
				/>

				<div className="flex flex-row flex-1 gap-4 overflow-hidden">
					{/* Sidebar (Left) */}
					{isFilter && (
						<LeftFilterSidebar
							className="w-1/4 lg:w-1/5 flex-shrink-0 overflow-y-auto"
							initialSearchFilters={initialSearchFilters}
							handleClearFilters={handleClearFilters}
							handleApplyFilters={handleApplyFilters}
							updateSearchFilter={updateSearchFilter}
						/>
					)}

					{/* Map View (Middle) */}
					<MapView
						className="flex-1 min-w-0"
						isFilter={isFilter}
						properties={properties?.data.properties || ([] as newProperty[])}
					/>

					{/* Property List (Right) */}
					<PropertyListings
						className="w-1/3 lg:w-1/4 flex-shrink-0 overflow-y-auto"
						properties={properties?.data.properties || ([] as newProperty[])}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default SearchPage;
