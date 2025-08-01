import {
	Select,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	FilterIcon,
	SearchIcon,
	HeartIcon,
	StarIcon,
	MapPinIcon,
	PlusIcon,
	MinusIcon,
	SettingsIcon,
	GridIcon,
	ListIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { usePropertySearch } from "@/services/propertyService";

import { useSearchParams } from "react-router-dom";
import DatePicker from "@/components/common/DatePicker";
import { propertyTypes, conveniences } from "@/utils/Constants";
import type {
	PropertySearchRequest,
	Property,
	PropertySearchResponse,
} from "@/types/property";

interface SearchFilters {
	location: string;
	priceMin: number;
	priceMax: number;
	priceRange: string;
	beds: string;
	baths: string;
	squareFeet: string;
	minSquareFeet: string;
	maxSquareFeet: string;
	city: string;
	state: string;
	homeType: string;
	lat: string;
	lng: string;
	radius: string;
	specialtyHousing: string;
	moveInDate: Date | undefined;
	sortBy: string;
	propertyTypes: string[];
	conveniences: string[];
}

const initialSearchFilters: SearchFilters = {
	location: "",
	priceMin: 0,
	priceMax: 1200,
	priceRange: "",
	beds: "",
	baths: "",
	squareFeet: "",
	minSquareFeet: "",
	maxSquareFeet: "",
	city: "",
	state: "",
	lat: "",
	lng: "",
	radius: "",
	homeType: "",
	specialtyHousing: "",
	moveInDate: undefined,
	sortBy: "",
	propertyTypes: [],
	conveniences: [],
};

const SearchPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

	// Initialize search filters from URL params or defaults
	const [searchFilters, setSearchFilters] =
		useState<SearchFilters>(initialSearchFilters);

	useEffect(() => {
		setSearchFilters((prev) => ({
			...prev,
			location: searchParams.get("location") || "",
			priceMin: parseInt(searchParams.get("priceMin") || "0"),
			priceMax: parseInt(searchParams.get("priceMax") || "1200"),
			priceRange: searchParams.get("priceRange") || "",
			beds: searchParams.get("beds") || "",
			baths: searchParams.get("baths") || "",
			squareFeet: searchParams.get("squareFeet") || "",
			minSquareFeet: searchParams.get("minSquareFeet") || "",
			maxSquareFeet: searchParams.get("maxSquareFeet") || "",
			city: searchParams.get("city") || "",
			state: searchParams.get("state") || "",
			lat: searchParams.get("lat") || "",
			lng: searchParams.get("lng") || "",
			radius: searchParams.get("radius") || "",
			homeType: searchParams.get("homeType") || "",
			specialtyHousing: searchParams.get("specialtyHousing") || "",
			moveInDate: searchParams.get("moveInDate")
				? new Date(searchParams.get("moveInDate")!)
				: undefined,
			sortBy: searchParams.get("sortBy") || "",
			propertyTypes:
				searchParams.get("propertyTypes")?.split(",").filter(Boolean) || [],
			conveniences:
				searchParams.get("conveniences")?.split(",").filter(Boolean) || [],
		}));
	}, [searchParams]);

	// Build search query for API
	const buildSearchQuery = (): PropertySearchRequest => {
		const query = {
			search: searchFilters.location || "",
			price: searchFilters.priceMin || undefined,
			beds: searchFilters.beds ? parseInt(searchFilters.beds) : undefined,
			baths: searchFilters.baths ? parseInt(searchFilters.baths) : undefined,
			squareFeet: searchFilters.squareFeet
				? parseInt(searchFilters.squareFeet)
				: undefined,
			city: searchFilters.city || undefined,
			state: searchFilters.state || undefined,
			lat: searchFilters.lat || undefined,
			lng: searchFilters.lng || undefined,
			radius: searchFilters.radius || undefined,
			propertyType: searchFilters.homeType || undefined,
			amenities:
				searchFilters.conveniences.length > 0
					? searchFilters.conveniences
					: undefined,
			moveInDate: searchFilters.moveInDate || undefined,
			sortBy: searchFilters.sortBy || undefined,
			isAvailable: true,
		};

		return query;
	};

	const { isLoading, isError, refetch } = usePropertySearch(
		buildSearchQuery(),
		true
	);

	// Update search filters
	const updateSearchFilter = <K extends keyof SearchFilters>(
		key: K,
		value: SearchFilters[K]
	) => {
		setSearchFilters((prev) => ({ ...prev, [key]: value }));
	};

	// Apply all filters and search
	const handleApplyFilters = () => {
		const params = new URLSearchParams();
		Object.entries(searchFilters).forEach(([key, value]) => {
			if (value !== undefined && value !== "" && value !== null) {
				if (Array.isArray(value)) {
					if (value.length > 0) {
						params.set(key, value.join(","));
					}
				} else if (value instanceof Date) {
					params.set(key, value.toISOString());
				} else {
					params.set(key, value.toString());
				}
			}
		});
		setSearchParams(params);
		refetch();
	};

	// Clear all filters
	const handleClearFilters = () => {
		setSearchFilters(initialSearchFilters);
		setSearchParams(new URLSearchParams());
		refetch(); // Refresh search results with cleared filters
	};

	if (isLoading) {
		return (
			<TooltipProvider>
				<div className="flex flex-col h-screen bg-white">
					<Card className="rounded-none border-x-0 border-t-0 shadow-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<CardContent className="p-4">
							<div className="flex items-center justify-center">
								<Skeleton className="h-8 w-48" />
							</div>
						</CardContent>
					</Card>
					<div className="flex flex-1 overflow-hidden">
						<Card className="w-80 rounded-none border-r border-t-0 border-b-0 border-l-0 shadow-none">
							<CardContent className="p-6 space-y-4">
								<Skeleton className="h-32 w-full" />
								<Skeleton className="h-32 w-full" />
								<Skeleton className="h-32 w-full" />
							</CardContent>
						</Card>
						<div className="flex-1 flex items-center justify-center bg-muted">
							<div className="text-center">
								<Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
								<Skeleton className="h-6 w-32 mx-auto mb-2" />
								<Skeleton className="h-4 w-48 mx-auto" />
							</div>
						</div>
						<Card className="w-96 rounded-none border-l border-t-0 border-b-0 border-r-0 shadow-none">
							<CardContent className="p-6 space-y-4">
								{Array.from({ length: 3 }).map((_, index) => (
									<Card key={index} className="overflow-hidden">
										<Skeleton className="w-full h-48" />
										<CardContent className="p-4 space-y-3">
											<Skeleton className="h-6 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
											<div className="flex gap-4">
												<Skeleton className="h-4 w-16" />
												<Skeleton className="h-4 w-16" />
												<Skeleton className="h-4 w-16" />
											</div>
											<Skeleton className="h-6 w-20 ml-auto" />
										</CardContent>
									</Card>
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</TooltipProvider>
		);
	}

	if (isError) {
		return (
			<TooltipProvider>
				<div className="flex flex-col h-screen bg-white">
					<Card className="rounded-none border-x-0 border-t-0 shadow-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
						<CardContent className="p-4">
							<div className="flex items-center justify-center">
								<CardTitle className="text-destructive">
									Error Loading Properties
								</CardTitle>
							</div>
						</CardContent>
					</Card>
					<div className="flex-1 flex items-center justify-center">
						<Card>
							<CardContent className="p-8 text-center">
								<CardTitle className="text-destructive mb-2">
									Oops! Something went wrong
								</CardTitle>
								<CardDescription className="mb-4">
									We couldn't load the properties. Please try again later.
								</CardDescription>
								<Button onClick={() => window.location.reload()}>
									Try Again
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</TooltipProvider>
		);
	}

	return (
		<TooltipProvider>
			<div className="flex flex-col h-screen bg-white">
				{/* Top Filter Bar */}
				<Card className="rounded-none border-x-0 border-t-0 shadow-none bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-4">
								{/* Filter Button with Sheet */}
								<Sheet>
									<SheetTrigger asChild>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant="outline"
													className="flex items-center gap-2"
												>
													<FilterIcon className="w-4 h-4" />
													Filter
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Advanced filters</p>
											</TooltipContent>
										</Tooltip>
									</SheetTrigger>
									<SheetContent side="left" className="w-80">
										<SheetHeader>
											<SheetTitle>Advanced Filters</SheetTitle>
											<SheetDescription>
												Refine your search with detailed filters
											</SheetDescription>
										</SheetHeader>
										<FilterSidebar
											searchFilters={searchFilters}
											updateSearchFilter={updateSearchFilter}
											onApply={handleApplyFilters}
											onClear={handleClearFilters}
										/>
									</SheetContent>
								</Sheet>

								{/* Location Search */}
								<div className="relative">
									<Label htmlFor="location-search" className="sr-only">
										Search location
									</Label>
									<Input
										id="location-search"
										value={searchFilters.location}
										onChange={(e) =>
											updateSearchFilter("location", e.target.value)
										}
										className="w-64 pl-4 pr-10"
										placeholder="Search location"
									/>
									<SearchIcon className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
								</div>

								{/* Filter Dropdowns */}
								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("priceRange", value),
										value: searchFilters.priceRange,
									}}
									options={[
										{ label: "Under $500", value: "under500" },
										{ label: "$500 - $1000", value: "500-1000" },
										{ label: "$1000 - $2000", value: "1000-2000" },
										{ label: "Above $2000", value: "above2000" },
									]}
									placeholder="Price"
								/>

								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("beds", value),
										value: searchFilters.beds,
									}}
									options={[
										{ label: "1 Bed", value: "1" },
										{ label: "2 Beds", value: "2" },
										{ label: "3 Beds", value: "3" },
										{ label: "4+ Beds", value: "4" },
									]}
									placeholder="Beds"
								/>

								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("baths", value),
										value: searchFilters.baths,
									}}
									options={[
										{ label: "1 Bath", value: "1" },
										{ label: "2 Baths", value: "2" },
										{ label: "3 Baths", value: "3" },
										{ label: "4+ Baths", value: "4" },
									]}
									placeholder="Baths"
								/>

								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("homeType", value),
										value: searchFilters.homeType,
									}}
									options={[
										{ label: "Apartment", value: "apartment" },
										{ label: "House", value: "house" },
										{ label: "Condo", value: "condo" },
										{ label: "Studio", value: "studio" },
									]}
									placeholder="Home Type"
								/>

								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("specialtyHousing", value),
										value: searchFilters.specialtyHousing,
									}}
									options={[
										{ label: "Pet Friendly", value: "petfriendly" },
										{ label: "Furnished", value: "furnished" },
										{ label: "Luxury", value: "luxury" },
									]}
									placeholder="Specialty Housing"
								/>

								<DatePicker
									date={searchFilters.moveInDate}
									setDate={(date) => updateSearchFilter("moveInDate", date)}
									label="Move-In Date"
								/>

								<Separator orientation="vertical" className="h-6" />

								<Button onClick={handleApplyFilters} className="px-6">
									Search
								</Button>
							</div>

							<div className="flex items-center gap-4">
								<SelectDropDown
									field={{
										onChange: (value: string) =>
											updateSearchFilter("sortBy", value),
										value: searchFilters.sortBy,
									}}
									options={[
										{ label: "Price: Low to High", value: "pricelow" },
										{ label: "Price: High to Low", value: "pricehigh" },
										{ label: "Newest", value: "newest" },
										{ label: "Rating", value: "rating" },
									]}
									placeholder="Sort"
								/>

								<Separator orientation="vertical" className="h-6" />

								{/* View Mode Toggle */}
								<div className="flex gap-1 p-1 bg-muted rounded-md">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={viewMode === "grid" ? "secondary" : "ghost"}
												size="sm"
												onClick={() => setViewMode("grid")}
											>
												<GridIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>Grid view</p>
										</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={viewMode === "list" ? "secondary" : "ghost"}
												size="sm"
												onClick={() => setViewMode("list")}
											>
												<ListIcon className="w-4 h-4" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>List view</p>
										</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Main Content Area */}
				<div className="flex flex-1 overflow-hidden">
					{/* Left Sidebar - Filters */}
					<Card className="w-80 rounded-none border-r border-t-0 border-b-0 border-l-0 shadow-none">
						<CardContent className="p-6 overflow-y-auto">
							<FilterSidebar
								searchFilters={searchFilters}
								updateSearchFilter={updateSearchFilter}
								onApply={handleApplyFilters}
								onClear={handleClearFilters}
							/>
						</CardContent>
					</Card>

					{/* Center - Map */}
					<div className="flex-1 relative">
						<MapView />
					</div>

					{/* Right Sidebar - Property Listings */}
					<Card className="w-96 rounded-none border-l border-t-0 border-b-0 border-r-0 shadow-none">
						<CardContent className="p-6 overflow-y-auto">
							{<PropertyListings query={buildSearchQuery()} />}
						</CardContent>
					</Card>
				</div>
			</div>
		</TooltipProvider>
	);
};

const SelectDropDown = ({
	field,
	options,
	placeholder,
}: {
	field: {
		onChange: (value: string) => void;
		value: string;
	};
	options: { label: string; value: string }[];
	placeholder: string;
}) => {
	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

const FilterSidebar = ({
	searchFilters,
	updateSearchFilter,
	onApply,
	onClear,
}: {
	searchFilters: SearchFilters;
	updateSearchFilter: <K extends keyof SearchFilters>(
		key: K,
		value: SearchFilters[K]
	) => void;
	onApply: () => void;
	onClear: () => void;
}) => {
	const toggleConvenience = (id: string, checked: boolean) => {
		const newConveniences = checked
			? [...searchFilters.conveniences, id]
			: searchFilters.conveniences.filter((item) => item !== id);
		updateSearchFilter("conveniences", newConveniences);
	};

	const togglePropertyType = (value: string) => {
		const newPropertyTypes = searchFilters.propertyTypes.includes(value)
			? searchFilters.propertyTypes.filter((type) => type !== value)
			: [...searchFilters.propertyTypes, value];
		updateSearchFilter("propertyTypes", newPropertyTypes);
	};

	const updatePriceRange = (min: number, max: number) => {
		updateSearchFilter("priceMin", min);
		updateSearchFilter("priceMax", max);
	};

	return (
		<div className="space-y-6">
			{/* Property Type */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Property Type</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 gap-3">
						{propertyTypes.map((type) => {
							const IconComponent = type.icon;
							const isSelected = searchFilters.propertyTypes.includes(type.id);
							return (
								<Label
									key={type.id}
									htmlFor={type.id}
									className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
										isSelected
											? "border-primary bg-primary/5"
											: "border-border hover:border-border/60"
									}`}
								>
									<Checkbox
										id={type.id}
										checked={isSelected}
										onCheckedChange={() => togglePropertyType(type.id)}
										className="sr-only"
									/>
									<IconComponent className="w-6 h-6 mb-2" />
									<span className="text-sm font-medium">{type.label}</span>
								</Label>
							);
						})}
					</div>
				</CardContent>
			</Card>

			{/* Price Range */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Price Range</CardTitle>
					<CardDescription>Monthly rent range</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative">
						<div className="h-2 bg-muted rounded-full">
							<div
								className="h-2 bg-primary rounded-full transition-all duration-200"
								style={{
									marginLeft: `${(searchFilters.priceMin / 20000) * 100}%`,
									width: `${
										((searchFilters.priceMax - searchFilters.priceMin) /
											20000) *
										100
									}%`,
								}}
							/>
						</div>
					</div>
					<div className="flex justify-between text-sm font-medium">
						<span>₹{searchFilters.priceMin}</span>
						<span>₹{searchFilters.priceMax}</span>
					</div>
					<div className="flex gap-2 flex-wrap">
						<Button
							variant="outline"
							size="sm"
							onClick={() => updatePriceRange(0, 5000)}
						>
							₹0-₹5000
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => updatePriceRange(5000, 10000)}
						>
							₹5000-₹10000
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => updatePriceRange(10000, 20000)}
						>
							₹10000+
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Square Footage */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Square Footage</CardTitle>
					<CardDescription>Property size range</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label htmlFor="min-sqft" className="text-sm font-medium">
								Min Sq Ft
							</Label>
							<Input
								id="min-sqft"
								type="number"
								placeholder="Min"
								value={searchFilters.minSquareFeet}
								onChange={(e) =>
									updateSearchFilter("minSquareFeet", e.target.value)
								}
								className="mt-1"
							/>
						</div>
						<div>
							<Label htmlFor="max-sqft" className="text-sm font-medium">
								Max Sq Ft
							</Label>
							<Input
								id="max-sqft"
								type="number"
								placeholder="Max"
								value={searchFilters.maxSquareFeet}
								onChange={(e) =>
									updateSearchFilter("maxSquareFeet", e.target.value)
								}
								className="mt-1"
							/>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								updateSearchFilter("minSquareFeet", "500");
								updateSearchFilter("maxSquareFeet", "1000");
							}}
						>
							500-1000
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								updateSearchFilter("minSquareFeet", "1000");
								updateSearchFilter("maxSquareFeet", "2000");
							}}
						>
							1000-2000
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Conveniences */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Conveniences</CardTitle>
					<CardDescription>Select desired amenities</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-3">
						{conveniences.map((convenience) => {
							const IconComponent = convenience.icon;
							return (
								<div
									key={convenience.id}
									className="flex items-center space-x-3"
								>
									<Checkbox
										id={convenience.id}
										checked={searchFilters.conveniences.includes(
											convenience.id
										)}
										onCheckedChange={(checked) =>
											toggleConvenience(convenience.id, checked as boolean)
										}
									/>
									<Label
										htmlFor={convenience.id}
										className="flex items-center gap-2 cursor-pointer"
									>
										<IconComponent className="w-4 h-4" />
										<span className="text-sm">{convenience.label}</span>
									</Label>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>

			<div className="flex gap-3 mt-6">
				<Button variant="outline" className="flex-1" onClick={onClear}>
					Clear
				</Button>
				<Button className="flex-1" onClick={onApply}>
					Apply
				</Button>
			</div>
		</div>
	);
};

const MapView = () => {
	const [mapType, setMapType] = useState<"map" | "satellite">("map");

	return (
		<div className="w-full h-full bg-blue-50 flex items-center justify-center relative">
			{/* Map placeholder */}
			<Card className="border-0 shadow-none bg-transparent">
				<CardContent className="flex flex-col items-center justify-center p-8">
					<div className="text-6xl mb-4">🗺️</div>
					<CardTitle className="text-xl mb-2 text-muted-foreground">
						Interactive Map
					</CardTitle>
					<CardDescription className="text-center">
						Property locations will be displayed here
					</CardDescription>
				</CardContent>
			</Card>

			{/* Map Controls */}
			<Card className="absolute top-4 right-4 shadow-lg">
				<CardContent className="flex flex-col gap-2 p-2">
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon">
								<PlusIcon className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Zoom in</p>
						</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon">
								<MinusIcon className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Zoom out</p>
						</TooltipContent>
					</Tooltip>
					<Separator />
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon">
								<SettingsIcon className="w-4 h-4" />
							</Button>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p>Map settings</p>
						</TooltipContent>
					</Tooltip>
				</CardContent>
			</Card>

			{/* Toggle between Map and Satellite */}
			<Card className="absolute bottom-4 left-4 shadow-lg">
				<CardContent className="p-2">
					<div className="flex gap-1 p-1 bg-muted rounded-md">
						<Button
							variant={mapType === "map" ? "secondary" : "ghost"}
							size="sm"
							onClick={() => setMapType("map")}
						>
							Map
						</Button>
						<Button
							variant={mapType === "satellite" ? "secondary" : "ghost"}
							size="sm"
							onClick={() => setMapType("satellite")}
						>
							Satellite
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

const PropertyListings = ({ query }: { query: PropertySearchRequest }) => {
	const {
		data: dataResponse,
		isLoading: loading,
		error,
	} = usePropertySearch(query, true) as {
		data: PropertySearchResponse | undefined;
		isLoading: boolean;
		error: Error | null;
	};

	const properties = dataResponse?.data?.properties || [];
	const totalProperties =
		dataResponse?.pagination?.totalItems || properties.length;

	const displayProperties = properties;
	const displayTotal = totalProperties;

	return (
		<div className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{displayTotal} Places in Search Area
					</CardTitle>
					<CardDescription>
						Properties matching your search criteria
					</CardDescription>
				</CardHeader>
			</Card>

			{loading &&
				Array.from({ length: 3 }).map((_, index) => (
					<Card key={index} className="overflow-hidden">
						<Skeleton className="w-full h-48" />
						<CardContent className="p-4 space-y-3">
							<Skeleton className="h-6 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
							<div className="flex gap-4">
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-16" />
								<Skeleton className="h-4 w-16" />
							</div>
							<Skeleton className="h-6 w-20 ml-auto" />
						</CardContent>
					</Card>
				))}
			{displayProperties.map((property: Property) => (
				<Card
					key={property.id}
					className="overflow-hidden hover:shadow-lg transition-shadow"
				>
					<div className="relative">
						<div className="w-full h-48 bg-muted flex items-center justify-center">
							<span className="text-muted-foreground">
								{property.photoUrls?.length && property.photoUrls.length > 0 ? (
									<img
										src={property.photoUrls[0]}
										alt={property.title}
										className="w-full h-full object-cover"
									/>
								) : (
									<span className="text-muted-foreground">
										No images available
									</span>
								)}
							</span>
						</div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
								>
									<HeartIcon className="w-4 h-4" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add to favorites</p>
							</TooltipContent>
						</Tooltip>
					</div>
					<CardContent className="p-4">
						<div className="flex items-start justify-between mb-2">
							<CardTitle className="text-lg">{property.title}</CardTitle>
							<div className="flex items-center gap-1 text-sm">
								<StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
								<span className="font-medium">{property.averageRating}</span>
								<span className="text-muted-foreground">
									({property.numberOfReviews})
								</span>
							</div>
						</div>
						<div className="flex items-center gap-1 mb-3">
							<MapPinIcon className="w-4 h-4 text-muted-foreground" />
							<span className="text-muted-foreground text-sm">
								{property.location.address}
							</span>
						</div>
						<div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground flex-wrap">
							<div className="flex items-center gap-1">
								<span>🛏️</span>
								<span>
									{property.beds} Bed{property.beds !== 1 ? "s" : ""}
								</span>
							</div>
							<Separator orientation="vertical" className="h-4" />
							<div className="flex items-center gap-1">
								<span>🚿</span>
								<span>
									{property.baths} Bath{property.baths !== 1 ? "s" : ""}
								</span>
							</div>
							{property.squareFeet && (
								<>
									<Separator orientation="vertical" className="h-4" />
									<div className="flex items-center gap-1">
										<span>📐</span>
										<span>{property.squareFeet} sq ft</span>
									</div>
								</>
							)}
							{property.amenities
								?.slice(0, 2)
								.map((feature: string, index: number) => (
									<React.Fragment key={`amenity-${index}-${feature}`}>
										<Separator orientation="vertical" className="h-4" />
										<div className="flex items-center gap-1">
											<span>✨</span>
											<span>{feature}</span>
										</div>
									</React.Fragment>
								))}
							{property.amenities && property.amenities.length > 2 && (
								<>
									<Separator orientation="vertical" className="h-4" />
									<span className="text-xs">
										+{property.amenities.length - 2} more
									</span>
								</>
							)}
						</div>
					</CardContent>
					<CardFooter className="p-4 pt-0">
						<Button className="w-full">View Details</Button>
					</CardFooter>
				</Card>
			))}
			{error && (
				<Card>
					<CardContent className="p-8 text-center">
						<CardTitle className="text-destructive mb-2">
							Error Loading Properties
						</CardTitle>
						<CardDescription className="mb-4">
							{error?.message ||
								"Something went wrong while fetching properties"}
						</CardDescription>
						<Button onClick={() => window.location.reload()}>Try Again</Button>
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export default SearchPage;
