import type { ApplicationStatus } from "@/utils/enums";
import type { User } from "./auth";
import type { Lease } from "./lease";
import type { Property } from "./property";

export interface Application {
	_id: string;
	applicationDate: Date;
	status: ApplicationStatus;
	property: Property;
	tenant: User;
	message: string;
	lease: Lease;
	createdAt: Date;
	updatedAt: Date;
}

export interface ApplicationResponse {
	success: boolean;
	message: string;
	data: Application[];
}


