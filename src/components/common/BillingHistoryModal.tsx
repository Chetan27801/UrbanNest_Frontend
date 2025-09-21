import { useEffect, useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Loader2, Receipt, Calendar, CreditCard } from "lucide-react";
import {
	useCreatePayment,
	useGetPaymentsByLease,
} from "@/services/paymentService";
import type { Payment } from "@/types/payment";
import { PaymentStatus } from "@/utils/enums";
import { format } from "date-fns";
import { FaRupeeSign } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";

interface BillingHistoryModalProps {
	leaseId: string;
	children: React.ReactNode;
}

const BillingHistoryModal = ({
	leaseId,
	children,
}: BillingHistoryModalProps) => {
	const [open, setOpen] = useState(false);
	const [status, setStatus] = useState("all");
	const { user } = useAuth();
	const {
		data: paymentsData,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		refetch,
	} = useGetPaymentsByLease(leaseId, 10, status);

	// Handle status change and trigger API call
	const handleStatusChange = (newStatus: string) => {
		setStatus(newStatus);
	};

	// Trigger refetch when status changes
	useEffect(() => {
		if (open && status) {
			refetch();
		}
	}, [status, open, refetch]);

	const allPayments =
		paymentsData?.pages.flatMap((page) => page.payments) || [];

	const getStatusColor = (status: string) => {
		switch (status) {
			case PaymentStatus.Paid:
				return "bg-green-100 text-green-800 border-green-200";
			case PaymentStatus.Pending:
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case PaymentStatus.Overdue:
				return "bg-red-100 text-red-800 border-red-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "INR",
		}).format(amount);
	};

	const createPaymentMutation = useCreatePayment();

	const handlePayBill = async (payment: Payment) => {
		try {
			console.log("Pay bill clicked for payment:", payment._id);

			const response = await createPaymentMutation.mutateAsync(payment._id);

			// Add cache-busting parameters to PayPal URL
			const url = new URL(response.approvalUrl);
			url.searchParams.append("cache_buster", Date.now().toString());
			url.searchParams.append("user_id", user?.id || "anonymous");

			// Clear any PayPal-related data from browser storage
			localStorage.removeItem("paypal");
			sessionStorage.removeItem("paypal");

			window.location.href = url.toString();
			console.log("Payment response:", response);

			// Optionally refetch payments to update the UI
			refetch();
		} catch (error) {
			toast.error("Payment failed " + error);
		}
	};

	const shouldShowPayButton = (payment: Payment) => {
		return (
			(payment.paymentStatus === PaymentStatus.Pending ||
				payment.paymentStatus === PaymentStatus.Overdue ||
				payment.paymentStatus === PaymentStatus.PartiallyPaid) &&
			user?.role === "tenant"
		);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[85vh] w-[100vw]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Receipt className="h-5 w-5" />
						Billing History
					</DialogTitle>
				</DialogHeader>
				<Tabs
					value={status}
					onValueChange={handleStatusChange}
					className="w-full"
				>
					<TabsList className="grid w-full grid-cols-5">
						<TabsTrigger value="all" className="w-full">
							All
						</TabsTrigger>
						<TabsTrigger value={PaymentStatus.Paid} className="w-full">
							{PaymentStatus.Paid}
						</TabsTrigger>
						<TabsTrigger value={PaymentStatus.Pending} className="w-full">
							{PaymentStatus.Pending}
						</TabsTrigger>
						<TabsTrigger value={PaymentStatus.Overdue} className="w-full">
							{PaymentStatus.Overdue}
						</TabsTrigger>
					</TabsList>
					<TabsContent value={status}>
						<ScrollArea className="h-[65vh] pr-4">
							{isLoading ? (
								<div className="flex justify-center items-center h-32">
									<Loader2 className="h-6 w-6 animate-spin" />
								</div>
							) : allPayments.length === 0 ? (
								<div className="text-center py-8">
									<Receipt className="h-12 w-12 mx-auto text-gray-400 mb-4" />
									<p className="text-gray-500">No billing history found</p>
								</div>
							) : (
								<div className="space-y-6">
									{allPayments.map((payment: Payment) => (
										<div
											key={payment._id}
											className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
										>
											<div className="flex justify-between items-start mb-3">
												<div className="flex items-center gap-2">
													<FaRupeeSign className="h-4 w-4 text-gray-500" />
													<span className="font-semibold text-lg">
														{formatCurrency(payment.amountDue)}
													</span>
												</div>
												<div className="flex items-center gap-2">
													<Badge
														variant="outline"
														className={getStatusColor(payment.paymentStatus)}
													>
														{payment.paymentStatus}
													</Badge>
													{shouldShowPayButton(payment) && (
														<Button
															size="sm"
															onClick={() => handlePayBill(payment)}
															className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium"
														>
															<CreditCard className="h-3 w-3 mr-1.5" />
															Pay Bill
														</Button>
													)}
												</div>
											</div>

											<div className="grid grid-cols-2 gap-6 text-sm">
												<div className="flex items-center gap-2">
													<Calendar className="h-3 w-3 text-gray-400" />
													<span className="text-gray-600">Due Date:</span>
													<span className="font-medium">
														{format(new Date(payment.dueDate), "MMM dd, yyyy")}
													</span>
												</div>

												{payment.paymentDate && (
													<div className="flex items-center gap-2">
														<Calendar className="h-3 w-3 text-green-400" />
														<span className="text-gray-600">Paid Date:</span>
														<span className="font-medium">
															{format(
																new Date(payment.paymentDate),
																"MMM dd, yyyy"
															)}
														</span>
													</div>
												)}

												{payment.amountPaid > 0 && (
													<div className="flex items-center gap-2">
														<FaRupeeSign className="h-3 w-3 text-green-400" />
														<span className="text-gray-600">Amount Paid:</span>
														<span className="font-medium text-green-600">
															{formatCurrency(payment.amountPaid)}
														</span>
													</div>
												)}

												{payment.paymentMethod &&
													payment.paymentStatus === PaymentStatus.Paid && (
														<div className="flex items-center gap-2">
															<span className="text-gray-600">Method:</span>
															<span className="font-medium">
																{payment.paymentMethod}
															</span>
														</div>
													)}
											</div>

											{payment.notes &&
												payment.paymentStatus === PaymentStatus.Paid && (
													<div className="mt-3 p-2 bg-gray-50 rounded text-sm">
														<span className="text-gray-600">Notes: </span>
														<span>{payment.notes}</span>
													</div>
												)}

											{payment.transactionId && (
												<div className="mt-2 text-xs text-gray-500">
													Transaction ID: {payment.transactionId}
												</div>
											)}
										</div>
									))}

									{hasNextPage && (
										<div className="flex justify-center pt-4">
											<Button
												variant="outline"
												onClick={() => fetchNextPage()}
												disabled={isFetchingNextPage}
											>
												{isFetchingNextPage ? (
													<>
														<Loader2 className="h-4 w-4 animate-spin mr-2" />
														Loading...
													</>
												) : (
													"Load More"
												)}
											</Button>
										</div>
									)}
								</div>
							)}
						</ScrollArea>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default BillingHistoryModal;
