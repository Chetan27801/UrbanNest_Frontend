import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PaymentSuccessState } from "@/utils/enums";
import { useState } from "react";
import api from "@/utils/apiAxios";
import API_CONSTANT from "@/utils/apiConstant";
import { Check, Loader2, X } from "lucide-react";

const PaymentSuccess = () => {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const [status, setStatus] = useState<PaymentSuccessState>(
		PaymentSuccessState.Loading
	);
	const hasProcessedRef = useRef(false); // Persist across re-renders

	useEffect(() => {
		const capturePayment = async () => {
			// Prevent duplicate execution using ref
			if (hasProcessedRef.current) return;
			hasProcessedRef.current = true;

			try {
				const paymentId = searchParams.get("paymentId");
				const orderId = searchParams.get("token");
				const payerId = searchParams.get("PayerID");

				console.log("Processing payment capture:", {
					paymentId,
					orderId,
					payerId,
				});

				if (!paymentId || !orderId || !payerId) {
					setStatus(PaymentSuccessState.Failed);
					return;
				}

				const response = await api.post(API_CONSTANT.PAYMENTS.CAPTURE_PAYMENT, {
					paymentId,
					orderId,
				});

				console.log("=====================================");
				console.log(response);
				console.log("=====================================");

				setStatus(PaymentSuccessState.Success);

				// Navigate after 3 seconds
				setTimeout(() => {
					navigate("/dashboard");
				}, 3000);
			} catch (error) {
				setStatus(PaymentSuccessState.Failed);
				console.error("Payment capture error:", error);

				// Navigate after 5 seconds even on error
				setTimeout(() => {
					navigate("/dashboard");
				}, 5000);
			}
		};

		capturePayment();
	}, [searchParams, navigate]);

	if (status === PaymentSuccessState.Loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-pulse mx-auto mb-4" />
					<p className="mt-4 text-lg">Processing your payment...</p>
				</div>
			</div>
		);
	}

	if (status === PaymentSuccessState.Failed) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<div className="text-red-600 text-6xl mb-4">
						<X className="h-8 w-8 animate-spin mx-auto mb-4" />
					</div>
					<h1 className="text-2xl font-bold text-red-600 mb-2">
						Payment Failed
					</h1>
					<p className="text-gray-600 mb-4">
						There was an error processing your payment.
					</p>
					<button
						onClick={() => navigate("/tenant/payment-methods")}
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
					>
						Back to Payments
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<div className="text-green-600 text-6xl mb-4">
					<Check className="h-8 w-8 animate-spin mx-auto mb-4" />
				</div>
				<h1 className="text-2xl font-bold text-green-600 mb-2">
					Payment Successful!
				</h1>
				<p className="text-gray-600 mb-4">
					Your payment has been processed successfully.
				</p>
				<p className="text-sm text-gray-500">
					Redirecting to payment history...
				</p>
			</div>
		</div>
	);
};

export default PaymentSuccess;
