import { Outlet } from "react-router-dom";
import Footer from "../common/Footer";

const FooterLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="min-h-screen">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default FooterLayout;
