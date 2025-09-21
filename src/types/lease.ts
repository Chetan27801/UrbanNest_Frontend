import type { LeaseStatus } from "@/utils/enums";
import type { Application } from "./application";
import type { User } from "./auth";
import type { Property } from "./property";

export interface Lease {
	_id: string;
	startDate: Date;
	endDate: Date;
	rent: number;
	deposit: number;
	property: Property;
	tenant: User;
	landlord: User;
	application: Application;
	isActive: LeaseStatus;
	createdAt: Date;
	updatedAt: Date;
}

export interface LeaseResponse {
	leases: Lease[];
	pagination: {
		page: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
}
