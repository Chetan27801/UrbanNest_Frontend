import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllLeases } from "@/services/leaseService";
import { LeaseStatus } from "@/utils/enums";
import type { Lease } from "@/types/lease";
import LeaseCard from "@/components/common/LeaseCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandlordLease = () => {
	const {
		data: allLeases,
		isLoading: isLoadingAllLeases,
		fetchNextPage: fetchNextPageAllLeases,
		hasNextPage: hasNextPageAllLeases,
	} = useGetAllLeases(10, "all");
	const {
		data: activeLeases,
		isLoading: isLoadingActiveLeases,
		fetchNextPage: fetchNextPageActiveLeases,
		hasNextPage: hasNextPageActiveLeases,
	} = useGetAllLeases(10, LeaseStatus.Active);
	const {
		data: terminatedLeases,
		isLoading: isLoadingTerminatedLeases,
		fetchNextPage: fetchNextPageTerminatedLeases,
		hasNextPage: hasNextPageTerminatedLeases,
	} = useGetAllLeases(10, LeaseStatus.Terminated);

	const allLeasesData = allLeases?.pages.flatMap((page) => page.leases);
	const activeLeasesData = activeLeases?.pages.flatMap((page) => page.leases);
	const terminatedLeasesData = terminatedLeases?.pages.flatMap(
		(page) => page.leases
	);

	return (
		<div className="flex flex-col gap-4 w-full p-4">
			<h1 className="text-2xl font-bold">Applications</h1>
			<Tabs defaultValue="viewAll" className="w-full">
				<TabsList>
					<TabsTrigger value="viewAll" className="w-full cursor-pointer">
						View All
					</TabsTrigger>
					<TabsTrigger value="active" className="w-full cursor-pointer">
						Active
					</TabsTrigger>
					<TabsTrigger value="terminated" className="w-full cursor-pointer">
						Terminated
					</TabsTrigger>
				</TabsList>
				<TabsContent value="viewAll">
					{isLoadingAllLeases ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : allLeasesData?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No leases found</p>
						</div>
					) : (
						allLeasesData?.map((lease: Lease) => (
							<LeaseCard key={lease._id} lease={lease} />
						))
					)}
					{hasNextPageAllLeases && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPageAllLeases()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
				<TabsContent value="active">
					{isLoadingActiveLeases ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : activeLeasesData?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No active leases found</p>
						</div>
					) : (
						activeLeasesData?.map((lease: Lease) => (
							<LeaseCard key={lease._id} lease={lease} />
						))
					)}
					{hasNextPageActiveLeases && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPageActiveLeases()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
				<TabsContent value="terminated">
					{isLoadingTerminatedLeases ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : terminatedLeasesData?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">
								No terminated leases found
							</p>
						</div>
					) : (
						terminatedLeasesData?.map((lease: Lease) => (
							<LeaseCard key={lease._id} lease={lease} />
						))
					)}
				</TabsContent>
				{hasNextPageTerminatedLeases && (
					<div className="flex justify-center items-center mt-4">
						<Button
							variant="default"
							className="cursor-pointer"
							onClick={() => fetchNextPageTerminatedLeases()}
						>
							Load More
						</Button>
					</div>
				)}
			</Tabs>
		</div>
	);
};

export default LandlordLease;
