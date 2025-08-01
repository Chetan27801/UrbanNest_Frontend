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
