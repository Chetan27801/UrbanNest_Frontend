import { useParams } from "react-router-dom";
import { usePropertyById } from "@/services/propertyService";
import { useCheckApplicationStatus } from "@/services/applicationService";
import { useAuth } from "@/hooks/useAuth";
import {
	BedDouble,
	Bath,
	Ruler,
	Star,
	MapPin,
	Phone,
	CheckCircle,
	Wifi,
	ParkingSquare,
	Microwave,
	Wind,
	Mail,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ApplicationForm from "@/components/forms/ApplicationForm";

const PropertyDetail = () => {
	const { id } = useParams<{ id: string }>();
	const { data: property, isLoading, isError } = usePropertyById(id as string);
	const { user } = useAuth();
	const { data: applicationStatus, isLoading: isCheckingStatus } =
		useCheckApplicationStatus(user?.role === "tenant" ? (id as string) : "");
	console.log(property);

	// A simple mapping for amenities to icons
	const amenityIcons: { [key: string]: React.ReactNode } = {
		HighSpeedInternetAccess: <Wifi className="w-5 h-5" />,
		Parking: <ParkingSquare className="w-5 h-5" />,
		Microwave: <Microwave className="w-5 h-5" />,
		AirConditioning: <Wind className="w-5 h-5" />,
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8">
				<Skeleton className="h-12 w-1/2 mb-4" />
				<Skeleton className="h-6 w-1/4 mb-8" />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="md:col-span-2">
						<Skeleton className="h-[500px] w-full rounded-lg" />
					</div>
					<div>
						<Skeleton className="h-64 w-full rounded-lg" />
					</div>
				</div>
			</div>
		);
	}

	if (isError || !property) {
		return (
			<div className="container mx-auto px-4 py-8 text-center">
				<h1 className="text-2xl font-bold text-destructive">
					Property not found
				</h1>
				<p className="text-muted-foreground">
					Sorry, we couldn't find the property you were looking for.
				</p>
			</div>
		);
	}

	const {
		name,
		location,
		averageRating,
		numberOfReviews,
		beds,
		baths,
		squareFeet,
		pricePerMonth,
		securityDeposit,
		applicationFee,
		description,
		amenities,
		highlights,
		photoUrls,
		landlord,
		isAvailable,
		minLeaseTerm,
	} = property.data;

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-8">
				{/* Image Gallery */}
				<div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[500px]">
					<div className="col-span-2 row-span-2">
						<img
							src={photoUrls[0]}
							alt="Main property view"
							className="w-full h-full object-cover rounded-lg shadow-md"
						/>
					</div>
					{photoUrls.slice(1, 5).map((url, index) => (
						<div key={index} className="col-span-1 row-span-1">
							<img
								src={url}
								alt={`Property view ${index + 2}`}
								className="w-full h-full object-cover rounded-lg shadow-sm"
							/>
						</div>
					))}
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Left Column: Details */}
					<div className="lg:col-span-2">
						{/* Header */}
						<div>
							<h1 className="text-4xl font-bold text-gray-800">{name}</h1>
							<div className="flex items-center gap-4 text-muted-foreground mt-2">
								<div className="flex items-center gap-1">
									<MapPin className="w-4 h-4" />
									<span>
										{location.city}, {location.state}
									</span>
								</div>
								<div className="flex items-center gap-1">
									<Star className="w-4 h-4 text-yellow-500" />
									<span>
										{averageRating} ({numberOfReviews} reviews)
									</span>
								</div>
								<Badge
									variant="outline"
									className="text-green-600 border-green-300"
								>
									<CheckCircle className="w-4 h-4 mr-1" />
									Verified Listing
								</Badge>
							</div>
						</div>

						<Separator className="my-6" />

						{/* Stats */}
						<div className="flex items-center gap-8 text-center">
							<div>
								<BedDouble className="w-8 h-8 mx-auto text-gray-600" />
								<p className="mt-2 font-semibold">{beds}</p>
								<p className="text-sm text-muted-foreground">Bedrooms</p>
							</div>
							<div>
								<Bath className="w-8 h-8 mx-auto text-gray-600" />
								<p className="mt-2 font-semibold">{baths}</p>
								<p className="text-sm text-muted-foreground">Bathrooms</p>
							</div>
							<div>
								<Ruler className="w-8 h-8 mx-auto text-gray-600" />
								<p className="mt-2 font-semibold">{squareFeet}</p>
								<p className="text-sm text-muted-foreground">sq ft</p>
							</div>
						</div>

						<Separator className="my-6" />

						{/* About Section */}
						<Card className="border-none shadow-none bg-transparent">
							<CardHeader>
								<CardTitle>About this Villa</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground leading-relaxed">
									{description}
								</p>
							</CardContent>
						</Card>

						<Separator className="my-6" />

						{/* Villa Features (Amenities) */}
						<Card className="border-none shadow-none bg-transparent">
							<CardHeader>
								<CardTitle>Villa Features</CardTitle>
							</CardHeader>
							<CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
								{amenities.map((amenity) => (
									<div
										key={amenity}
										className="flex flex-col items-center justify-center p-4 border rounded-lg"
									>
										{amenityIcons[amenity] || (
											<CheckCircle className="w-5 h-5" />
										)}
										<span className="text-sm mt-2 text-center">
											{amenity.replace(/([A-Z])/g, " $1").trim()}
										</span>
									</div>
								))}
							</CardContent>
						</Card>

						<Separator className="my-6" />

						{/* Highlights */}
						<Card className="border-none shadow-none bg-transparent">
							<CardHeader>
								<CardTitle>Highlights</CardTitle>
							</CardHeader>
							<CardContent>
								<ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside text-muted-foreground">
									{highlights.map((highlight) => (
										<li key={highlight}>
											{highlight.replace(/([A-Z])/g, " $1").trim()}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					</div>

					{/* Right Column: Contact & Booking */}
					<div className="lg:col-span-1">
						<Card className="sticky top-24 shadow-lg">
							<CardHeader>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<Avatar className="w-12 h-12">
											<AvatarImage src={landlord.avatar} alt={landlord.name} />
											<AvatarFallback>{landlord.name.charAt(0)}</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold">{landlord.name}</p>
											<p className="text-xs text-muted-foreground">Landlord</p>
										</div>
									</div>
									<div className="text-right text-sm text-muted-foreground">
										<div className="flex items-center justify-end gap-2">
											<span>{landlord.phoneNumber}</span>
											<Phone className="w-4 h-4" />
										</div>
										<div className="flex items-center justify-end gap-2 mt-1">
											<span>{landlord.email}</span>
											<Mail className="w-4 h-4" />
										</div>
									</div>
								</div>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								{isAvailable ? (
									user?.role === "tenant" ? (
										isCheckingStatus ? (
											<Button size="lg" className="w-full" disabled>
												Checking...
											</Button>
										) : applicationStatus?.data?.hasApplied ? (
											<div className="text-center">
												<div className="flex items-center justify-center gap-2">
													<CheckCircle className="w-4 h-4 mt-1 text-green-500" />
													<p className="text-sm text-muted-foreground">
														Application Submitted
													</p>
												</div>
												<p className="text-sm text-muted-foreground mt-2">
													Status:{" "}
													<Badge className="bg-orange-400">
														{applicationStatus.data.application?.status ||
															"Pending"}
													</Badge>
												</p>
											</div>
										) : (
											<ApplicationForm propertyId={id as string} />
										)
									) : (
										<div>
											<p className="text-muted-foreground">
												Only tenants can apply for properties.
											</p>
										</div>
									)
								) : (
									<div>
										<p className="text-muted-foreground">
											This property is not available for rent.
										</p>
									</div>
								)}
								<Button
									size="lg"
									variant="outline"
									className="w-full cursor-pointer"
								>
									Message
								</Button>
								<Separator />
								<div className="space-y-2 text-sm">
									<div className="flex justify-between">
										<span className="text-muted-foreground">Rent</span>
										<span className="font-semibold">
											₹{pricePerMonth.toLocaleString()}/month
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Security Deposit
										</span>
										<span className="font-semibold">
											₹{securityDeposit.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Application Fee
										</span>
										<span className="font-semibold">
											₹{applicationFee.toLocaleString()}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-muted-foreground">
											Minimum Lease Term
										</span>
										<span className="font-semibold">{minLeaseTerm} months</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyDetail;
