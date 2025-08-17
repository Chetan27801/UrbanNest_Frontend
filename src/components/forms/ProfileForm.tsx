import { cn } from "@/lib/utils";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	profileSchema,
	profileSchemaWithImages,
	type ProfileFormData,
	type ProfileFormDataWithImages,
} from "@/schema/profile.schema";
import {
	User,
	Mail,
	Edit,
	Save,
	AlertCircle,
	Upload,
	Trash2,
	Camera,
	Phone,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateProfile } from "@/services/userService";
import { uploadFile } from "@/utils/uploadFile";

interface ProfileProps {
	className?: string;
}

//TODO: not refetching the profile after update only refetching when user is logged in again
const ProfileForm: React.FC<ProfileProps> = ({ className }) => {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const { user } = useAuth();
	const { mutateAsync: updateProfile } = useUpdateProfile();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isDirty, dirtyFields },
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || "",
			email: user?.email || "",
			phoneNumber: user?.phoneNumber || "",
			avatar: undefined,
		},
	});

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		onChange: (value: File | null) => void
	) => {
		const file = e.target.files?.[0];
		if (file) {
			if (previewUrl) URL.revokeObjectURL(previewUrl);
			const url = URL.createObjectURL(file);
			setPreviewUrl(url);
			onChange(file);
		} else {
			onChange(null);
		}
	};

	const handleImageDelete = (onChange: (value: File | null) => void) => {
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		setPreviewUrl(null);
		onChange(null);
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	const onSubmit = async (data: ProfileFormData) => {
		const changedData: { [key: string]: string | File | undefined } = {};

		// Filter the form data to include only the dirty fields
		for (const key in dirtyFields) {
			const typedKey = key as keyof ProfileFormData;
			changedData[typedKey] = data[typedKey];
		}
		let parsed;
		if (Object.keys(changedData).length > 0) {
			if (changedData.avatar) {
				const imageUrl = await uploadFile(
					data.avatar as File,
					user?.id || "users",
					"avatars"
				);
				parsed = profileSchemaWithImages.parse({
					...changedData,
					avatar: imageUrl,
				});
			} else {
				parsed = profileSchema.parse(changedData);
			}	
			console.log("Parsed data:", parsed);
			await updateProfile(parsed as ProfileFormDataWithImages);
		} else {
			console.log("🤷 No changes to submit.");
		}
	};

	if (!user) {
		return (
			<div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
				<Card>
					<CardContent className="pt-6">
						<div className="text-center text-muted-foreground">
							<User className="h-12 w-12 mx-auto mb-4 opacity-50" />
							<p>Please log in to view your profile</p>
						</div>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className={cn("flex flex-1 flex-col gap-6 p-6", className)}>
			<div className="flex items-center gap-2">
				<User className="h-6 w-6" />
				<h1 className="text-2xl font-bold">Profile Settings</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Edit className="h-5 w-5" />
						Update Your Profile
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Avatar Upload Section */}
						<div className="space-y-2">
							<Label>Profile Picture</Label>
							<Controller
								name="avatar"
								control={control}
								render={({ field: { onChange, ref, ...field } }) => (
									<div className="flex items-center gap-6">
										<div className="relative">
											<Avatar
												className="w-20 h-20 cursor-pointer"
												onClick={() => inputRef.current?.click()}
											>
												<AvatarImage
													src={previewUrl || user.avatar}
													alt={user.name}
												/>
												<AvatarFallback className="text-lg">
													{user.name.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>

											{previewUrl ? (
												<button
													type="button"
													onClick={() => handleImageDelete(onChange)}
													className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
												>
													<Trash2 className="h-3 w-3" />
												</button>
											) : (
												<button
													type="button"
													onClick={() => inputRef.current?.click()}
													className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90 transition-colors"
												>
													<Camera className="h-3 w-3" />
												</button>
											)}
										</div>

										<div className="flex-1">
											<div className="flex flex-col gap-2">
												<Button
													type="button"
													variant="outline"
													onClick={() => inputRef.current?.click()}
													className="w-fit"
												>
													<Upload className="h-4 w-4 mr-2" />
													{previewUrl ? "Change Image" : "Upload Image"}
												</Button>
												<p className="text-xs text-muted-foreground">
													PNG, JPG, GIF up to 5MB
												</p>
											</div>
										</div>

										<input
											type="file"
											accept="image/*"
											className="hidden"
											ref={(e) => {
												ref(e);
												inputRef.current = e;
											}}
											onChange={(e) => handleImageChange(e, onChange)}
											name={field.name}
											onBlur={field.onBlur}
											disabled={field.disabled}
										/>
									</div>
								)}
							/>
							{errors.avatar?.message && (
								<div className="flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									{errors.avatar.message}
								</div>
							)}
						</div>

						{/* Name Field */}
						<div className="space-y-2">
							<Label htmlFor="name">
								Full Name <span className="text-destructive">*</span>
							</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your full name"
								{...register("name")}
								className={cn(
									errors.name &&
										"border-destructive focus-visible:ring-destructive/20"
								)}
							/>
							{errors.name && (
								<div className="flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									{errors.name.message}
								</div>
							)}
						</div>

						{/* Email Field */}
						<div className="space-y-2">
							<Label htmlFor="email">
								Email Address <span className="text-destructive">*</span>
							</Label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									id="email"
									type="email"
									placeholder="Enter your email address"
									className={cn(
										"pl-10",
										errors.email &&
											"border-destructive focus-visible:ring-destructive/20"
									)}
									{...register("email")}
								/>
							</div>
							{errors.email && (
								<div className="flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									{errors.email.message}
								</div>
							)}
						</div>

						{/* Phone Number Field */}
						<div className="space-y-2">
							<Label htmlFor="phoneNumber">
								Phone Number <span className="text-destructive">*</span>
							</Label>
							<div className="relative">
								<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									id="phoneNumber"
									type="tel"
									placeholder="Enter your phone number"
									className={cn(
										"pl-10",
										errors.phoneNumber &&
											"border-destructive focus-visible:ring-destructive/20"
									)}
									{...register("phoneNumber")}
								/>
							</div>
							{errors.phoneNumber && (
								<div className="flex items-center gap-2 text-sm text-destructive">
									<AlertCircle className="h-4 w-4" />
									{errors.phoneNumber.message}
								</div>
							)}
						</div>

						{/* Submit Button */}
						<div className="flex gap-3 pt-4 border-t">
							<Button
								type="submit"
								className="flex-1 bg-black text-white hover:bg-black/80"
								size="lg"
								disabled={!isDirty}
							>
								<>
									<Save className="h-4 w-4 mr-2" />
									Update Profile
								</>
							</Button>
						</div>

						<p className="text-xs text-muted-foreground text-center">
							Your information is secure and will only be used to personalize
							your experience.
						</p>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default ProfileForm;
