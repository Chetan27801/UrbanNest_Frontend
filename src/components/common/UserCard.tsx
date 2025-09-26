import type { User } from "@/types/auth";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Mail, Phone, CheckCircle, ShieldAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import ChatButton from "@/components/chat/ChatButton";
import { useAuth } from "@/hooks/useAuth";

interface UserWithTotalProperties extends User {
	totalProperties?: number;
}

interface UserCardProps {
	user: UserWithTotalProperties;
	isTenant?: boolean;
}

const UserCard = ({ user, isTenant }: UserCardProps) => {
	const { user: currentUser } = useAuth();
	const verificationClasses = user.isVerified
		? "border-green-300 bg-green-50 text-green-700"
		: "border-yellow-300 bg-yellow-50 text-yellow-700";

	// Determine if chat button should be shown
	const shouldShowChat = () => {
		if (!currentUser || currentUser.id === user.id) return false;

		// Admin can chat with anyone
		if (currentUser.role === "admin") return true;

		// Landlord can chat with tenants
		if (currentUser.role === "landlord" && user.role === "tenant") return true;

		// Tenant can chat with landlords
		if (currentUser.role === "tenant" && user.role === "landlord") return true;

		return false;
	};

	return (
		<Card className="w-full p-4 transition-all duration-300 border-slate-200 hover:shadow-lg hover:border-blue-300 cursor-pointer">
			<div className="flex items-start gap-4">
				<div className="relative flex-shrink-0">
					<Avatar className="w-20 h-20 border-2 border-white shadow-sm">
						<AvatarImage src={user.avatar || ""} alt={user.name} />
						<AvatarFallback className="text-2xl">
							{user?.name?.charAt(0).toUpperCase() || "T"}
						</AvatarFallback>
					</Avatar>
					{user.isOnline && (
						<div
							className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
							title="Online"
						></div>
					)}
				</div>

				<div className="flex-grow">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-xl font-bold text-slate-800">{user.name}</h3>
							<Badge variant="outline" className="capitalize text-xs mt-1">
								{user.role}
							</Badge>
						</div>
						<Badge
							variant="outline"
							className={`text-xs ${verificationClasses}`}
						>
							{user.isVerified ? (
								<CheckCircle className="w-3 h-3 mr-1.5" />
							) : (
								<ShieldAlert className="w-3 h-3 mr-1.5" />
							)}
							{user.isVerified ? "Verified" : "Unverified"}
						</Badge>
					</div>

					<div className="mt-3 space-y-1 text-sm text-slate-600">
						<a
							href={`mailto:${user.email}`}
							className="flex items-center gap-2 hover:text-blue-600"
						>
							<Mail className="w-4 h-4 text-slate-400" />
							<span>{user.email}</span>
						</a>
						{user.phoneNumber && (
							<a
								href={`tel:${user.phoneNumber}`}
								className="flex items-center gap-2 hover:text-blue-600"
							>
								<Phone className="w-4 h-4 text-slate-400" />
								<span>{user.phoneNumber}</span>
							</a>
						)}
					</div>
					{isTenant && (
						<p className="text-xs text-slate-400 mt-3 text-right">
							Total Properties: {user.totalProperties}
						</p>
					)}

					<div className="flex items-center justify-between mt-3">
						<p className="text-xs text-slate-400">
							Last active:{" "}
							{user.lastActive
								? formatDistanceToNow(new Date(user.lastActive), {
										addSuffix: true,
								  })
								: "N/A"}
						</p>

						{/* Chat Button */}
						{shouldShowChat() && (
							<ChatButton
								otherUserId={user.id}
								otherUserName={user.name}
								otherUserRole={user?.role || ""}
								variant="outline"
								size="sm"
							/>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default UserCard;
