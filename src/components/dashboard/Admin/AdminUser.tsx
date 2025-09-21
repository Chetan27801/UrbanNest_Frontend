import { useInfiniteUsers } from "@/services/userService";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/common/UserCard";

const AdminUser = () => {
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

	if (isError) {
		return (
			<div className="flex justify-center items-center h-full">
				<p className="text-red-500">Error fetching users</p>
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

export default AdminUser;
