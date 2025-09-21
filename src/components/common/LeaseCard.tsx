import type { Lease } from "@/types/lease";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
	MapPin,
	Phone,
	Mail,
	Receipt,
	Loader2,
	Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { useTerminateLease } from "@/services/leaseService";
import BillingHistoryModal from "./BillingHistoryModal";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { LeaseStatus } from "@/utils/enums";
import PdfDownloadButton from "./PdfDownloadButton";

interface LeaseCardProps {
	lease: Lease;
	isTenant?: boolean;
}

const LeaseCard = ({ lease, isTenant = false }: LeaseCardProps) => {
	const navigate = useNavigate();
	const { mutate: terminateLease, isPending: isTerminatingLease } =
		useTerminateLease();
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "INR",
		}).format(amount);
	};

	const isActiveLease = lease.isActive === LeaseStatus.Active;

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	const getNextPaymentDate = () => {
		// Calculate next payment date based on start date and current date
		const startDate = new Date(lease.startDate);
		const currentDate = new Date();
		const nextMonth = new Date(currentDate);
		nextMonth.setMonth(nextMonth.getMonth() + 1);
		nextMonth.setDate(startDate.getDate());
		return nextMonth;
	};

	const getRentalDuration = () => {
		const start = new Date(lease.startDate);
		const end = new Date(lease.endDate);
		return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
	};

	return (
		<Card className="w-full mb-4 overflow-hidden">
			<CardContent className="p-4">
				<div className="flex flex-row min-h-[135px] h-[135px] gap-4">
					{/* Property Image with left border radius */}
					<div className="w-48 h-full flex-shrink-0">
						<img
							src={lease.property.photoUrls?.[0] || "/placeholder-property.jpg"}
							alt={lease.property.name}
							className="w-full h-full object-cover rounded-lg"
						/>
					</div>

					{/* Property Information */}
					<div className="flex-1 px-3">
						<div className="mb-2">
							<h3 className="text-xl font-semibold text-gray-900 mb-1">
								{lease.property.name}
							</h3>
							<div className="flex items-center text-gray-600 text-sm mb-2">
								<MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
								<span className="line-clamp-1">
									{lease.property.location.address},{" "}
									{lease.property.location.city},{" "}
									{lease.property.location.state}
								</span>
							</div>
							<div className="flex items-baseline gap-2 mb-2">
								<span className="text-2xl font-bold text-gray-900">
									{formatCurrency(lease.rent)}
								</span>
								<span className="text-gray-500 text-sm">/month</span>
								<span className="text-gray-500 text-sm ml-4">
									Rented for{" "}
									<span className="font-medium text-gray-700">
										{getRentalDuration()} days
									</span>
								</span>
							</div>
						</div>
					</div>

					<Separator
						orientation="vertical"
						className="h-full bg-gray-200 mx-2"
					/>

					{/* Status and Dates Section */}
					<div className="w-48 space-y-1 px-2">
						<div className="grid grid-rows-4 gap-y-1 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-500">Status</span>
								<Badge
									variant="outline"
									className={cn(
										"text-xs",
										lease.isActive === LeaseStatus.Active
											? "bg-green-50 text-green-700 border-green-200"
											: "bg-gray-50 text-red-700 border-red-200"
									)}
								>
									{lease.isActive === LeaseStatus.Active
										? "Active"
										: "Terminated"}
								</Badge>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500">Start Date</span>
								<span className="font-medium text-gray-900">
									{format(new Date(lease.startDate), "dd/MM/yyyy")}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500">End Date</span>
								<span className="font-medium text-gray-900">
									{format(new Date(lease.endDate), "dd/MM/yyyy")}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-500">Next Payment</span>
								<span className="font-medium text-gray-900">
									{format(getNextPaymentDate(), "dd/MM/yyyy")}
								</span>
							</div>
						</div>
					</div>

					<Separator
						orientation="vertical"
						className="h-full bg-gray-200 mx-2"
					/>
					{/* Renter Information */}
					<div className="w-72 px-3">
						<div className="flex flex-col mb-4">
							<h4 className="text-sm font-semibold text-gray-900 mb-2">
								{isTenant ? "Landlord" : "Renters"}
							</h4>
							<Separator className="w-full" />
						</div>

						<div>
							<div className="flex items-start gap-3">
								<Avatar className="h-12 w-12 flex-shrink-0">
									<AvatarImage
										src={isTenant ? lease.landlord.avatar : lease.tenant.avatar}
									/>
									<AvatarFallback className="bg-blue-50 text-blue-600 font-medium">
										{getInitials(
											isTenant ? lease.landlord.name : lease.tenant.name
										)}
									</AvatarFallback>
								</Avatar>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-gray-900 text-sm mb-1">
										{isTenant ? lease.landlord.name : lease.tenant.name}
									</p>
									<div className="space-y-1">
										<div className="flex items-center text-xs text-gray-600">
											<Phone className="h-3 w-3 mr-2 flex-shrink-0" />
											<span className="truncate">
												{isTenant
													? lease.landlord.phoneNumber
													: lease.tenant.phoneNumber || "+62 853 7000 5677"}
											</span>
										</div>
										<div className="flex items-center text-xs text-gray-600">
											<Mail className="h-3 w-3 mr-2 flex-shrink-0" />
											<span className="truncate">
												{isTenant ? lease.landlord.email : lease.tenant.email}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Separator className="my-3" />

				{/* Action Buttons */}
				<div
					className={`flex items-center ${
						isActiveLease ? "justify-between" : "justify-end"
					}`}
				>
					{isActiveLease && (
						<div className="flex gap-3">
							<BillingHistoryModal leaseId={lease._id}>
								<Button
									variant="outline"
									size="sm"
									className="flex items-center gap-2"
								>
									<Receipt className="h-4 w-4" />
									Billing History
								</Button>
							</BillingHistoryModal>
							{!isTenant && (
								<Button
									variant="destructive"
									size="sm"
									className="flex items-center gap-2"
									disabled={isTerminatingLease}
									onClick={() => terminateLease(lease._id)}
								>
									{isTerminatingLease ? (
										<Loader2 className="h-4 w-4 animate-spin" />
									) : (
										<Trash2 className="h-4 w-4" />
									)}
									Terminate Lease
								</Button>
							)}
						</div>
					)}
					<div className="flex gap-3">
						<Button
							variant="outline"
							size="sm"
							className="flex items-center gap-2"
							onClick={() => navigate(`/property/${lease.property._id}`)}
						>
							<Receipt className="h-4 w-4" />
							Detail Property
						</Button>
						<PdfDownloadButton
							className="flex items-center gap-2"
							leaseId={lease._id}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default LeaseCard;
