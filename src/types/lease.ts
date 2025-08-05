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
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}
