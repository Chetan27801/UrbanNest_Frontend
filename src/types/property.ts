import { Amenity, Highlight, PropertyType } from "@/utils/enums";

export interface Property {
	_id: string;
	name: string;
	description: string;
	pricePerMonth: number;
	securityDeposit: number;
	applicationFee: number;
	photoUrls: string[];
	amenities: Amenity[];
	highlights: Highlight[];
	isPetsAllowed: boolean;
	isParkingIncluded: boolean;
	beds: number;
	baths: number;
	squareFeet: number;
	propertyType: PropertyType;
	postedDate: Date;
	averageRating: number;
	numberOfReviews: number;
	location: {
		address: string;
		city: string;
		state: string;
		country: string;
		postalCode: string;
		coordinates: {
			coordinates: [number, number];
		};
	};
	landlord: {
		name: string;
		email: string;
		phoneNumber: string;
		avatar: string;
	};
	minLeaseTerm: number;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface PropertySearchFilters {
	moveInDate?: Date;
	page: number;
	limit: number;
	sortBy?: string;
	sortOrder?: string;
	search?: string;
	minPrice?: number;
	maxPrice?: number;
	propertyType?: PropertyType;
	beds?: number;
	baths?: number;
	minSquareFeet?: number;
	maxSquareFeet?: number;
	city?: string;
	state?: string;
	lat?: number;
	lng?: number;
	radius?: number;
	hasPool?: boolean;
	hasGym?: boolean;
	hasParking?: boolean;
	hasPetFriendly?: boolean;
	hasWifi?: boolean;
	hasCable?: boolean;
	hasDishwasher?: boolean;
	amenities?: Amenity[];
	highlights?: Highlight[];
}

export interface PropertySearchRequest {
	success: boolean;
	message: string;
	data: {
		properties: Property[];
	};
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
	appliedFilters: {
		page: number;
		limit: number;
	};
}

export interface PropertySearchResponse {
	success: boolean;
	message: string;
	data: {
		properties: Property[];
	};
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
	appliedFilters: {
		page: number;
		limit: number;
	};
}

export interface PropertyResponse {
	success: boolean;
	message: string;
	properties: Property[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
	};
}

export interface PropertyDetailResponse {
	success: boolean;
	message: string;
	data: Property;
}
