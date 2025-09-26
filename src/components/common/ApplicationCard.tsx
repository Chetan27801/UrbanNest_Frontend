import type { Application } from "@/types/application";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, MessageSquare } from "lucide-react";

const ApplicationCard = ({ application }: { application: Application }) => {

	// Format date
	const formatDate = (date: Date) => {
		return new Date(date).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	// Format price
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "INR",
			minimumFractionDigits: 0,
		}).format(price);
	};

	return (
		<Card className="w-full hover:shadow-lg transition-shadow">
			<CardHeader>
				<div className="flex justify-between items-start">
					<CardTitle className="text-lg font-semibold line-clamp-1">
						{application.property.name}
					</CardTitle>
					<Badge variant="outline">
						{application.status}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Property Image */}
				<div className="relative w-full h-48 rounded-lg overflow-hidden">
					<img
						src={application.property.photoUrls[0]}
						alt={application.property.name}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* Property Details */}
				<div className="space-y-3">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<MapPin className="w-4 h-4" />
						<span className="line-clamp-1">
							{application.property.location.address},{" "}
							{application.property.location.city},{" "}
							{application.property.location.state}
						</span>
					</div>

					<div className="flex items-center gap-4">
						<div className="flex items-center gap-1 text-sm">
							<span className="font-semibold">
								{formatPrice(application.property.pricePerMonth)}/month
							</span>
						</div>
						<div className="text-sm text-muted-foreground">
							{application.property.beds} bed • {application.property.baths}{" "}
							bath
						</div>
					</div>

					{/* Property Description */}
					<p className="text-sm text-muted-foreground line-clamp-2">
						{application.property.description}
					</p>
				</div>

				{/* Application Details */}
				<div className="border-t pt-4 space-y-2">
					<div className="flex items-center gap-2 text-sm">
						<Calendar className="w-4 h-4" />
						<span>Applied on {formatDate(application.applicationDate)}</span>
					</div>

					{application.message && (
						<div className="flex items-start gap-2 text-sm">
							<MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
							<p className="line-clamp-2 text-muted-foreground">
								{application.message}
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default ApplicationCard;
