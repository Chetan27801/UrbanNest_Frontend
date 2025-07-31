import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router-dom";

const ForgotPasswordForm = () => {
	return (
		<Card className="w-full max-w-sm ">
			<CardHeader>
				<CardTitle>Forgot your password?</CardTitle>
			</CardHeader>
			<CardContent>
				<form>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
							/>
						</div>
					</div>
				</form>
				<div className="flex flex-col gap-2 mt-4">
					<CardDescription>
						Remember your password?{" "}
						<Button variant="link" asChild>
							<Link to="/login">Login</Link>
						</Button>
					</CardDescription>
				</div>
			</CardContent>
			<CardFooter className="flex-col gap-2">
				<Button type="submit" className="w-full">
					Login
				</Button>
			</CardFooter>
		</Card>
	);
};

export default ForgotPasswordForm;
