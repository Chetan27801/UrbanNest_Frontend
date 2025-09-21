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
				"flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden",
				className
			)}
			style={{ scrollBehavior: "smooth" }}
		>
			{/* Sticky Header */}
			<div className="sticky top-0 z-10 p-4 border-b bg-gray-50/80 backdrop-blur-sm">
				<h2 className="text-xl font-semibold text-gray-900">
					{pagination?.totalItems || 0} Properties Found
				</h2>
				<p className="text-sm text-gray-600 mt-1">
					{allProperties && allProperties.length > 0
						? "Properties matching your search criteria"
						: "Try adjusting your filters to find more properties"}
				</p>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 overflow-y-auto">
				{allProperties && allProperties.length > 0 ? (
					<>
						<div className="p-4 space-y-4">
							{allProperties.map((property, index) => (
								<div
									key={`${property._id}-${index}`}
									className="transform transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
								>
									<PropertyCard property={property} />
								</div>
							))}
						</div>

						{/* Load More Button */}
						{hasNextPage && (
							<div className="p-4 pt-0">
								<Button
									onClick={fetchNextPage}
									disabled={isFetchingNextPage}
									className="w-full flex flex-row items-center justify-center gap-2 py-3 transition-all duration-200 hover:scale-[1.02]"
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
					</>
				) : (
					/* No Properties Found State */
					<div className="flex flex-col items-center justify-center h-full p-8 text-center">
						<div className="max-w-md mx-auto">
							<div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
									/>
								</svg>
							</div>
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								No Properties Found
							</h3>
							<p className="text-gray-600 mb-4">
								We couldn't find any properties matching your search criteria.
							</p>
							<div className="text-sm text-gray-500">
								<p className="mb-2">Try:</p>
								<ul className="space-y-1 text-left">
									<li>• Adjusting your price range</li>
									<li>• Changing the number of bedrooms or bathrooms</li>
									<li>• Removing some filters</li>
									<li>• Searching in a different area</li>
								</ul>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default PropertyListings;
