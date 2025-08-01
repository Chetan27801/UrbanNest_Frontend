import { Outlet } from "react-router-dom";
import Navbar from "../common/Navbar";

const NavbarLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="flex-1 pt-20">
				<Outlet />
			</main>
		</div>
	);
};

export default NavbarLayout;
