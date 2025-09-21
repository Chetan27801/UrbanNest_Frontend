import PropertyCard from "@/components/common/PropertyCard";
import { Button } from "@/components/ui/button";
import { useInfiniteProperties } from "@/services/propertyService";
import type { Property } from "@/types/property";
import Loader from "@/components/common/Loader";

const LandlordProperties = () => {
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
					<Loader />
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{allProperties?.map((property: Property) => (
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
export default LandlordProperties;
