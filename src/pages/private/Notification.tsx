import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotificationPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl font-bold">Notification</h1>
			<h2 className="text-lg font-bold">Coming Soon</h2>
			<p className="text-sm">
				We are working on this feature and it will be available soon.
			</p>
			<Button variant="default" className="mt-4">
				<Link to="/home" className="text-sm">
					Back to Home
				</Link>
			</Button>
		</div>
	);
};

export default NotificationPage;
