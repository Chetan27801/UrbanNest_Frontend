import { Toaster } from "react-hot-toast";

const AppToast = () => {
	return (
		<div>
			<Toaster
				position="top-right"
				toastOptions={{
					duration: 2000,
					style: {
						background: "#363636",
						color: "#fff",
					},
					success: {
						duration: 2000,
						iconTheme: {
							primary: "#4ade80",
							secondary: "#fff",
						},
					},
					error: {
						duration: 3000,
						iconTheme: {
							primary: "#ef4444",
							secondary: "#fff",
						},
					},
				}}
			/>
		</div>
	);
};

export default AppToast;
