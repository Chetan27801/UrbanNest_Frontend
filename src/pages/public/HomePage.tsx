import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import heroImage from "@/assets/hero_image.jpg";
import {
	FileIcon,
	HomeIcon,
	MessageCircleIcon,
	SearchIcon,
	ShieldCheckIcon,
	StarIcon,
	MapPinIcon,
	HeartIcon,
	TrendingUpIcon,
	UsersIcon,
	BuildingIcon,
	FilterIcon,
} from "lucide-react";
import { useGetPropertyDataForHome } from "@/services/propertyService";
import { useState, useMemo } from "react";
import { PropertyType } from "@/utils/enums";
import type { Property } from "@/types/property";
import { useAuth } from "@/hooks";

const HomePage = () => {
	const [propertyType, setPropertyType] = useState<string>("all");
	const [favorites, setFavorites] = useState<Set<string>>(new Set());
	const { user } = useAuth();
	const {
		data: propertyDataForHome,
		isLoading,
		error,
	} = useGetPropertyDataForHome(propertyType);

	// Memoized calculations for performance using new API data
	const propertyStats = useMemo(() => {
		if (!propertyDataForHome?.data) return null;

		const apiData = propertyDataForHome.data;
		const properties = apiData.properties;

		if (!properties || properties.length === 0) return null;

		return {
			// Use API provided totals
			totalProperties: apiData.totalProperties,
			totalAvailableProperties: apiData.totalAvailableProperties,
			totalUsers: apiData.totalUsers,
			totalApplications: apiData.totalApplications,

			// Calculate from current filtered properties
			featuredProperties: properties.length,
			averagePrice: Math.round(
				properties.reduce((acc, p) => acc + p.pricePerMonth, 0) /
					properties.length
			),
			averageRating: (
				properties.reduce((acc, p) => acc + p.averageRating, 0) /
				properties.length
			).toFixed(1),
			availableInFeatured: properties.filter((p) => p.isAvailable).length,
			propertyTypes: new Set(properties.map((p) => p.propertyType)).size,
			totalReviews: properties.reduce((acc, p) => acc + p.numberOfReviews, 0),
		};
	}, [propertyDataForHome?.data]);

	const toggleFavorite = (propertyId: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(propertyId)) {
				newFavorites.delete(propertyId);
			} else {
				newFavorites.add(propertyId);
			}
			return newFavorites;
		});
	};

	const PropertyCard = ({ property }: { property: Property }) => (
		<Card className="overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white">
			<div className="relative">
				<img
					src={
						property.photoUrls?.[0] ||
						"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300"
					}
					alt={property.name}
					className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
					onError={(e) => {
						e.currentTarget.src =
							"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300";
					}}
				/>

				{/* Favorite Icon */}
				<div className="absolute top-4 right-4 z-10">
					<div
						className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							toggleFavorite(property._id);
						}}
					>
						<HeartIcon
							className={`w-4 h-4 transition-colors ${
								favorites.has(property._id)
									? "text-red-500 fill-red-500"
									: "text-gray-600 hover:text-red-500"
							}`}
						/>
					</div>
				</div>
			</div>

			<CardContent className="p-6">
				<div className="space-y-4">
					{/* Property Name */}
					<div>
						<CardTitle className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
							{property.name}
						</CardTitle>
					</div>

					{/* Location */}
					<div className="flex items-center text-gray-600 text-sm">
						<MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
						<span className="line-clamp-1">
							{property.location.city}, {property.location.state}
						</span>
					</div>

					{/* Rating */}
					{property.averageRating > 0 && (
						<div className="flex items-center gap-2">
							<div className="flex items-center">
								<StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
								<span className="text-sm font-medium text-gray-900 ml-1">
									{property.averageRating.toFixed(1)}
								</span>
							</div>
							<span className="text-sm text-gray-500">
								({property.numberOfReviews} reviews)
							</span>
						</div>
					)}

					{/* Price and CTA */}
					<div className="flex items-center justify-between pt-4 border-t border-gray-100">
						<div>
							<span className="text-2xl font-bold text-gray-900">
								{"₹" + property.pricePerMonth.toLocaleString()}
							</span>
							<span className="text-gray-600 text-sm">/month</span>
						</div>
						<Button
							size="sm"
							className="bg-cyan-600 hover:bg-cyan-700 text-white"
							asChild
						>
							<Link to={`/properties/${property._id}`}>View Details</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative h-screen w-full flex items-center justify-center -mt-20">
				{/* Background Image with Overlay */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: `url(${heroImage})` }}
				>
					<div className="absolute inset-0 bg-black/50"></div>
				</div>

				{/* Hero Content */}
				<div className="relative z-10 text-center max-w-4xl mx-auto px-6">
					<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
						Start your journey to finding the{" "}
						<span className="text-cyan-400">perfect place</span> to call home
					</h1>

					<p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
						Explore our wide range of rental properties tailored to fit your
						lifestyle and needs!
					</p>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
						<Button
							size="lg"
							className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
						>
							<Link
								to="/register"
								className="w-full h-full flex items-center justify-center"
							>
								Join Now
							</Link>
						</Button>

						<Button
							size="lg"
							variant="ghost"
							className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm"
						>
							<Link
								to="/search"
								className="w-full h-full flex items-center justify-center"
							>
								Search Rental
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Search Features Section */}
			<section className="py-20 bg-gray-50">
				<div className="max-w-7xl mx-auto px-6">
					{/* Section Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
							Quickly find the home you want using our{" "}
							<span className="text-cyan-600">simple and effective</span> search
							filters!
						</h2>
					</div>

					{/* Feature Cards */}
					<div className="grid md:grid-cols-3 gap-8">
						{/* Card 1 - Trustworthy Listings */}
						<Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
							<CardHeader>
								<div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
									<ShieldCheckIcon className="w-8 h-8 text-cyan-600" />
								</div>
								<CardTitle className="text-xl text-gray-900">
									Trustworthy and Verified Listings
								</CardTitle>
								<CardDescription className="text-gray-600 leading-relaxed">
									Discover the best rental listings with verified owners and
									property details.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors duration-300"
								>
									Explore
								</Button>
							</CardFooter>
						</Card>

						{/* Card 2 - Diverse Listings */}
						<Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
							<CardHeader>
								<div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
									<HomeIcon className="w-8 h-8 text-cyan-600" />
								</div>
								<CardTitle className="text-xl text-gray-900">
									Diverse Rental Listings with Ease
								</CardTitle>
								<CardDescription className="text-gray-600 leading-relaxed">
									We ensure to use modern tech and design to give a
									user-friendly way of rental search.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors duration-300"
								>
									Search
								</Button>
							</CardFooter>
						</Card>

						{/* Card 3 - Advanced Search */}
						<Card className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
							<CardHeader>
								<div className="w-16 h-16 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
									<SearchIcon className="w-8 h-8 text-cyan-600" />
								</div>
								<CardTitle className="text-xl text-gray-900">
									Simplify Your Rental Search with Us
								</CardTitle>
								<CardDescription className="text-gray-600 leading-relaxed">
									Find a Tenancy and outlined filters designed to match your
									ideal rental situation.
								</CardDescription>
							</CardHeader>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition-colors duration-300"
								>
									Discover
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</section>

			{/* Property Showcase Section */}
			<section className="py-20 bg-gradient-to-br from-gray-50 to-white">
				<div className="max-w-7xl mx-auto px-6">
					{/* Section Header */}
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							Featured <span className="text-cyan-600">Properties</span>
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Discover handpicked premium properties that offer the perfect
							blend of comfort, style, and location for your next home
						</p>
					</div>

					{/* Property Categories */}
					<div className="flex flex-wrap justify-center gap-4 mb-12">
						<Button
							variant={propertyType === "all" ? "default" : "outline"}
							className={`px-6 py-2 rounded-full transition-all duration-300 ${
								propertyType === "all"
									? "bg-cyan-600 hover:bg-cyan-700 text-white"
									: "border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
							}`}
							onClick={() => setPropertyType("all")}
						>
							<FilterIcon className="w-4 h-4 mr-2" />
							All Properties
						</Button>
						<Button
							variant={
								propertyType === PropertyType.Apartment ? "default" : "outline"
							}
							className={`px-6 py-2 rounded-full transition-all duration-300 ${
								propertyType === PropertyType.Apartment
									? "bg-cyan-600 hover:bg-cyan-700 text-white"
									: "border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
							}`}
							onClick={() => setPropertyType(PropertyType.Apartment)}
						>
							<BuildingIcon className="w-4 h-4 mr-2" />
							Apartments
						</Button>
						<Button
							variant={
								propertyType === PropertyType.Villa ? "default" : "outline"
							}
							className={`px-6 py-2 rounded-full transition-all duration-300 ${
								propertyType === PropertyType.Villa
									? "bg-cyan-600 hover:bg-cyan-700 text-white"
									: "border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
							}`}
							onClick={() => setPropertyType(PropertyType.Villa)}
						>
							<HomeIcon className="w-4 h-4 mr-2" />
							Villas
						</Button>
						<Button
							variant={
								propertyType === PropertyType.Townhouse ? "default" : "outline"
							}
							className={`px-6 py-2 rounded-full transition-all duration-300 ${
								propertyType === PropertyType.Townhouse
									? "bg-cyan-600 hover:bg-cyan-700 text-white"
									: "border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
							}`}
							onClick={() => setPropertyType(PropertyType.Townhouse)}
						>
							<UsersIcon className="w-4 h-4 mr-2" />
							Townhouses
						</Button>
					</div>

					{/* Dynamic Property Grid */}
					{error ? (
						<div className="text-center py-12">
							<div className="text-red-500 mb-4">
								<HomeIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Unable to load properties
							</h3>
							<p className="text-gray-600">Please try again later.</p>
						</div>
					) : isLoading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{Array.from({ length: 8 }).map((_, index) => (
								<Card
									key={index}
									className="overflow-hidden rounded-xl border-0 shadow-lg bg-white"
								>
									<Skeleton className="w-full h-48" />
									<CardContent className="p-6">
										<div className="space-y-4">
											<Skeleton className="h-6 w-3/4" />
											<Skeleton className="h-4 w-1/2" />
											<div className="flex gap-4">
												<Skeleton className="h-4 w-12" />
												<Skeleton className="h-4 w-12" />
												<Skeleton className="h-4 w-16" />
											</div>
											<div className="flex justify-between items-center">
												<Skeleton className="h-8 w-24" />
												<Skeleton className="h-8 w-20" />
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					) : propertyDataForHome?.data?.properties &&
					  propertyDataForHome.data.properties.length > 0 ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{propertyDataForHome.data.properties.map((property) => (
								<PropertyCard key={property._id} property={property} />
							))}
						</div>
					) : (
						<div className="text-center py-12">
							<div className="text-gray-400 mb-4">
								<SearchIcon className="w-16 h-16 mx-auto mb-4" />
							</div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								No properties found
							</h3>
							<p className="text-gray-600 mb-6">
								{propertyType === "all"
									? "No properties are currently available."
									: `No ${propertyType.toLowerCase()} properties found. Try a different category.`}
							</p>
							{propertyType !== "all" && (
								<Button
									variant="outline"
									onClick={() => setPropertyType("all")}
									className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
								>
									View All Properties
								</Button>
							)}
						</div>
					)}

					{/* View All Properties Button */}
					<div className="text-center mt-12">
						<Button
							size="lg"
							className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
						>
							<Link
								to="/search"
								className="w-full h-full flex items-center justify-center gap-2"
							>
								<SearchIcon className="w-5 h-5" />
								View All Properties
							</Link>
						</Button>
					</div>
				</div>
			</section>

			{/* Market Insights Section */}
			{propertyStats && (
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
								Market <span className="text-cyan-600">Insights</span>
							</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
								Get real-time insights into our property market and discover the
								best opportunities
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{/* Average Price */}
							<Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
								<div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<TrendingUpIcon className="w-8 h-8 text-white" />
								</div>
								<CardTitle className="text-3xl font-bold text-gray-900 mb-2">
									${propertyStats.averagePrice.toLocaleString()}
								</CardTitle>
								<CardDescription className="text-gray-600 font-medium">
									Average Monthly Rent
								</CardDescription>
								<div className="mt-2 text-sm text-green-600">
									From {propertyStats.featuredProperties} featured properties
								</div>
							</Card>

							{/* Total Properties */}
							<Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
								<div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<BuildingIcon className="w-8 h-8 text-white" />
								</div>
								<CardTitle className="text-3xl font-bold text-gray-900 mb-2">
									{propertyStats.totalProperties.toLocaleString()}
								</CardTitle>
								<CardDescription className="text-gray-600 font-medium">
									Total Properties
								</CardDescription>
								<div className="mt-2 text-sm text-blue-600">
									{propertyStats.propertyTypes} different types
								</div>
							</Card>

							{/* Average Rating */}
							<Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
								<div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<StarIcon className="w-8 h-8 text-white" />
								</div>
								<CardTitle className="text-3xl font-bold text-gray-900 mb-2">
									{propertyStats.averageRating}
								</CardTitle>
								<CardDescription className="text-gray-600 font-medium">
									Average Property Rating
								</CardDescription>
								<div className="mt-2 text-sm text-yellow-600">
									{propertyStats.totalReviews} total reviews
								</div>
							</Card>

							{/* Available Properties */}
							<Card className="text-center p-6 hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
								<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
									<HomeIcon className="w-8 h-8 text-white" />
								</div>
								<CardTitle className="text-3xl font-bold text-gray-900 mb-2">
									{propertyStats.totalAvailableProperties.toLocaleString()}
								</CardTitle>
								<CardDescription className="text-gray-600 font-medium">
									Available Properties
								</CardDescription>
								<div className="mt-2 text-sm text-green-600">
									Ready to move in
								</div>
							</Card>
						</div>

						{/* Quick Stats Bar */}
						<div className="mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
								<div>
									<div className="text-2xl font-bold text-gray-900">
										{propertyStats.totalProperties.toLocaleString()}
									</div>
									<div className="text-sm text-gray-600">Total Properties</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-gray-900">
										{Math.round(
											(propertyStats.totalAvailableProperties /
												propertyStats.totalProperties) *
												100
										)}
										%
									</div>
									<div className="text-sm text-gray-600">Availability Rate</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-gray-900">
										{propertyStats.totalUsers.toLocaleString()}
									</div>
									<div className="text-sm text-gray-600">Registered Users</div>
								</div>
								<div>
									<div className="text-2xl font-bold text-gray-900">
										{propertyStats.totalApplications.toLocaleString()}
									</div>
									<div className="text-sm text-gray-600">
										Total Applications
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Find Your Dream Property Section */}
			<section className="py-20 bg-gray-900 text-white">
				<div className="max-w-7xl mx-auto px-6">
					<div className="grid lg:grid-cols-2 gap-16 items-center">
						{/* Left Content */}
						<div>
							<h2 className="text-4xl md:text-5xl font-bold mb-6">
								Find Your Dream Rental Property Today!
							</h2>
							<p className="text-xl text-gray-300 mb-8 leading-relaxed">
								Searching for your ideal home has never been easier. Join our
								platform today and discover a world of rental opportunities that
								match your lifestyle, budget, and preferences. From cozy
								apartments to luxury estates, we have something for everyone.
							</p>

							{/* Features List */}
							<div className="space-y-6 mb-8">
								<Card className="bg-gray-800 border-gray-700 text-white">
									<CardContent className="flex items-start gap-4 p-4">
										<div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<HomeIcon className="w-4 h-4 text-white" />
										</div>
										<div>
											<CardTitle className="text-lg text-white mb-2">
												Browse Listings with Detailed Information
											</CardTitle>
											<CardDescription className="text-gray-400">
												Access comprehensive property details, high-quality
												photos, and virtual tours to make informed decisions.
											</CardDescription>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-gray-800 border-gray-700 text-white">
									<CardContent className="flex items-start gap-4 p-4">
										<div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<MessageCircleIcon className="w-4 h-4 text-white" />
										</div>
										<div>
											<CardTitle className="text-lg text-white mb-2">
												Direct Communication with Property Owners
											</CardTitle>
											<CardDescription className="text-gray-400">
												Connect directly with landlords and property managers
												through our secure messaging system.
											</CardDescription>
										</div>
									</CardContent>
								</Card>

								<Card className="bg-gray-800 border-gray-700 text-white">
									<CardContent className="flex items-start gap-4 p-4">
										<div className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<FileIcon className="w-4 h-4 text-white" />
										</div>
										<div>
											<CardTitle className="text-lg text-white mb-2">
												Streamlined Application Process
											</CardTitle>
											<CardDescription className="text-gray-400">
												Apply to multiple properties with ease using our
												simplified application system and document management
												tools.
											</CardDescription>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-4">
								<Button
									size="lg"
									className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
								>
									<Link
										to={user ? "/dashboard" : "/register"}
										className="w-full h-full flex items-center justify-center"
									>
										Start Now
									</Link>
								</Button>
								{!user && (
									<Button
										size="lg"
										variant="ghost"
										className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
									>
										<Link
											to="/login"
											className="w-full h-full flex items-center justify-center"
										>
											Sign Up
										</Link>
									</Button>
								)}
							</div>
						</div>

						{/* Right Content - Image */}
						<div className="relative">
							<Card className="relative rounded-2xl overflow-hidden border-0 shadow-xl">
								<img
									src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=700&fit=crop&crop=house"
									alt="Discover rental properties"
									className="w-full h-[500px] object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/20 to-transparent"></div>
							</Card>

							{/* Floating Stats Cards */}
							<Card className="absolute -top-6 -left-6 border-0 shadow-xl">
								<CardContent className="flex items-center gap-3 p-4">
									<div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
										<HomeIcon className="w-6 h-6 text-green-600" />
									</div>
									<div>
										<CardTitle className="text-sm text-gray-900">
											{propertyStats?.totalProperties.toLocaleString() || 0}
										</CardTitle>
										<CardDescription className="text-xs text-gray-600">
											Total Properties
										</CardDescription>
									</div>
								</CardContent>
							</Card>

							<Card className="absolute -bottom-6 -right-6 border-0 shadow-xl">
								<CardContent className="flex items-center gap-3 p-4">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<UsersIcon className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<CardTitle className="text-sm text-gray-900">
											{propertyStats?.totalUsers.toLocaleString() || 0}
										</CardTitle>
										<CardDescription className="text-xs text-gray-600">
											Registered Users
										</CardDescription>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default HomePage;
