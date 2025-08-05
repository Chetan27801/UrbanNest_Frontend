import { useEffect, useState } from "react";
import { useInfiniteUsers } from "@/services/userService";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/common/UserCard";
import type { User } from "@/types/auth";

const AdminUser = () => {
	const limit = 10;
	const [usersData, setUsersData] = useState<User[]>([]);
	const {
		data: users,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isError,
	} = useInfiniteUsers(limit);

	useEffect(() => {
		setUsersData((prev) => {
			if (users?.pages[0]?.users !== undefined) {
				return [...prev, ...users.pages[users.pages.length - 1].users];
			}
			return prev;
		});
	}, [users?.pages]);

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
				usersData?.map((user) => <UserCard key={user.id} user={user} />)
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
