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

// --- PaymentSuccessState ---
export const PaymentSuccessState = {
	Success: "Success",
	Failed: "Failed",
	Loading: "Loading",
} as const;
export type PaymentSuccessState =
	(typeof PaymentSuccessState)[keyof typeof PaymentSuccessState];

// --- LeaseStatus ---
export const LeaseStatus = {
	Active: "Active",
	Pending: "Pending",
	Terminated: "Terminated",
} as const;
export type LeaseStatus = (typeof LeaseStatus)[keyof typeof LeaseStatus];

// --- UserStatus ---
export const UserStatus = {
	Online: "Online",
	Away: "Away",
	Busy: "Busy",
	Offline: "Offline",
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

// --- ConnectionStatus ---
export const ConnectionStatus = {
	Connected: "Connected",
	Disconnected: "Disconnected",
	Connecting: "Connecting",
	Error: "Error",
} as const;
export type ConnectionStatus =
	(typeof ConnectionStatus)[keyof typeof ConnectionStatus];

// --- BroadcastType ---
export const BroadcastType = {
	SocketIO: "socket",
	REST: "rest",
} as const;
export type BroadcastType = (typeof BroadcastType)[keyof typeof BroadcastType];

// --- BroadcastStatus ---
export const BroadcastStatus = {
	Attempted: "Attempted",
	Skipped: "Skipped",
} as const;
export type BroadcastStatus =
	(typeof BroadcastStatus)[keyof typeof BroadcastStatus];

// This helper function now works perfectly with no errors
export const getEnumValues = <T extends Record<string, string>>(
	enumObject: T
): string[] => {
	return Object.values(enumObject);
};
