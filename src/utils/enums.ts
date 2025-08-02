// --- Highlights ---
export const Highlight = {
	HighSpeedInternetAccess: "HighSpeedInternetAccess",
	WasherDryer: "WasherDryer",
	AirConditioning: "AirConditioning",
	Heating: "Heating",
	SmokeFree: "SmokeFree",
	CableReady: "CableReady",
	SatelliteTV: "SatelliteTV",
	DoubleVanities: "DoubleVanities",
	TubShower: "TubShower",
	Intercom: "Intercom",
	SprinklerSystem: "SprinklerSystem",
	RecentlyRenovated: "RecentlyRenovated",
	CloseToTransit: "CloseToTransit",
	GreatView: "GreatView",
	QuietNeighborhood: "QuietNeighborhood",
} as const;
export type Highlight = (typeof Highlight)[keyof typeof Highlight];

// --- Amenities ---
export const Amenity = {
	WasherDryer: "WasherDryer",
	AirConditioning: "AirConditioning",
	Dishwasher: "Dishwasher",
	HighSpeedInternet: "HighSpeedInternet",
	HardwoodFloors: "HardwoodFloors",
	WalkInClosets: "WalkInClosets",
	Microwave: "Microwave",
	Refrigerator: "Refrigerator",
	Pool: "Pool",
	Gym: "Gym",
	Parking: "Parking",
	PetsAllowed: "PetsAllowed",
	WiFi: "WiFi",
} as const;
export type Amenity = (typeof Amenity)[keyof typeof Amenity];

// --- PropertyType ---
export const PropertyType = {
	Rooms: "Rooms",
	Tinyhouse: "Tinyhouse",
	Apartment: "Apartment",
	Villa: "Villa",
	Townhouse: "Townhouse",
	Cottage: "Cottage",
} as const;
export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];

// --- ApplicationStatus ---
export const ApplicationStatus = {
	Pending: "Pending",
	Rejected: "Rejected",
	Approved: "Approved",
} as const;
export type ApplicationStatus =
	(typeof ApplicationStatus)[keyof typeof ApplicationStatus];

// --- PropertyStatus ---
export const PropertyStatus = {
	Available: "Available",
	Occupied: "Occupied",
	UnderMaintenance: "UnderMaintenance",
} as const;
export type PropertyStatus =
	(typeof PropertyStatus)[keyof typeof PropertyStatus];

// --- PaymentStatus ---
export const PaymentStatus = {
	Pending: "Pending",
	Paid: "Paid",
	PartiallyPaid: "PartiallyPaid",
	Overdue: "Overdue",
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

// This helper function now works perfectly with no errors
export const getEnumValues = <T extends Record<string, string>>(
	enumObject: T
): string[] => {
	return Object.values(enumObject);
};
