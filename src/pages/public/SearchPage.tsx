import TopFilterSearch from "@/components/common/TopFilterSearch";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import LeftFilterSidebar from "@/components/common/LeftFilterSidebar";
import MapView from "@/components/common/MapView";
import PropertyListings from "@/components/common/PropertyListings";

import { useInfinitePropertySearch } from "@/services/propertyService";
import { useSearchFilters } from "@/hooks/useSearchFilters";
import Loader from "@/components/common/Loader";

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
		return <Loader />;
	}

	return (
		<TooltipProvider>
			<div className="flex flex-col min-h-screen bg-gray-50">
				{/* Fixed Header */}
				<div className="sticky top-0 z-50 bg-white/95 shadow-sm border-b backdrop-blur-sm">
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

				{/* Main Content */}
				<div className="flex-1 flex">
					{/* Sidebar (Left) - Smooth slide animation */}
					<div
						className={`transition-all duration-300 ease-in-out ${
							isFilter
								? "w-80 lg:w-72 xl:w-80 opacity-100"
								: "w-0 opacity-0 overflow-hidden"
						}`}
					>
						{isFilter && (
							<div className="h-full p-4">
								<div className="sticky top-4">
									<LeftFilterSidebar
										className="h-[calc(100vh-120px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
										filters={filters}
										updateFilters={updateFilters}
										resetFilters={resetFilters}
									/>
								</div>
							</div>
						)}
					</div>

					{/* Main Content Area */}
					<div className="flex-1 flex gap-4 p-4 min-w-0">
						{/* Map View (Responsive) */}
						<div
							className={`transition-all duration-300 ease-in-out ${
								isFilter ? "w-full lg:w-1/2 xl:w-3/5" : "w-full lg:w-2/3"
							} min-w-0`}
						>
							<div className="h-[calc(100vh-120px)] sticky top-4">
								<MapView
									className="h-full w-full bg-white rounded-xl shadow-sm border"
									isFilter={isFilter}
									properties={allProperties}
								/>
							</div>
						</div>

						{/* Property List (Right) - Improved scrolling */}
						<div
							className={`transition-all duration-300 ease-in-out ${
								isFilter ? "w-full lg:w-1/2 xl:w-2/5" : "w-full lg:w-1/3"
							} min-w-0`}
						>
							<PropertyListings
								className="h-[calc(100vh-120px)] sticky top-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400"
								allProperties={allProperties}
								pagination={
									properties?.pages[properties.pages.length - 1]
										?.pagination || {
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
				</div>
			</div>
		</TooltipProvider>
	);
};

export default SearchPage;
