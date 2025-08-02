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
import type { newPropertySearchFilters } from "@/types/property";

const TopFilterSearch = ({
	isFilter,
	handleFilter,
	searchFilters,
	updateSearchFilter,
	buildSearchQuery,
	handleApplyFilters,
	handleClearFilters,
}: {
	isFilter: boolean;
	handleFilter: () => void;
	searchFilters: newPropertySearchFilters;
	updateSearchFilter: <K extends keyof newPropertySearchFilters>(
		key: K,
		value: newPropertySearchFilters[K]
	) => void;
	buildSearchQuery: () => Record<string, string>;
	handleApplyFilters: () => void;
	handleClearFilters: () => void;
}) => {
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
				<Input type="text" placeholder="Search" />
				<SearchIcon className="w-4 h-4 absolute right-6 top-1/2 -translate-y-1/2 text-gray-500" />
			</div>

			<div className="flex flex-row gap-2 flex-1/6">
				{/* Price Range */}
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							console.log(value);
						},
						value: "",
					}}
					options={[
						{ label: "Under ₹15000", value: "under 15000" },
						{ label: "₹15000 - ₹30000", value: "15000-30000" },
						{ label: "₹30000 - ₹45000", value: "30000-45000" },
						{ label: "Above ₹45000", value: "above 45000" },
					]}
					placeholder="Price"
				/>
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							console.log(value);
						},
						value: "",
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
							console.log(value);
						},
						value: "",
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
							console.log(value);
						},
						value: "",
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
				<DatePicker date={undefined} setDate={() => {}} label="Move In Date" />
				<SelectDropDown
					field={{
						onChange: (value: string) => {
							console.log(value);
						},
						value: "",
					}}
					options={[
						{ label: "Price: Low to High", value: "pricelow" },
						{ label: "Price: High to Low", value: "pricehigh" },
						{ label: "Newest", value: "newest" },
						{ label: "Rating", value: "rating" },
					]}
					placeholder="Sort"
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
