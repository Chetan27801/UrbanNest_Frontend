// import {
// 	FilterIcon,
// 	FilterXIcon,
// 	GridIcon,
// 	ListIcon,
// 	SearchIcon,
// } from "lucide-react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { SelectDropDown } from "./SelectDropDown";
// import { PropertyType } from "@/utils/enums";
// import DatePicker from "./DatePicker";
// import { Separator } from "../ui/separator";
// import type { PropertySearchFilters } from "@/types/property";
// import { useEffect } from "react";

// const TopFilterSearch = ({
// 	isFilter,
// 	handleFilter,
// 	searchFilters,
// 	updateSearchFilter,
// 	handleApplyFilters,
// }: {
// 	isFilter: boolean;
// 	handleFilter: () => void;
// 	searchFilters: PropertySearchFilters;
// 	updateSearchFilter: <K extends keyof PropertySearchFilters>(
// 		key: K,
// 		value: PropertySearchFilters[K]
// 	) => void;
// 	handleApplyFilters: () => void;
// }) => {
// 	//debounce the search filter
// 	useEffect(() => {
// 		const delayInputTimeout = setTimeout(() => {
// 			handleApplyFilters();
// 		}, 500);
// 		return () => clearTimeout(delayInputTimeout);
// 	}, [searchFilters.search, handleApplyFilters]);

// 	return (
// 		<div className="flex flex-row p-2 w-full items-center gap-2">
// 			{/* Filter Button */}
// 			<Button
// 				variant="outline"
// 				className="flex items-center gap-2"
// 				onClick={handleFilter}
// 			>
// 				{isFilter ? (
// 					<FilterXIcon className="w-4 h-4" />
// 				) : (
// 					<FilterIcon className="w-4 h-4" />
// 				)}
// 				{isFilter ? "Hide Filters" : "Show Filters"}
// 			</Button>

// 			{/* Search Bar */}
// 			<div className="flex flex-row justify-center p-4 relative w-80">
// 				<Input
// 					type="text"
// 					placeholder="Search"
// 					value={searchFilters.search}
// 					onChange={(e) => updateSearchFilter("search", e.target.value)}
// 					className="focus-visible:ring-1"
// 				/>
// 				<SearchIcon className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" />
// 			</div>

// 			<div className="flex flex-row gap-2 flex-1/6">
// 				{/* Price Range */}
// 				<SelectDropDown
// 					field={{
// 						onChange: (value: string) => {
// 							updateSearchFilter("minPrice", parseInt(value));
// 						},
// 						value: searchFilters.minPrice?.toString() || "",
// 					}}
// 					options={[
// 						{ label: "Under ₹15000", value: "under 15000" },
// 						{ label: "₹15000 - ₹30000", value: "15000-30000" },
// 						{ label: "₹30000 - ₹45000", value: "30000-45000" },
// 						{ label: "Above ₹45000", value: "above 45000" },
// 					]}
// 					placeholder="Price"
// 				/>
// 				<SelectDropDown
// 					field={{
// 						onChange: (value: string) => {
// 							updateSearchFilter("beds", parseInt(value));
// 						},
// 						value: searchFilters.beds?.toString() || "",
// 					}}
// 					options={[
// 						{ label: "1", value: "1" },
// 						{ label: "2", value: "2" },
// 						{ label: "3", value: "3" },
// 						{ label: "4", value: "4" },
// 						{ label: "5", value: "5" },
// 					]}
// 					placeholder="Beds"
// 				/>
// 				<SelectDropDown
// 					field={{
// 						onChange: (value: string) => {
// 							updateSearchFilter("baths", parseInt(value));
// 						},
// 						value: searchFilters.baths?.toString() || "",
// 					}}
// 					options={[
// 						{ label: "1", value: "1" },
// 						{ label: "2", value: "2" },
// 						{ label: "3", value: "3" },
// 						{ label: "4", value: "4" },
// 						{ label: "5", value: "5" },
// 					]}
// 					placeholder="Baths"
// 				/>
// 				<SelectDropDown
// 					field={{
// 						onChange: (value: string) => {
// 							updateSearchFilter("propertyType", value as PropertyType);
// 						},
// 						value: searchFilters.propertyType || "",
// 					}}
// 					options={[
// 						{ label: "Apartment", value: PropertyType.Apartment },
// 						{ label: "Villa", value: PropertyType.Villa },
// 						{ label: "Townhouse", value: PropertyType.Townhouse },
// 						{ label: "Cottage", value: PropertyType.Cottage },
// 						{ label: "Tinyhouse", value: PropertyType.Tinyhouse },
// 						{ label: "Rooms", value: PropertyType.Rooms },
// 					]}
// 					placeholder="Property Type"
// 				/>
// 				<DatePicker
// 					date={searchFilters.moveInDate}
// 					setDate={(date) => updateSearchFilter("moveInDate", date)}
// 					label="Move In Date"
// 				/>
// 				<SelectDropDown
// 					field={{
// 						onChange: (value: string) => {
// 							updateSearchFilter("sortBy", value);
// 						},
// 						value: searchFilters.sortBy || "",
// 					}}
// 					options={[
// 						{ label: "Price: Low to High", value: "pricelow" },
// 						{ label: "Price: High to Low", value: "pricehigh" },
// 						{ label: "Newest", value: "newest" },
// 						{ label: "Rating", value: "rating" },
// 					]}
// 					placeholder="Sort"
// 				/>
// 			</div>

// 			<div className="flex flex-row justify-center relative rounded-lg border border-muted">
// 				<Button variant="ghost">
// 					<GridIcon className="w-4 h-4" />
// 				</Button>
// 				<Separator orientation="vertical" className="h-6" />
// 				<Button variant="ghost">
// 					<ListIcon className="w-4 h-4" />
// 				</Button>
// 			</div>
// 		</div>
// 	);
// };

// export default TopFilterSearch;


// src/components/common/TopFilterSearch.tsx

import {
	FilterIcon,
	FilterXIcon,
	GridIcon,
	ListIcon,
	SearchIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SelectDropDown } from "./SelectDropDown";
import { PropertyType } from "@/utils/enums";
import DatePicker from "./DatePicker";
import { Separator } from "../ui/separator";
import type { PropertySearchFilters } from "@/types/property";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce"; // A custom hook for debouncing

const TopFilterSearch = ({
	isFilter,
	handleFilter,
	searchFilters,
	updateSearchFilter,
	handleApplyFilters,
}: {
	isFilter: boolean;
	handleFilter: () => void;
	searchFilters: PropertySearchFilters; // Corrected type
	updateSearchFilter: <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
	) => void;
	handleApplyFilters: () => void;
}) => {
	const debouncedFilters = useDebounce(searchFilters, 500);

	useEffect(() => {
		handleApplyFilters();
	}, [debouncedFilters, handleApplyFilters]);

	const handlePriceChange = (value: string) => {
		const [min, max] = value.split("-").map(Number);
		updateSearchFilter("minPrice", min);
		if (max) {
			updateSearchFilter("maxPrice", max);
		} else {
			updateSearchFilter("maxPrice", 1000000);
		}
	};

	return (
		<div className="flex flex-row p-2 w-full items-center gap-2">
			{/* Filter Button */}
			<Button
				variant="outline"
				className="flex items-center gap-2"
				onClick={handleFilter}
			>
				{isFilter ? (
					<FilterXIcon className="w-4 h-4" />
				) : (
					<FilterIcon className="w-4 h-4" />
				)}
				{isFilter ? "Hide Filters" : "Show Filters"}
			</Button>

			{/* Search Bar */}
			<div className="flex flex-row justify-center p-4 relative w-80">
				<Input
					type="text"
					placeholder="Search by name, city, state..."
					value={searchFilters.search || ""}
					onChange={(e) => updateSearchFilter("search", e.target.value)}
					className="focus-visible:ring-1"
				/>
				<SearchIcon className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" />
			</div>

			<div className="flex flex-row gap-2 flex-1 items-center">
				{/* Price Range */}
				<SelectDropDown
					field={{
						onChange: handlePriceChange,
						value: `${searchFilters.minPrice}-${searchFilters.maxPrice}`,
					}}
					options={[
						{ label: "Any Price", value: "0-1000000" },
						{ label: "Under ₹15000", value: "0-15000" },
						{ label: "₹15000 - ₹30000", value: "15000-30000" },
						{ label: "₹30000 - ₹45000", value: "30000-45000" },
						{ label: "Above ₹45000", value: "45000" },
					]}
					placeholder="Price"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateSearchFilter("beds", parseInt(value));
						},
						value: searchFilters.beds?.toString() || "",
					}}
					options={[
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4", value: "4" },
						{ label: "5+", value: "5" },
					]}
					placeholder="Beds"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateSearchFilter("baths", parseInt(value));
						},
						value: searchFilters.baths?.toString() || "",
					}}
					options={[
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4+", value: "4" },
					]}
					placeholder="Baths"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateSearchFilter("propertyType", value as PropertyType);
						},
						value: searchFilters.propertyType || "",
					}}
					options={Object.values(PropertyType).map(pt => ({label: pt, value: pt}))}
					placeholder="Property Type"
				/>
				<DatePicker
					date={searchFilters.moveInDate}
					setDate={(date) => updateSearchFilter("moveInDate", date)}
					label="Move In Date"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateSearchFilter("sortBy", value);
						},
						value: searchFilters.sortBy || "",
					}}
					options={[
						{ label: "Price: Low to High", value: "price-asc" },
						{ label: "Price: High to Low", value: "price-desc" },
						{ label: "Newest", value: "newest" },
						{ label: "Rating", value: "rating" },
					]}
					placeholder="Sort By"
				/>
			</div>

			<div className="flex flex-row justify-center relative rounded-lg border border-muted">
				<Button variant="ghost">
					<GridIcon className="w-4 h-4" />
				</Button>
				<Separator orientation="vertical" className="h-6" />
				<Button variant="ghost">
					<ListIcon className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default TopFilterSearch;