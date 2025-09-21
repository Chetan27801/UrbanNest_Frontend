import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardAction,
	CardContent,
} from "../ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import GoogleButton from "../common/GoogleButton";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/schema/auth.schema";
import { useRegister } from "@/services/authService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import type { ErrorResponse } from "@/types/error";
import API_ENDPOINTS from "@/utils/apiConstant";

const RegisterForm = () => {
	const queryClient = useQueryClient();
	const registerMutation = useRegister();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			role: "tenant",
		},
	});

	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token, navigate]);

	const onSubmit = (data: RegisterFormData) => {
		registerMutation.mutate(data, {
			onSuccess: () => {
				toast.success("Register successful");
				queryClient.invalidateQueries({ queryKey: ["user"] });
				navigate("/");
			},
			onError: (error: unknown) => {
				const errorMessage =
					error instanceof Error && "message" in error
						? (error as ErrorResponse)?.message
						: "Failed to register";
				toast.error(errorMessage);
				console.error(error);
			},
		});
	};

	const handleGoogleAuth = () => {
		window.location.href = API_ENDPOINTS.AUTH.GOOGLE_AUTH;
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Create an account</CardTitle>
				<CardDescription>
					Enter your information below to create an account.
				</CardDescription>
				<CardAction>
					<Button variant="link" asChild>
						<Link to="/login">Login</Link>
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input
								id="name"
								type="text"
								placeholder="John Doe"
								required
								{...register("name")}
							/>
							{errors.name && (
								<p className="text-red-500">{errors.name.message}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								{...register("email")}
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									className="pr-10"
									required
									{...register("password")}
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 flex items-center pr-3"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOffIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
									) : (
										<EyeIcon className="w-4 h-4 text-gray-500 hover:text-gray-700" />
									)}
								</button>
							</div>
							{errors.password && (
								<p className="text-red-500">{errors.password.message}</p>
							)}
						</div>
						<div className="grid gap-2">
							<Label htmlFor="role">Role</Label>
							<Controller
								name="role"
								control={control}
								render={({ field }) => (
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="Select your role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="tenant">
												Tenant (Looking for properties)
											</SelectItem>
											<SelectItem value="landlord">
												Landlord (Renting out properties)
											</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
							{errors.role && (
								<p className="text-red-500">{errors.role.message}</p>
							)}
						</div>
					</div>
					<div className="flex flex-col gap-2 mt-6">
						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting || registerMutation.isPending}
						>
							{isSubmitting || registerMutation.isPending
								? "Creating account..."
								: "Create account"}
						</Button>
						<GoogleButton
							className="w-full"
							handleGoogleAuth={handleGoogleAuth}
						/>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
