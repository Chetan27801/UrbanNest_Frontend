import TopFilterSearch from "@/components/common/TopFilterSearch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import LeftFilterSidebar from "@/components/common/LeftFilterSidebar";
import MapView from "@/components/common/MapView";
import PropertyListings from "@/components/common/PropertyListings";
import { useSearchParams } from "react-router-dom";
import type {
	Property,
	PropertySearchFilters,
	PropertySearchRequest,
} from "@/types/property";
import { Amenity, Highlight, PropertyType } from "@/utils/enums";
import { usePropertySearch } from "@/services/propertyService";

const initialSearchFilters: PropertySearchFilters = {
	page: 1,
	limit: 10,
	sortBy: "newest",
	sortOrder: "asc",
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

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchFilters, setSearchFilters] =
		useState<PropertySearchFilters>(initialSearchFilters);
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
			propertyType: searchParams.get("propertyType") as
				| PropertyType
				| undefined,
			beds: searchParams.get("beds")
				? parseInt(searchParams.get("beds")!)
				: undefined,
			baths: searchParams.get("baths")
				? parseInt(searchParams.get("baths")!)
				: undefined,
			minSquareFeet: parseInt(searchParams.get("minSquareFeet") || "0"),
			maxSquareFeet: parseInt(searchParams.get("maxSquareFeet") || "1000000"),
			city: searchParams.get("city") || "",
			state: searchParams.get("state") || "",
			lat: searchParams.get("lat")
				? parseFloat(searchParams.get("lat")!)
				: undefined,
			lng: searchParams.get("lng")
				? parseFloat(searchParams.get("lng")!)
				: undefined,
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

	const updateSearchFilter = <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
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

	const { data: properties, isLoading } = usePropertySearch(
		buildSearchQuery() as unknown as PropertySearchRequest
	);

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
							searchFilters={searchFilters}
							handleClearFilters={handleClearFilters}
							handleApplyFilters={handleApplyFilters}
							updateSearchFilter={updateSearchFilter}
						/>
					)}

					{/* Map View (Middle) */}
					<MapView
						className="flex-1 min-w-0"
						isFilter={isFilter}
						properties={properties?.data.properties || ([] as Property[])}
					/>

					{/* Property List (Right) */}
					<PropertyListings
						className="w-1/3 lg:w-1/4 flex-shrink-0 overflow-y-auto"
						properties={properties?.data.properties || ([] as Property[])}
						pagination={properties?.data.pagination}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default SearchPage;
