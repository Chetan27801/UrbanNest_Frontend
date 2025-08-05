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
import GoogleButton from "../common/GoogleButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/schema/auth.schema";
import { useLogin } from "@/services/authService";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
	const login = useLogin();
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			navigate("/");
		}
	}, [token, navigate]);

	const onSubmit = async (data: LoginFormData) => {
		try {
			await login.mutateAsync(data);
			toast.success("Login successful");
			queryClient.invalidateQueries({ queryKey: ["user"] });
			navigate("/");
		} catch (error) {
			console.error("Login failed:", error);
			toast.error("Login failed");
		}
	};

	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Login to your account</CardTitle>
				<CardDescription>
					Enter your email below to login to your account.
				</CardDescription>
				<CardAction>
					<Button variant="link" asChild>
						<Link to="/register">Sign Up</Link>
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								{...register("email")}
								required
							/>
							{errors.email && (
								<p className="text-red-500">{errors.email.message}</p>
							)}
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</Link>
							</div>
							<div className="relative">
								<Input
									id="password"
									type={showPassword ? "text" : "password"}
									{...register("password")}
									className="pr-10"
									required
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
					</div>
					<div className="flex flex-col gap-2 mt-6">
						<Button
							type="submit"
							className="w-full"
							disabled={isSubmitting || login.isPending}
						>
							{isSubmitting || login.isPending ? "Logging in..." : "Login"}
						</Button>
						<GoogleButton className="w-full" />
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default LoginForm;
