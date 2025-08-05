import { useInfiniteProperties } from "@/services/propertyService";
import PropertyCard from "@/components/common/PropertyCard";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const AdminProperties = () => {
	const limit = 10;
	const [response, setResponse] = useState<Property[]>([]);
	const { data, isLoading, isError, fetchNextPage, hasNextPage } =
		useInfiniteProperties(limit);

	useEffect(() => {
		setResponse((prev) => {
			if (data?.pages[0]?.properties !== undefined) {
				return [...prev, ...data.pages[data.pages.length - 1].properties];
			}
			return prev;
		});
	}, [data?.pages]);

	if (isError)
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-red-500">Error fetching properties</p>
			</div>
		);

	return (
		<div className="container mx-auto p-6">
			{isLoading ? (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="w-4 h-4 animate-spin" />
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{response?.map((property: Property) => (
						<PropertyCard key={property._id} property={property} />
					))}
				</div>
			)}
			{hasNextPage && (
				<div className="flex justify-center mt-6">
					<Button
						variant="default"
						onClick={() => fetchNextPage()}
						className="cursor-pointer"
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
};

export default AdminProperties;
