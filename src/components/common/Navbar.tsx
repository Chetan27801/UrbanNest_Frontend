import { Link } from "react-router-dom";
import { MdChatBubbleOutline, MdNotificationsActive } from "react-icons/md";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = () => {
	const { isAuthenticated, user } = useAuth();
	return (
		<nav className="fixed top-0 left-0 right-0 w-full z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-lg shadow-black/20">
			<div className="flex justify-between items-center px-6 py-4 max-w-8xl mx-auto">
				<h1 className="text-2xl font-bold text-white">
					<span className="text-cyan-600">Urban</span>Nest
				</h1>

				<div className="flex items-center gap-8">
					<Link
						to="/"
						className="text-white font-medium hover:text-cyan-600 transition-colors duration-300 relative group"
					>
						Rental
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
					</Link>
					<Link
						to="/listing"
						className="text-white font-medium hover:text-cyan-600 transition-colors duration-300 relative group"
					>
						Listing
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
					</Link>
					<Link
						to="/explore"
						className="text-white font-medium hover:text-cyan-600 transition-colors duration-300 relative group"
					>
						Explore
						<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
					</Link>
				</div>

				{/* Login and Register Buttons - before login */}
				{!isAuthenticated && (
					<div className="flex items-center gap-4">
						<Button
							variant="ghost"
							className="text-white hover:text-white/80 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300"
						>
							<Link to="/login">Login</Link>
						</Button>
						<Button
							variant="ghost"
							className="text-white hover:text-white/80 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300"
						>
							<Link to="/register">Register</Link>
						</Button>
					</div>
				)}

				{/* Chat, Notification and Profile Buttons - after login */}
				{isAuthenticated && (
					<div className="flex items-center gap-4">
						<div className="text-white p-2 rounded-full hover:text-white/80 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300">
							<Link to="/chat">
								<MdChatBubbleOutline className="w-5 h-5" />
							</Link>
						</div>
						<div className="text-white p-2 rounded-full hover:text-white/80 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300">
							<Link to="/notification">
								<MdNotificationsActive className="w-5 h-5" />
							</Link>
						</div>
						<div className="text-white p-2 rounded-full hover:text-white/80 hover:bg-white/10 border border-white/20 hover:border-white/30 transition-all duration-300">
							<Link to="/dashboard">
								<Avatar className="w-8 h-8 bg-black">
									<AvatarImage src={user?.avatar || ""} />
									<AvatarFallback>
										{user?.name?.charAt(0) || "U"}
									</AvatarFallback>
								</Avatar>
							</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
