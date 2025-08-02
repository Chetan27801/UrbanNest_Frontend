import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import { PropertyType } from "@/utils/enums";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineVilla } from "react-icons/md";
import { BiBuildings } from "react-icons/bi";
import { TbBuildingEstate, TbBuildingCottage } from "react-icons/tb";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { amenities } from "@/utils/Constants";
import type { PropertySearchFilters } from "@/types/property";
import { useState } from "react";

const LeftFilterSidebar = ({
	className,
	initialSearchFilters,
	handleClearFilters,
	handleApplyFilters,
	updateSearchFilter,
}: {
	className: string;
	initialSearchFilters: PropertySearchFilters;
	handleClearFilters: () => void;
	handleApplyFilters: () => void;
	updateSearchFilter: <K extends keyof PropertySearchFilters>(
		key: K,
		value: PropertySearchFilters[K]
	) => void;
}) => {
	const [searchFilters, setSearchFilters] = useState(initialSearchFilters);

	const handleFilter = () => {
		updateSearchFilter("propertyType", searchFilters.propertyType!);
		updateSearchFilter("minPrice", searchFilters.minPrice!);
		updateSearchFilter("maxPrice", searchFilters.maxPrice!);
		updateSearchFilter("amenities", searchFilters.amenities!);
		updateSearchFilter("moveInDate", searchFilters.moveInDate!);
		updateSearchFilter("sortBy", searchFilters.sortBy!);
		updateSearchFilter("sortOrder", searchFilters.sortOrder!);
		updateSearchFilter("search", searchFilters.search!);
		updateSearchFilter("beds", searchFilters.beds!);
		updateSearchFilter("baths", searchFilters.baths!);
		updateSearchFilter("minSquareFeet", searchFilters.minSquareFeet!);
		updateSearchFilter("maxSquareFeet", searchFilters.maxSquareFeet!);
		updateSearchFilter("city", searchFilters.city!);
		updateSearchFilter("state", searchFilters.state!);
		updateSearchFilter("lat", searchFilters.lat!);
		updateSearchFilter("lng", searchFilters.lng!);
		updateSearchFilter("radius", searchFilters.radius!);
		updateSearchFilter("hasPool", searchFilters.hasPool!);
		updateSearchFilter("hasGym", searchFilters.hasGym!);
		updateSearchFilter("hasParking", searchFilters.hasParking!);
		updateSearchFilter("hasPetFriendly", searchFilters.hasPetFriendly!);
		updateSearchFilter("hasWifi", searchFilters.hasWifi!);
		updateSearchFilter("hasCable", searchFilters.hasCable!);
		updateSearchFilter("hasDishwasher", searchFilters.hasDishwasher!);
		updateSearchFilter("highlights", searchFilters.highlights!);
		handleApplyFilters();
	};

	return (
		// I've removed the red background color for a cleaner look
		<div className={cn("flex p-4 border-r flex-col gap-2", className)}>
			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Property Type</h1>
				<div className="grid grid-cols-2 gap-2">
					<Button
						variant="outline"
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Apartment,
							});
						}}
					>
						<FaRegBuilding style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Apartment}</span>
					</Button>
					<Button
						variant="outline"
						className="h-auto w-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Villa,
							});
						}}
					>
						<MdOutlineVilla style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Villa}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Townhouse,
							});
						}}>
						<BiBuildings style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Townhouse}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Cottage,
							});
						}}>
						<TbBuildingCottage style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Cottage}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Tinyhouse,
							});
						}}>
						<TbBuildingEstate style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Tinyhouse}</span>
					</Button>
					<Button variant="outline" className="h-auto flex flex-col gap-2 p-4"
						onClick={() => {
							setSearchFilters({
								...searchFilters,
								propertyType: PropertyType.Rooms,
							});
						}}>
						<IoHomeOutline style={{ width: 18, height: 18 }} />
						<span>{PropertyType.Rooms}</span>
					</Button>
				</div>
			</div>

			<Separator className="max-w-full my-2 bg-gray-300" />

			<div className="flex flex-col gap-4">
				<h1 className="text-md font-bold">Price Range</h1>
				<div className="flex items-center gap-2">
					<span className="text-md font-bold">Min</span>
					<Input type="number" placeholder="Min Price"
						value={searchFilters.minPrice}
						onChange={(e) => setSearchFilters({
							...searchFilters,
							minPrice: parseInt(e.target.value),
						})}
					/>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-md font-bold">Max</span>
					<Input type="number" placeholder="Max Price"
						value={searchFilters.maxPrice}
						onChange={(e) => setSearchFilters({
							...searchFilters,
							maxPrice: parseInt(e.target.value),
						})}
					/>
				</div>
			</div>
			<Separator className="max-w-full my-2 bg-gray-300" />
			<div className="flex flex-col gap-4 text-sm">
				<h1 className="text-md font-bold">Conveniences</h1>
				<div className="flex flex-wrap gap-2">
					{amenities.map((amenity) => (
						<Button
							variant="outline"
							className="h-auto flex flex-row gap-2 p-2"
							onClick={() => {
								setSearchFilters({
									...searchFilters,
									propertyType: searchFilters.propertyType,
									minPrice: searchFilters.minPrice,
									maxPrice: searchFilters.maxPrice,	
									moveInDate: searchFilters.moveInDate,
									sortBy: searchFilters.sortBy,
									sortOrder: searchFilters.sortOrder,
									search: searchFilters.search,
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
									highlights: searchFilters.highlights,
								});
							}}
						>
							<amenity.icon />
							<span className="text-sm">{amenity.label}</span>
						</Button>
					))}
				</div>
			</div>

			<Button variant="default" className="h-auto flex flex-row gap-2 p-2 mt-2"
				onClick={handleFilter}>
				<span>Apply</span>
			</Button>
			<Button variant="outline" className="h-auto flex flex-row gap-2 p-2 mt-2"
				onClick={handleClearFilters}>
				<span>Clear All</span>
			</Button>
		</div>
	);
};

export default LeftFilterSidebar;
