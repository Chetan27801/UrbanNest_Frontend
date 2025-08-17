import { cn } from "@/lib/utils";

import PropertyCard from "./PropertyCard";
import type { Property } from "@/types/property";
import { Button } from "../ui/button";
import { ArrowDownIcon, Loader2 } from "lucide-react";

const PropertyListings = ({
	className,
	allProperties,
	pagination,
	fetchNextPage,
	hasNextPage,
	isFetchingNextPage,
}: {
	className: string;
	allProperties: Property[];
	pagination: {
		page: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
	fetchNextPage: () => void;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-4 overflow-y-auto pb-4 bg-white rounded-lg shadow-sm border",
				className
			)}
		>
			<div className="p-4 border-b bg-gray-50">
				<h2 className="text-xl font-semibold text-gray-900">
					{pagination?.totalItems} Properties Found
				</h2>
				<p className="text-sm text-gray-600 mt-1">
					Properties matching your search criteria
				</p>
			</div>

			<div className="px-4 space-y-4">
				{allProperties &&
					allProperties.map((property, index) => (
						<PropertyCard
							key={`${property._id}-${index}`}
							property={property}
						/>
					))}
			</div>
			{hasNextPage && (
				<div className="px-4 pb-4">
					<Button
						onClick={fetchNextPage}
						disabled={isFetchingNextPage}
						className="w-full flex flex-row items-center justify-center gap-2 py-3"
						variant="outline"
					>
						{isFetchingNextPage ? (
							<>
								<Loader2 className="w-4 h-4 animate-spin" />
								Loading...
							</>
						) : (
							<>
								Load More Properties
								<ArrowDownIcon className="w-4 h-4 animate-bounce" />
							</>
						)}
					</Button>
				</div>
			)}
		</div>
	);
};

export default PropertyListings;
