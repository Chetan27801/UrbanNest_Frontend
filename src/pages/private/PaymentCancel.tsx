import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaymentCancel = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/dashboard");
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<div className="text-yellow-600 animate-pulse text-6xl mb-4">⚠️</div>
				<h1 className="text-2xl font-bold text-yellow-600 mb-2">
					Payment Cancelled
				</h1>
				<p className="text-gray-600 mb-4">
					You have cancelled the payment process.
				</p>
				<p className="text-sm text-gray-500 mb-4">
					You will be redirected back to payments in 5 seconds...
				</p>
				<button
					onClick={() => navigate("/tenant/payment-methods")}
					className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
				>
					Back to Payments Now
				</button>
			</div>
		</div>
	);
};

export default PaymentCancel;
