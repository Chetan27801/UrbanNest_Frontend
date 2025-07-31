import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";

const GoogleButton = ({ className }: { className?: string }) => {
	return (
		<Button variant="outline" className={cn("w-full", className)}>
			<FcGoogle className="size-5 mt-0.5" />
			<span>Sign in with Google</span>
		</Button>
	);
};

export default GoogleButton;
