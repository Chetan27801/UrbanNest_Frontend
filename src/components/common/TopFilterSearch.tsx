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
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const TopFilterSearch = ({
	isFilter,
	handleFilter,
	filters,
	updateFilter,
	setPriceRange,
	getPriceRangeBucket,
	setSortOption,
	getSortOption,
}: {
	isFilter: boolean;
	handleFilter: () => void;
	filters: PropertySearchFilters;
	updateFilter: <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
	) => void;
	setPriceRange: (
		range: "under-15000" | "15000-30000" | "30000-45000" | "above-45000"
	) => void;
	getPriceRangeBucket: () => string;
	setSortOption: (
		option: "price-asc" | "price-desc" | "newest" | "rating"
	) => void;
	getSortOption: () => string;
}) => {
	// local input for search to avoid double updates
	const [searchInput, setSearchInput] = useState(filters.search);
	const debouncedSearch = useDebounce(searchInput, 500);

	// keep local input in sync when parent changes (e.g., via URL)
	useEffect(() => {
		setSearchInput(filters.search);
	}, [filters.search]);

	// update the search filter when the debounced search changes
	useEffect(() => {
		updateFilter("search", debouncedSearch);
	}, [debouncedSearch, updateFilter]);

	return (
		<div className="flex flex-row p-4 w-full items-center gap-4 bg-white">
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
			<div className="flex flex-row justify-center relative w-80">
				<Input
					type="text"
					placeholder="Search"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="focus-visible:ring-1"
				/>
				<SearchIcon className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" />
			</div>

			<div className="flex flex-row gap-3 flex-1">
				{/* Price Range - map labels to numeric min/max */}
				<SelectDropDown
					field={{
						onChange: (value: string) =>
							setPriceRange(
								value as
									| "under-15000"
									| "15000-30000"
									| "30000-45000"
									| "above-45000"
							),
						value: getPriceRangeBucket(),
					}}
					options={[
						{ label: "Under ₹15000", value: "under-15000" },
						{ label: "₹15000 - ₹30000", value: "15000-30000" },
						{ label: "₹30000 - ₹45000", value: "30000-45000" },
						{ label: "Above ₹45000", value: "above-45000" },
					]}
					placeholder="Price"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateFilter("beds", parseInt(value));
						},
						value: filters.beds?.toString() || "",
					}}
					options={[
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4", value: "4" },
						{ label: "5", value: "5" },
					]}
					placeholder="Beds"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateFilter("baths", parseInt(value));
						},
						value: filters.baths?.toString() || "",
					}}
					options={[
						{ label: "1", value: "1" },
						{ label: "2", value: "2" },
						{ label: "3", value: "3" },
						{ label: "4", value: "4" },
						{ label: "5", value: "5" },
					]}
					placeholder="Baths"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							updateFilter("propertyType", value as PropertyType);
						},
						value: filters.propertyType || "",
					}}
					options={[
						{ label: "Apartment", value: PropertyType.Apartment },
						{ label: "Villa", value: PropertyType.Villa },
						{ label: "Townhouse", value: PropertyType.Townhouse },
						{ label: "Cottage", value: PropertyType.Cottage },
						{ label: "Tinyhouse", value: PropertyType.Tinyhouse },
						{ label: "Rooms", value: PropertyType.Rooms },
					]}
					placeholder="Property Type"
				/>
				<DatePicker
					date={filters.moveInDate}
					setDate={(date) => updateFilter("moveInDate", date)}
					label="Move In Date"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) =>
							setSortOption(
								value as "price-asc" | "price-desc" | "newest" | "rating"
							),
						value: getSortOption(),
					}}
					options={[
						{ label: "Price: Low to High", value: "price-asc" },
						{ label: "Price: High to Low", value: "price-desc" },
						{ label: "Newest", value: "newest" },
						{ label: "Rating", value: "rating" },
					]}
					placeholder="Sort"
				/>
			</div>

			<div className="flex flex-row justify-center relative rounded-lg border border-gray-200 bg-gray-50">
				<Button variant="ghost" className="hover:bg-gray-100">
					<GridIcon className="w-4 h-4" />
				</Button>
				<Separator orientation="vertical" className="h-6" />
				<Button variant="ghost" className="hover:bg-gray-100">
					<ListIcon className="w-4 h-4" />
				</Button>
			</div>
		</div>
	);
};

export default TopFilterSearch;
