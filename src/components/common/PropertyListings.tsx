import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import PropertyCard from "./PropertyCard";

const PropertyListings = ({ className }: { className: string }) => {
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
			<PropertyCard />
			<PropertyCard />
			<PropertyCard />
		</div>
	);
};

export default PropertyListings;
