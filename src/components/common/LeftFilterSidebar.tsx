import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Amenity, PropertyType } from "@/utils/enums";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { amenities as amenitiesList } from "@/utils/Constants";
import type { PropertySearchFilters } from "@/types/property";
import { useState, useEffect } from "react";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";

// Define props for clarity
interface LeftFilterSidebarProps {
	className: string;
	searchFilters: PropertySearchFilters; // The currently applied filters from parent
	handleClearFilters: () => void;
	handleApplyFilters: () => void;
	updateSearchFilter: <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
	) => void;
}

const LeftFilterSidebar = ({
	className,
	searchFilters,
	handleClearFilters,
	handleApplyFilters,
	updateSearchFilter,
}: LeftFilterSidebarProps) => {
	// Local state to manage "pending" changes before applying
	const [pendingFilters, setPendingFilters] =
		useState<PropertySearchFilters>(searchFilters);

	// Sync local state if parent state changes (e.g., from URL on initial load)
	useEffect(() => {
		setPendingFilters(searchFilters);
	}, [searchFilters]);

	// Helper to update a single value in the pending state
	const updatePendingFilter = <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
	) => {
		setPendingFilters((prev) => ({ ...prev, [key]: value }));
	};

	// Correctly toggles an amenity in the pending amenities array
	const togglePendingAmenity = (amenity: Amenity) => {
		const currentAmenities = pendingFilters.amenities || [];
		const newAmenities = currentAmenities.includes(amenity)
			? currentAmenities.filter((a) => a !== amenity)
			: [...currentAmenities, amenity];
		updatePendingFilter("amenities", newAmenities);
	};

	// When "Apply" is clicked, send all pending changes to the parent
	const handleApply = () => {
		// This replaces the complex `handleFilter` function
		Object.keys(pendingFilters).forEach((key) => {
			const filterKey = key as keyof PropertySearchFilters;
			updateSearchFilter(filterKey, pendingFilters[filterKey]);
		});
		// Use a timeout to ensure state propagation before applying
		setTimeout(() => {
			handleApplyFilters();
		}, 0);
	};

	// Clear filters in both local and parent state
	const handleClear = () => {
		// We can just call the parent clear function, and the useEffect will sync our pending state
		handleClearFilters();
	};

	return (
		<div className={cn("flex p-4 border-r flex-col gap-2", className)}>
			{/* Property Type Section */}
			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Property Type</h1>
				<div className="grid grid-cols-2 gap-2">
					{/* Simplified and corrected buttons */}
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Apartment
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Apartment)
						}
					>
						<FaRegBuilding style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Apartment}</span>
					</Button>
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Villa
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Villa)
						}
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Villa}</span>
					</Button>
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Cottage
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Cottage)
						}
					>
						<FaRegBuilding style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Cottage}</span>
					</Button>
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Townhouse
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Townhouse)
						}
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Townhouse}</span>
					</Button>
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Tinyhouse
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Tinyhouse)
						}
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Tinyhouse}</span>
					</Button>
					<Button
						variant={
							pendingFilters &&
							pendingFilters.propertyType &&
							pendingFilters.propertyType === PropertyType.Rooms
								? "default"
								: "outline"
						}
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() =>
							updatePendingFilter("propertyType", PropertyType.Rooms)
						}
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Rooms}</span>
					</Button>
				</div>
			</div>

			<Separator className="max-w-full my-2 bg-gray-300" />

			{/* Price Range Section */}
			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Price Range</h1>
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">Min</span>
					<Input
						type="number"
						placeholder="Min Price"
						value={pendingFilters?.minPrice || 1}
						onChange={(e) =>
							updatePendingFilter("minPrice", parseInt(e.target.value) || 1)
						}
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium">Max</span>
					<Input
						type="number"
						placeholder="Max Price"
						value={pendingFilters?.maxPrice || 1000000}
						onChange={(e) =>
							updatePendingFilter(
								"maxPrice",
								parseInt(e.target.value) || 1000000
							)
						}
					/>
				</div>
			</div>

			<Separator className="max-w-full my-2 bg-gray-300" />

			{/* Conveniences Section */}
			<div className="flex flex-col gap-4 text-sm">
				<h1 className="text-md font-bold">Conveniences</h1>
				<div className="flex flex-wrap gap-2">
					{amenitiesList.map((amenity) => (
						<Button
							key={amenity.id}
							variant={
								pendingFilters?.amenities?.includes(amenity.id as Amenity)
									? "default"
									: "outline"
							}
							className="h-auto flex flex-row gap-2 p-2"
							// **LOGIC FIX**: Use the correct toggle function
							onClick={() => togglePendingAmenity(amenity.id as Amenity)}
						>
							<amenity.icon />
							<span className="text-sm">{amenity.label}</span>
						</Button>
					))}
				</div>
			</div>

			<Button
				variant="default"
				className="h-auto flex flex-row gap-2 p-2 mt-auto"
				onClick={handleApply}
			>
				<span>Apply</span>
			</Button>
			<Button
				variant="outline"
				className="h-auto flex flex-row gap-2 p-2"
				onClick={handleClear}
			>
				<span>Clear All</span>
			</Button>
		</div>
	);
};

export default LeftFilterSidebar;
