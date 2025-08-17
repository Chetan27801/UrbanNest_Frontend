import { cn } from "@/lib/utils";
import React, { useState, useRef, useCallback } from "react";
import { useForm, Controller, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	AlertCircle,
	Save,
	Home,
	MapPin,
	LayoutList,
	X,
	Plus,
	Image as ImageIcon,
	Camera,
	Building,
	Bed,
	Bath,
	Ruler,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
	createPropertySchema,
	createPropertySchemaWithImages,
	type CreatePropertyTypeWithImages,
} from "@/schema/property.schema";
import { z } from "zod";
import { Amenity, Highlight, PropertyType, getEnumValues } from "@/utils/enums";
import { useCreateProperty } from "@/services/propertyService";
import { uploadFile } from "@/utils/uploadFile";
import { FaRupeeSign } from "react-icons/fa";

interface PropertyFormProps {
	className?: string;
}

type CoordinatesTuple = [number, number];

const amenitiesList = getEnumValues(Amenity);
const highlightsList = getEnumValues(Highlight);
const propertyTypes = getEnumValues(PropertyType);

type CreatePropertyInput = z.input<typeof createPropertySchema>;

interface ImagePreview {
	file: File;
	url: string;
	id: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ className }) => {
	const { user } = useAuth();
	const { mutateAsync: createProperty, isPending } = useCreateProperty();
	const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const {
		register,
		control,
		handleSubmit,
		watch,
		setValue,
		formState: { errors, isDirty },
	} = useForm<CreatePropertyInput>({
		resolver: zodResolver(createPropertySchema),
		defaultValues: {
			name: "",
			description: "",
			pricePerMonth: 0,
			securityDeposit: 0,
			applicationFee: 0,
			amenities: [],
			highlights: [],
			isPetsAllowed: false,
			isParkingIncluded: false,
			beds: 1,
			baths: 1,
			squareFeet: 500,
			propertyType: propertyTypes[0] as CreatePropertyInput["propertyType"],
			location: {
				address: "",
				city: "",
				state: "",
				country: "India",
				postalCode: "",
				coordinates: {
					type: "Point",
					coordinates: [0, 0] as CoordinatesTuple, // [lng, lat]
				},
			},
			landlord: user?.id,
			isAvailable: true,
			photoUrls: [],
		},
	});

	// Image handling functions
	const handleImageFiles = useCallback(
		(files: FileList | File[]) => {
			const fileArray = Array.from(files);
			const validFiles = fileArray.filter((file) => {
				const isValidType = file.type.startsWith("image/");
				const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
				return isValidType && isValidSize;
			});

			const newPreviews: ImagePreview[] = validFiles.map((file) => ({
				file,
				url: URL.createObjectURL(file),
				id: Math.random().toString(36).substr(2, 9),
			}));

			setImagePreviews((prev) => {
				const combined = [...prev, ...newPreviews];
				const limited = combined.slice(0, 10); // Max 10 images
				const files = limited.map((preview) => preview.file);
				setValue("photoUrls", files, { shouldDirty: true });
				return limited;
			});
		},
		[setValue]
	);

	const removeImage = useCallback(
		(id: string) => {
			setImagePreviews((prev) => {
				const updated = prev.filter((preview) => {
					if (preview.id === id) {
						URL.revokeObjectURL(preview.url);
						return false;
					}
					return true;
				});
				const files = updated.map((preview) => preview.file);
				setValue("photoUrls", files, { shouldDirty: true });
				return updated;
			});
		},
		[setValue]
	);

	const handleDrag = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setDragActive(true);
		} else if (e.type === "dragleave") {
			setDragActive(false);
		}
	}, []);

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault();
			e.stopPropagation();
			setDragActive(false);

			if (e.dataTransfer.files && e.dataTransfer.files[0]) {
				handleImageFiles(e.dataTransfer.files);
			}
		},
		[handleImageFiles]
	);

	const handleFileInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			if (e.target.files && e.target.files[0]) {
				handleImageFiles(e.target.files);
			}
		},
		[handleImageFiles]
	);

	const onSubmit = async (data: CreatePropertyInput) => {
		try {
			// Check if we have images
			if (!data.photoUrls || data.photoUrls.length === 0) {
				return;
			}

			const imageUploadResults = await Promise.all(
				data.photoUrls.map((image: File) =>
					uploadFile(image, "properties", "images")
				)
			);

			// Extract just the URLs from the upload results
			const imageUrls = imageUploadResults.map((result) => result.url);

			const propertyData = {
				...data,
				photoUrls: imageUrls,
			};

			const parsed = createPropertySchemaWithImages.parse(propertyData);

			await createProperty(parsed as CreatePropertyTypeWithImages);
		} catch (error) {
			console.error("Error creating property:", error);
		}
	};

	const onError = (errors: FieldErrors<CreatePropertyInput>) => {
		console.error("Form validation errors:", errors);
	};

	// Keep watch in case we later want to react, but avoid unused vars
	watch("amenities");
	watch("highlights");

	return (
		<div
			className={cn(
				"flex flex-1 flex-col gap-8 p-6 max-w-6xl mx-auto",
				className
			)}
		>
			{/* Header */}
			<div className="flex items-center gap-3">
				<div className="p-2 bg-primary/10 rounded-lg">
					<Home className="h-6 w-6 text-primary" />
				</div>
				<div>
					<h1 className="text-3xl font-bold text-gray-900">
						Create New Property
					</h1>
					<p className="text-gray-600">
						Fill in the details to list your property
					</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-8">
				{/* Property Images */}
				<Card className="border-2 border-dashed border-gray-200 hover:border-primary/50 transition-colors">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ImageIcon className="h-5 w-5" />
							Property Images
							<span className="text-sm font-normal text-gray-500">
								({imagePreviews.length}/10)
							</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div
							className={cn(
								"border-2 border-dashed rounded-lg p-8 text-center transition-colors",
								dragActive
									? "border-primary bg-primary/5"
									: "border-gray-300 hover:border-primary/50",
								imagePreviews.length === 0 &&
									"min-h-[200px] flex flex-col justify-center"
							)}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
						>
							{imagePreviews.length === 0 ? (
								<div className="space-y-4">
									<div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
										<Camera className="h-6 w-6 text-gray-400" />
									</div>
									<div>
										<p className="text-lg font-medium text-gray-900">
											Upload property images
										</p>
										<p className="text-sm text-gray-500">
											Drag and drop your images here, or click to browse
										</p>
									</div>
									<Button
										type="button"
										variant="outline"
										onClick={() => fileInputRef.current?.click()}
										className="mt-4"
									>
										<Plus className="h-4 w-4 mr-2" />
										Choose Images
									</Button>
								</div>
							) : (
								<div className="space-y-4">
									<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
										{imagePreviews.map((preview) => (
											<div key={preview.id} className="relative group">
												<img
													src={preview.url}
													alt="Property preview"
													className="w-full h-32 object-cover rounded-lg border"
												/>
												<button
													type="button"
													onClick={() => removeImage(preview.id)}
													className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
												>
													<X className="h-3 w-3" />
												</button>
											</div>
										))}
										{imagePreviews.length < 10 && (
											<button
												type="button"
												onClick={() => fileInputRef.current?.click()}
												className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-primary/50 transition-colors"
											>
												<Plus className="h-6 w-6 text-gray-400" />
												<span className="text-sm text-gray-500 mt-1">
													Add More
												</span>
											</button>
										)}
									</div>
									<p className="text-sm text-gray-500">
										You can upload up to 10 images. First image will be the main
										photo.
									</p>
								</div>
							)}
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							multiple
							className="hidden"
							onChange={handleFileInput}
						/>
						{errors.photoUrls && (
							<div className="flex items-center gap-2 text-sm text-destructive mt-2">
								<AlertCircle className="h-4 w-4" />
								{errors.photoUrls.message}
							</div>
						)}
					</CardContent>
				</Card>

				{/* Basic Information */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Building className="h-5 w-5" />
							Basic Information
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-sm font-medium">
									Property Name <span className="text-red-500">*</span>
								</Label>
								<Input
									id="name"
									placeholder="e.g., Sunny 2BHK in Downtown"
									className="h-11"
									{...register("name")}
								/>
								{errors.name && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.name.message}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="propertyType" className="text-sm font-medium">
									Property Type <span className="text-red-500">*</span>
								</Label>
								<Controller
									control={control}
									name="propertyType"
									render={({ field }) => (
										<Select value={field.value} onValueChange={field.onChange}>
											<SelectTrigger id="propertyType" className="h-11">
												<SelectValue placeholder="Select property type" />
											</SelectTrigger>
											<SelectContent>
												{propertyTypes.map((type) => (
													<SelectItem key={type} value={type}>
														{type}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
								{errors.propertyType && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.propertyType.message}
									</div>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="description" className="text-sm font-medium">
								Description <span className="text-red-500">*</span>
							</Label>
							<Textarea
								id="description"
								rows={4}
								placeholder="Describe your property, neighborhood highlights, house rules, and what makes it special..."
								className="resize-none"
								{...register("description")}
							/>
							{errors.description && (
								<div className="flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									{errors.description.message}
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Property Details */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<LayoutList className="h-5 w-5" />
							Property Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						{/* Room Details */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label
									htmlFor="beds"
									className="text-sm font-medium flex items-center gap-2"
								>
									<Bed className="h-4 w-4" />
									Bedrooms
								</Label>
								<Input
									id="beds"
									type="number"
									min={0}
									step="1"
									className="h-11"
									{...register("beds", { valueAsNumber: true })}
								/>
								{errors.beds && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.beds.message}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="baths"
									className="text-sm font-medium flex items-center gap-2"
								>
									<Bath className="h-4 w-4" />
									Bathrooms
								</Label>
								<Input
									id="baths"
									type="number"
									min={0}
									step="1"
									className="h-11"
									{...register("baths", { valueAsNumber: true })}
								/>
								{errors.baths && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.baths.message}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="squareFeet"
									className="text-sm font-medium flex items-center gap-2"
								>
									<Ruler className="h-4 w-4" />
									Square Feet
								</Label>
								<Input
									id="squareFeet"
									type="number"
									min={1}
									step="1"
									className="h-11"
									{...register("squareFeet", { valueAsNumber: true })}
								/>
								{errors.squareFeet && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.squareFeet.message}
									</div>
								)}
							</div>
						</div>

						{/* Additional Options */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-4">
								<Label className="text-sm font-medium">
									Additional Options
								</Label>
								<div className="space-y-3">
									<Controller
										control={control}
										name="isPetsAllowed"
										render={({ field }) => (
											<div className="flex items-center space-x-3">
												<Checkbox
													id="petsAllowed"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
												<Label htmlFor="petsAllowed" className="text-sm">
													Pets allowed
												</Label>
											</div>
										)}
									/>
									<Controller
										control={control}
										name="isParkingIncluded"
										render={({ field }) => (
											<div className="flex items-center space-x-3">
												<Checkbox
													id="parkingIncluded"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
												<Label htmlFor="parkingIncluded" className="text-sm">
													Parking included
												</Label>
											</div>
										)}
									/>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Pricing */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<FaRupeeSign className="h-5 w-5" />
							Pricing
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							<div className="space-y-2">
								<Label htmlFor="pricePerMonth" className="text-sm font-medium">
									Monthly Rent <span className="text-red-500">*</span>
								</Label>
								<div className="relative">
									<FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										className="pl-9 h-11"
										id="pricePerMonth"
										type="number"
										min={0}
										step="1"
										placeholder="0"
										{...register("pricePerMonth", { valueAsNumber: true })}
									/>
								</div>
								{errors.pricePerMonth && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.pricePerMonth.message}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label
									htmlFor="securityDeposit"
									className="text-sm font-medium"
								>
									Security Deposit
								</Label>
								<div className="relative">
									<FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										className="pl-9 h-11"
										id="securityDeposit"
										type="number"
										min={0}
										step="1"
										placeholder="0"
										{...register("securityDeposit", { valueAsNumber: true })}
									/>
								</div>
								{errors.securityDeposit && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.securityDeposit.message}
									</div>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="applicationFee" className="text-sm font-medium">
									Application Fee
								</Label>
								<div className="relative">
									<FaRupeeSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										className="pl-9 h-11"
										id="applicationFee"
										type="number"
										min={0}
										step="1"
										placeholder="0"
										{...register("applicationFee", { valueAsNumber: true })}
									/>
								</div>
								{errors.applicationFee && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.applicationFee.message}
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Amenities & Highlights */}
				<Card>
					<CardHeader>
						<CardTitle>Amenities & Highlights</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div className="space-y-4">
								<Label className="text-sm font-medium">
									Amenities <span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-3 max-h-64 overflow-auto p-4 border rounded-lg bg-gray-50">
									{amenitiesList.map((amenity) => (
										<Controller
											key={amenity}
											control={control}
											name="amenities"
											render={({ field }) => {
												const checked = field.value?.includes(amenity);
												return (
													<div className="flex items-center space-x-2">
														<Checkbox
															id={`amenity-${amenity}`}
															checked={checked}
															onCheckedChange={(val) => {
																const next = new Set(field.value || []);
																if (val) next.add(amenity);
																else next.delete(amenity);
																field.onChange(Array.from(next));
															}}
														/>
														<Label
															htmlFor={`amenity-${amenity}`}
															className="text-sm font-normal"
														>
															{amenity}
														</Label>
													</div>
												);
											}}
										/>
									))}
								</div>
								{errors.amenities && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.amenities.message}
									</div>
								)}
							</div>

							<div className="space-y-4">
								<Label className="text-sm font-medium">
									Highlights <span className="text-red-500">*</span>
								</Label>
								<div className="grid grid-cols-2 gap-3 max-h-64 overflow-auto p-4 border rounded-lg bg-gray-50">
									{highlightsList.map((highlight) => (
										<Controller
											key={highlight}
											control={control}
											name="highlights"
											render={({ field }) => {
												const checked = field.value?.includes(highlight);
												return (
													<div className="flex items-center space-x-2">
														<Checkbox
															id={`highlight-${highlight}`}
															checked={checked}
															onCheckedChange={(val) => {
																const next = new Set(field.value || []);
																if (val) next.add(highlight);
																else next.delete(highlight);
																field.onChange(Array.from(next));
															}}
														/>
														<Label
															htmlFor={`highlight-${highlight}`}
															className="text-sm font-normal"
														>
															{highlight}
														</Label>
													</div>
												);
											}}
										/>
									))}
								</div>
								{errors.highlights && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.highlights.message}
									</div>
								)}
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Location */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<MapPin className="h-5 w-5" />
							Location Details
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="space-y-2">
								<Label htmlFor="address" className="text-sm font-medium">
									Street Address <span className="text-red-500">*</span>
								</Label>
								<Input
									id="address"
									placeholder="123 Main Street, Apt 4B"
									className="h-11"
									{...register("location.address")}
								/>
								{errors.location?.address && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.location.address.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="city" className="text-sm font-medium">
									City <span className="text-red-500">*</span>
								</Label>
								<Input
									id="city"
									placeholder="New York"
									className="h-11"
									{...register("location.city")}
								/>
								{errors.location?.city && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.location.city.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="state" className="text-sm font-medium">
									State <span className="text-red-500">*</span>
								</Label>
								<Input
									id="state"
									placeholder="NY"
									className="h-11"
									{...register("location.state")}
								/>
								{errors.location?.state && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.location.state.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="country" className="text-sm font-medium">
									Country <span className="text-red-500">*</span>
								</Label>
								<Input
									id="country"
									className="h-11"
									{...register("location.country")}
								/>
								{errors.location?.country && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.location.country.message}
									</div>
								)}
							</div>
							<div className="space-y-2">
								<Label htmlFor="postalCode" className="text-sm font-medium">
									Postal Code <span className="text-red-500">*</span>
								</Label>
								<Input
									id="postalCode"
									placeholder="10001"
									className="h-11"
									{...register("location.postalCode")}
								/>
								{errors.location?.postalCode && (
									<div className="flex items-center gap-2 text-sm text-destructive">
										<AlertCircle className="h-4 w-4" />
										{errors.location.postalCode.message}
									</div>
								)}
							</div>
						</div>

						{/* Coordinates */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<input
								type="hidden"
								{...register("location.coordinates.type")}
								value="Point"
							/>
							<div className="space-y-2">
								<Label htmlFor="lng" className="text-sm font-medium">
									Longitude
								</Label>
								<Input
									id="lng"
									type="number"
									step="any"
									placeholder="-74.0059"
									className="h-11"
									{...register("location.coordinates.coordinates.0", {
										valueAsNumber: true,
									})}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lat" className="text-sm font-medium">
									Latitude
								</Label>
								<Input
									id="lat"
									type="number"
									step="any"
									placeholder="40.7128"
									className="h-11"
									{...register("location.coordinates.coordinates.1", {
										valueAsNumber: true,
									})}
								/>
							</div>
							{(
								errors.location?.coordinates as unknown as {
									coordinates?: { message?: string };
								}
							)?.coordinates && (
								<div className="lg:col-span-2 flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									Please provide valid coordinates
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Hidden Fields */}
				<input type="hidden" {...register("landlord")} value={user?.id} />

				{/* Submit Button */}
				<div className="flex justify-end pt-6 border-t">
					<Button
						type="submit"
						className="px-8 py-3 bg-primary text-white hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
						size="lg"
						disabled={!isDirty || isPending}
					>
						{isPending ? (
							<>
								<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
								Creating Property...
							</>
						) : (
							<>
								<Save className="h-4 w-4 mr-2" />
								Create Property
							</>
						)}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default PropertyForm;
