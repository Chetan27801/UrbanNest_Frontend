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
import heroImage from "@/assets/hero_image.jpg";
import {
	FileIcon,
	HomeIcon,
	MessageCircleIcon,
	SearchIcon,
	ShieldCheckIcon,
} from "lucide-react";

const HomePage = () => {
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
							variant="default"
							className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-full"
						>
							All Properties
						</Button>
						<Button
							variant="outline"
							className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-6 py-2 rounded-full"
						>
							Apartments
						</Button>
						<Button
							variant="outline"
							className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-6 py-2 rounded-full"
						>
							Houses
						</Button>
						<Button
							variant="outline"
							className="border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white px-6 py-2 rounded-full"
						>
							Luxury
						</Button>
					</div>

					{/* Masonry Gallery Grid */}
					<div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
						{/* Featured Property - Large */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=600"
									alt="Modern luxury villa with pool"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute top-6 left-6 z-10">
									<span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
										Featured
									</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-xl font-bold text-white mb-3">
												Modern Luxury Villa
											</CardTitle>
											<CardDescription className="text-gray-200 mb-4 text-sm">
												Stunning 4BR villa with pool and garden in prime
												location
											</CardDescription>
											<div className="flex items-center justify-between">
												<span className="text-xl font-bold text-cyan-400">
													$3,200/month
												</span>
												<Button
													size="sm"
													className="bg-white text-gray-900 hover:bg-gray-100"
												>
													View Details
												</Button>
											</div>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 1 - Square */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400"
									alt="Cozy apartment interior"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute top-4 right-4 z-10">
									<div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
										<HomeIcon className="w-4 h-4 text-cyan-600" />
									</div>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-2">
												Cozy Studio Apartment
											</CardTitle>
											<CardDescription className="text-gray-200 mb-3 text-sm">
												Perfect for young professionals
											</CardDescription>
											<span className="text-lg font-bold text-cyan-400">
												$1,200/month
											</span>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 2 - Tall */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=500"
									alt="Modern penthouse with city view"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute top-4 left-4 z-10">
									<span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
										New
									</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-2">
												City Penthouse
											</CardTitle>
											<CardDescription className="text-gray-200 mb-3 text-sm">
												Luxury living with panoramic views
											</CardDescription>
											<span className="text-lg font-bold text-cyan-400">
												$4,500/month
											</span>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 3 - Wide */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&h=300"
									alt="Elegant townhouse"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-2">
												Elegant Townhouse
											</CardTitle>
											<CardDescription className="text-gray-200 mb-3 text-sm">
												Spacious 3BR family home
											</CardDescription>
											<span className="text-lg font-bold text-cyan-400">
												$2,800/month
											</span>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 4 - Standard */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=350"
									alt="Modern apartment"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-2">
												Modern Apartment
											</CardTitle>
											<CardDescription className="text-gray-200 mb-3 text-sm">
												Stylish 2BR in trendy neighborhood
											</CardDescription>
											<span className="text-lg font-bold text-cyan-400">
												$1,800/month
											</span>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 5 - Waterfront */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=400"
									alt="Waterfront property"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute top-6 left-6 z-10">
									<span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
										Available Now
									</span>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-3">
												Waterfront Estate
											</CardTitle>
											<CardDescription className="text-gray-200 mb-4 text-sm">
												Breathtaking waterfront views with private dock and
												gardens
											</CardDescription>
											<div className="flex items-center justify-between">
												<span className="text-lg font-bold text-cyan-400">
													$5,200/month
												</span>
												<Button
													size="sm"
													className="bg-white text-gray-900 hover:bg-gray-100"
												>
													Schedule Tour
												</Button>
											</div>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>

						{/* Property Card 6 - Extra Interior */}
						<Card className="break-inside-avoid overflow-hidden rounded-xl border-0 shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer bg-white mb-6">
							<div className="relative">
								<img
									src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=450"
									alt="Luxury interior design"
									className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
									<CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
										<div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
											<CardTitle className="text-lg font-bold text-white mb-2">
												Designer Loft
											</CardTitle>
											<CardDescription className="text-gray-200 mb-3 text-sm">
												Artistic space in creative district
											</CardDescription>
											<span className="text-lg font-bold text-cyan-400">
												$2,200/month
											</span>
										</div>
									</CardContent>
								</div>
							</div>
						</Card>
					</div>

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
										to="/register"
										className="w-full h-full flex items-center justify-center"
									>
										Start Now
									</Link>
								</Button>
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
											5,000+
										</CardTitle>
										<CardDescription className="text-xs text-gray-600">
											Active Listings
										</CardDescription>
									</div>
								</CardContent>
							</Card>

							<Card className="absolute -bottom-6 -right-6 border-0 shadow-xl">
								<CardContent className="flex items-center gap-3 p-4">
									<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
										<HomeIcon className="w-6 h-6 text-blue-600" />
									</div>
									<div>
										<CardTitle className="text-sm text-gray-900">
											1,000+
										</CardTitle>
										<CardDescription className="text-xs text-gray-600">
											Happy Tenants
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
