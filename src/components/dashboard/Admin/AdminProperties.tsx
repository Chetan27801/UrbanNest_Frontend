import { useInfiniteProperties } from "@/services/propertyService";
import PropertyCard from "@/components/common/PropertyCard";
import { Button } from "@/components/ui/button";
import type { Property } from "@/types/property";
import { ArrowDownIcon, Loader2 } from "lucide-react";

const AdminProperties = () => {
	const limit = 10;
	const { data, isLoading, isError, fetchNextPage, hasNextPage } =
		useInfiniteProperties(limit);

	const allProperties = data?.pages?.flatMap((page) => page.properties) || [];

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
					{allProperties?.map((property: Property) => (
						<PropertyCard key={property._id} property={property} />
					))}
				</div>
			)}
			{hasNextPage && (
				<Button
					onClick={() => fetchNextPage()}
					className="flex flex-row items-center gap-2"
				>
					Load More
					<ArrowDownIcon className="w-4 h-4 animate-bounce" />
				</Button>
			)}
		</div>
	);
};

export default AdminProperties;
