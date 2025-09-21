import UserCard from "@/components/common/UserCard";
import { useInfiniteUsers } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const LandlordTenants = () => {
	const limit = 10;
	const {
		data: users,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isError,
	} = useInfiniteUsers(limit);

	// Flatten all pages into a single array
	const allUsers = users?.pages.flatMap((page) => page.users) || [];
	console.log(allUsers);

	if (isError) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-red-500">Error fetching users</p>
			</div>
		);
	}

	if (allUsers.length === 0) {
		return (
			<div className="flex items-center h-full">
				<p className="text-slate-500">No tenants found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4 w-full p-4">
			{isLoading ? (
				<div className="flex justify-center items-center h-full">
					<Loader2 className="w-4 h-4 animate-spin" />
				</div>
			) : (
				allUsers.map((user) => <UserCard key={user.id} user={user} />)
			)}
			{hasNextPage && (
				<div className="flex justify-center items-center">
					<Button
						variant="default"
						className="cursor-pointer"
						onClick={() => fetchNextPage()}
					>
						Load More
					</Button>
				</div>
			)}
		</div>
	);
};
export default LandlordTenants;
