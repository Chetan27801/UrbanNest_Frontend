import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/lib/utils";

const GoogleButton = ({ className, handleGoogleAuth }: { className?: string, handleGoogleAuth?: () => void }) => {
	return (
		<Button
			variant="outline"
			className={cn("w-full cursor-pointer", className)}
			onClick={handleGoogleAuth}
		>
			<FcGoogle className="size-5 mt-0.5" />
			<span>Sign in with Google</span>
		</Button>
	);
};

export default GoogleButton;
