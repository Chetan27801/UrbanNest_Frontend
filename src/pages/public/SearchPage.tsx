import TopFilterSearch from "@/components/common/TopFilterSearch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import LeftFilterSidebar from "@/components/common/LeftFilterSidebar";
import MapView from "@/components/common/MapView";
import PropertyListings from "@/components/common/PropertyListings";

import { useInfinitePropertySearch } from "@/services/propertyService";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import { Loader2 } from "lucide-react";

const SearchPage = () => {
	const {
		filters,
		updateFilter,
		updateFilters,
		resetFilters,
		setPriceRange,
		getPriceRangeBucket,
		setSortOption,
		getSortOption,
	} = useSearchFilters();

	//handle filter button for the top filter search close or open
	const [isFilter, setIsFilter] = useState(true);
	const handleFilter = () => {
		setIsFilter((prev) => !prev);
	};

	//fetch the properties
	const {
		data: properties,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfinitePropertySearch(filters);

	// Flatten all pages of properties for display
	const allProperties =
		properties?.pages?.flatMap((page) => page.data.properties) || [];

	//handle the loading state
	if (isLoading) {
		return <Loader2 className="w-4 h-4 animate-spin" />;
	}

	//handle the no properties found state
	if (!isLoading && allProperties.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
				<div className="text-center">
					<h2 className="text-2xl font-semibold text-gray-900 mb-2">
						No Properties Found
					</h2>
					<p className="text-gray-600">
						Try adjusting your search filters to find more properties.
					</p>
				</div>
			</div>
		);
	}

	return (
		<TooltipProvider>
			<div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
				<div className="bg-white shadow-sm border-b">
					<TopFilterSearch
						isFilter={isFilter}
						handleFilter={handleFilter}
						filters={filters}
						updateFilter={updateFilter}
						setPriceRange={setPriceRange}
						getPriceRangeBucket={getPriceRangeBucket}
						setSortOption={setSortOption}
						getSortOption={getSortOption}
					/>
				</div>

				<div className="flex flex-row flex-1 gap-4 p-4 overflow-hidden">
					{/* Sidebar (Left) */}
					{isFilter && (
						<LeftFilterSidebar
							className="w-1/4 lg:w-1/5 flex-shrink-0 overflow-y-auto"
							filters={filters}
							updateFilters={updateFilters}
							resetFilters={resetFilters}
						/>
					)}

					{/* Map View (Middle) */}
					<MapView
						className="flex-1 min-w-0 bg-white rounded-lg shadow-sm border"
						isFilter={isFilter}
						properties={allProperties}
					/>

					{/* Property List (Right) */}
					<PropertyListings
						className="w-1/3 lg:w-1/4 flex-shrink-0 overflow-y-auto"
						allProperties={allProperties}
						pagination={
							properties?.pages[properties.pages.length - 1]?.pagination || {
								page: 1,
								totalPages: 1,
								totalItems: 0,
								hasNextPage: false,
								hasPreviousPage: false,
								limit: 10,
							}
						}
						fetchNextPage={fetchNextPage}
						hasNextPage={hasNextPage}
						isFetchingNextPage={isFetchingNextPage}
					/>
				</div>
			</div>
		</TooltipProvider>
	);
};

export default SearchPage;
