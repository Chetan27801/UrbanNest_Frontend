import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { FaHeart, FaStar } from "react-icons/fa";
import { BedIcon, BathIcon } from "lucide-react";
import { FaSwimmingPool } from "react-icons/fa";
import type { Property } from "@/types/property";
import { Amenity } from "@/utils/enums";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ChatButton from "@/components/chat/ChatButton";

const PropertyCard = ({ property }: { property: Property }) => {
	const navigate = useNavigate();
	const { user } = useAuth();

	return (
		<Card
			className="w-auto h-auto flex flex-col gap-2 cursor-pointer"
			onClick={() => navigate(`/property/${property._id}`)}
		>
			<CardHeader>
				<div className="flex flex-col gap-2">
					<div className="relative">
						<img
							src={property.photoUrls[0]}
							className="w-full h-48 object-cover rounded-lg"
						/>
						<div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-all duration-300 cursor-pointer">
							<FaHeart className="text-red-500" />
						</div>
					</div>
					<CardTitle>{property.name}</CardTitle>
					<CardDescription>{property.location.address}</CardDescription>
					<div className="flex flex-row justify-between gap-2">
						<div className="flex flex-row items-center gap-2">
							<FaStar />
							<span>{property.averageRating}</span>
						</div>
						<span>₹{property.pricePerMonth}</span>
					</div>
					<Separator />
					<div className="flex flex-row gap-2 items-center justify-between text-sm mx-auto w-full">
						<div className="flex flex-row gap-2">
							<BedIcon />
							<span>{property.beds} Beds</span>
						</div>
						<div className="flex flex-row gap-2">
							<BathIcon />
							<span>{property.baths} Baths</span>
						</div>
						<div className="flex flex-row gap-2">
							<FaSwimmingPool />
							<span>
								{property.amenities
									.find((amenity) => amenity === Amenity.Pool)
									?.toString()}
							</span>
						</div>
					</div>
					{/* Chat Button for Tenants */}
					{user && user.role === "tenant" && (
						<div className="mt-3" onClick={(e) => e.stopPropagation()}>
							<ChatButton
								otherUserId={property.landlord._id}
								otherUserName={property.landlord.name}
								otherUserRole="landlord"
								variant="outline"
								size="sm"
								className="w-full"
							/>
						</div>
					)}
				</div>
			</CardHeader>
		</Card>
	);
};

export default PropertyCard;
