import { Amenity, Highlight, PropertyType } from "@/utils/enums";

export interface Property {
	id: string;
	title: string;
	description: string;
	price: number;
	amenities: string[];
	beds: number;
	baths: number;
	averageRating: number;
	hostName: string;
	images: string[];
	videos: string[];
	applicationFee?: number;
	highlights?: string[];
	isAvailable?: boolean;
	isParkingIncluded?: boolean;
	createdAt: Date;
	updatedAt: Date;
	postedDate: Date;
	landlord: {
		name: string;
		email: string;
	};
	location: {
		coordinates: {
			latitude: number;
			longitude: number;
		};
		address: string;
		city: string;
		state: string;
		country: string;
	};
	minLeaseTerm: number;
	pricePerMonth: number;
	propertyType: string;
	squareFeet: number;
	securityDeposit: number;
	numberOfReviews: number;
	photoUrls: string[];
}

export interface PropertySearchRequest {
	title?: string;
	description?: string;
	price?: number;
	location?: string;
	beds?: number;
	baths?: number;
	squareFeet?: number;
	averageRating?: number;
	reviews?: number;
	hostName?: string;
	image?: string;
	moveInDate?: Date;
	city?: string;
	state?: string;
	lat?: string;
	lng?: string;
	radius?: string;
	homeType?: string;
	specialtyHousing?: string;
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
	search: string;
	propertyType?: string;
	priceRange?: number[];
	amenities?: string[];
	isAvailable?: boolean;
}

export interface PropertySearchResponse {
	appliedFilters: {
		page: number;
		limit: number;
	};
	data: {
		properties: Property[];
	};
	message: string;
	pagination: {
		currentPage: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
	success: boolean;
}

//================================NEW========================================

export interface newProperty {
	id: string;
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
			latitude: number;
			longitude: number;
		};
	};
	landlord: {
		name: string;
		email: string;
	};
	minLeaseTerm: number;
	isAvailable: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface newPropertySearchFilters {
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

export interface newPropertySearchRequest {
	success: boolean;
	message: string;
	data: {
		properties: newProperty[];
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
