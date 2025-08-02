import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import PropertyCard from "./PropertyCard";
import type { Property } from "@/types/property";

const PropertyListings = ({
	className,
	properties,
}: {
	className: string;
	properties: Property[];
}) => {
	return (
		<div className={cn("flex flex-col gap-4", className)}>
			<Card>
				<CardHeader>
					<CardTitle className="text-lg">{10} Places in Search Area</CardTitle>
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
