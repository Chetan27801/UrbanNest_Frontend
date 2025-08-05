import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import PropertyCard from "./PropertyCard";
import type { Property, PropertySearchResponse } from "@/types/property";

const PropertyListings = ({
	className,
	properties,
	pagination,
}: {
	className: string;
	properties: Property[];
	pagination: PropertySearchResponse["data"]["pagination"] | undefined;
}) => {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">
						{pagination?.totalItems} Places in Search Area
					</CardTitle>
					<CardDescription>
						Properties matching your search criteria
					</CardDescription>
				</CardHeader>
			</Card>
			{properties &&
				properties.map((property) => (
					<PropertyCard key={property.id} property={property} />
				))}
		</div>
	);
};

export default PropertyListings;
