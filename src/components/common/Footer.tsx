import { Button } from "../ui/button";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-black text-white py-8">
			<div className="max-w-7xl mx-auto px-6">
				{/* Main Footer Content */}
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
					{/* Company Info */}
					<div>
						<h3 className="text-2xl font-bold mb-2">
							<span className="text-cyan-600">Urban</span>Nest
						</h3>
						<p className="text-gray-400 text-sm max-w-md">
							Connecting renters with their perfect homes.
						</p>
					</div>

					{/* Essential Links */}
					<div className="flex flex-wrap gap-6 text-sm">
						<Link
							to="/about"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							About
						</Link>
						<Link
							to="/contact"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							Contact
						</Link>
						<Link
							to="/privacy"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							Privacy
						</Link>
						<Link
							to="/terms"
							className="text-gray-400 hover:text-white transition-colors duration-300"
						>
							Terms
						</Link>
					</div>

					{/* Social Media */}
					<div className="flex gap-3">
						<Button
							size="sm"
							variant="ghost"
							className="w-8 h-8 p-0 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors duration-300"
						>
							<FaLinkedin className="w-4 h-4" />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							className="w-8 h-8 p-0 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors duration-300"
						>
							<FaInstagram className="w-4 h-4" />
						</Button>
						<Button
							size="sm"
							variant="ghost"
							className="w-8 h-8 p-0 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors duration-300"
						>
							<FaTwitter className="w-4 h-4" />
						</Button>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="border-t border-gray-800 pt-6 text-center">
					<p className="text-gray-400 text-sm">
						© 2025 UrbanNest. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
