import { useGetAllApplicationsByLandlord } from "@/services/applicationService";
import PropertyApplicationCard from "@/components/common/PropertyApplicationCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationStatus } from "@/utils/enums";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandlordApplications = () => {
	const {
		data: allApplications,
		isLoading: isLoadingAllApplications,
		fetchNextPage: fetchNextPageAllApplications,
		hasNextPage: hasNextPageAllApplications,
	} = useGetAllApplicationsByLandlord(10, "all");
	const {
		data: pendingApplications,
		isLoading: isLoadingPendingApplications,
		fetchNextPage: fetchNextPagePendingApplications,
		hasNextPage: hasNextPagePendingApplications,
	} = useGetAllApplicationsByLandlord(10, ApplicationStatus.Pending);
	const {
		data: rejectedApplications,
		isLoading: isLoadingRejectedApplications,
		fetchNextPage: fetchNextPageRejectedApplications,
		hasNextPage: hasNextPageRejectedApplications,
	} = useGetAllApplicationsByLandlord(10, ApplicationStatus.Rejected);
	const {
		data: approvedApplications,
		isLoading: isLoadingApprovedApplications,
		fetchNextPage: fetchNextPageApprovedApplications,
		hasNextPage: hasNextPageApprovedApplications,
	} = useGetAllApplicationsByLandlord(10, ApplicationStatus.Approved);

	//flatMap the pages to get all applications
	const viewAllApplications = allApplications?.pages.flatMap(
		(page) => page.applications
	);
	const viewPendingApplications = pendingApplications?.pages.flatMap(
		(page) => page.applications
	);
	const viewRejectedApplications = rejectedApplications?.pages.flatMap(
		(page) => page.applications
	);
	const viewApprovedApplications = approvedApplications?.pages.flatMap(
		(page) => page.applications
	);

	return (
		<div className="flex flex-col gap-4 w-full p-4">
			<h1 className="text-2xl font-bold">Applications</h1>
			<Tabs defaultValue="viewAll" className="w-full">
				<TabsList>
					<TabsTrigger value="viewAll" className="w-full cursor-pointer">
						View All
					</TabsTrigger>
					<TabsTrigger value="pending" className="w-full cursor-pointer">
						Pending
					</TabsTrigger>
					<TabsTrigger value="rejected" className="w-full cursor-pointer">
						Rejected
					</TabsTrigger>
					<TabsTrigger value="approved" className="w-full cursor-pointer">
						Approved
					</TabsTrigger>
				</TabsList>
				<TabsContent value="viewAll">
					{isLoadingAllApplications ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : viewAllApplications?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No applications found</p>
						</div>
					) : (
						viewAllApplications?.map((application) => (
							<PropertyApplicationCard
								key={application._id}
								application={application}
							/>
						))
					)}

					{hasNextPageAllApplications && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPageAllApplications()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
				<TabsContent value="pending">
					{isLoadingPendingApplications ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : viewPendingApplications?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No applications found</p>
						</div>
					) : (
						viewPendingApplications?.map((application) => (
							<PropertyApplicationCard
								key={application._id}
								application={application}
							/>
						))
					)}

					{hasNextPagePendingApplications && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPagePendingApplications()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
				<TabsContent value="rejected">
					{isLoadingRejectedApplications ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : viewRejectedApplications?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No applications found</p>
						</div>
					) : (
						viewRejectedApplications?.map((application) => (
							<PropertyApplicationCard
								key={application._id}
								application={application}
							/>
						))
					)}

					{hasNextPageRejectedApplications && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPageRejectedApplications()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
				<TabsContent value="approved">
					{isLoadingApprovedApplications ? (
						<div className="flex justify-center items-center h-full">
							<Loader2 className="w-4 h-4 animate-spin" />
						</div>
					) : viewApprovedApplications?.length === 0 ? (
						<div className="flex flex-col gap-4">
							<p className="text-sm text-gray-500">No applications found</p>
						</div>
					) : (
						viewApprovedApplications?.map((application) => (
							<PropertyApplicationCard
								key={application._id}
								application={application}
							/>
						))
					)}

					{hasNextPageApprovedApplications && (
						<div className="flex justify-center items-center mt-4">
							<Button
								variant="default"
								className="cursor-pointer"
								onClick={() => fetchNextPageApprovedApplications()}
							>
								Load More
							</Button>
						</div>
					)}
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default LandlordApplications;
