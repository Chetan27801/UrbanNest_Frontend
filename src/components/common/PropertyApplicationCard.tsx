import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { MapPin, Phone, Mail, MessageSquareText } from "lucide-react";
import { ApplicationStatus } from "@/utils/enums";
import type { Application } from "@/types/application";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

const PropertyApplicationCard = ({
	application,
}: {
	application: Application;
}) => {
	const getStatusClasses = (status: ApplicationStatus) => {
		switch (status) {
			case ApplicationStatus.Approved:
				return "bg-green-100 text-green-800 border-green-300";
			case ApplicationStatus.Rejected:
				return "bg-red-100 text-red-800 border-red-300";
			case ApplicationStatus.Pending:
			default:
				return "bg-amber-100 text-amber-800 border-amber-300";
		}
	};

	return (
		<TooltipProvider>
			<Card className="flex flex-col h-75 md:flex-row w-full p-2 overflow-hidden transition-all duration-300 border-slate-200 hover:shadow-xl hover:border-slate-300 cursor-pointer">
				{/* --- Left Column: Property Details --- */}
				<div className="w-full md:w-2/5 flex-shrink-0 p-4">
					<div className="relative h-48 md:h-full rounded-lg">
						<img
							src={application.property.photoUrls[0]}
							alt={application.property.name}
							className="w-full h-full object-cover rounded-lg"
						/>
						<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white rounded-lg">
							<h3 className="text-lg font-bold leading-tight drop-shadow-sm">
								{application.property.name}
							</h3>
							<p className="text-xs flex items-center gap-1.5 mt-1 opacity-90 drop-shadow-sm">
								<MapPin className="w-3 h-3 flex-shrink-0" />
								{application.property.location.city},{" "}
								{application.property.location.state}
							</p>
						</div>
					</div>
				</div>

				{/* --- Right Column: Application & Tenant Details --- */}
				<div className="p-2 flex-grow flex flex-col gap-4">
					{/* --- Top Row: Status and Dates --- */}
					<div className="flex justify-between items-start gap-4">
						<div className="flex flex-col text-left">
							<span className="text-xs text-slate-500">Status</span>
							<Badge
								variant="outline"
								className={`capitalize font-bold ${getStatusClasses(
									application.status
								)}`}
							>
								{application.status}
							</Badge>
						</div>
						<div className="flex flex-col text-right">
							<span className="text-xs text-slate-500">Applied On</span>
							<span className="font-semibold text-sm text-slate-700">
								{format(new Date(application.applicationDate), "dd MMM yyyy")}
							</span>
						</div>
					</div>

					<Separator />

					{/* --- Middle Row: Applicant Info --- */}
					<div className="flex items-center gap-4">
						<Avatar className="w-10 h-10 border">
							<AvatarImage src={application.tenant.avatar} />
							<AvatarFallback className="text-xl">
								{application.tenant.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<span className="font-bold text-slate-900 text-sm">
								{application.tenant.name}
							</span>
							<div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-sm text-slate-600 mt-1">
								<a
									href={`mailto:${application.tenant.email}`}
									className="flex items-center gap-1.5 hover:underline"
								>
									<Mail className="w-3.5 h-3.5" />
									{application.tenant.email}
								</a>
								<a
									href={`tel:${application.tenant.phoneNumber}`}
									className="flex items-center gap-1.5 hover:underline"
								>
									<Phone className="w-3.5 h-3.5" />
									{application.tenant.phoneNumber}
								</a>
							</div>
						</div>
					</div>

					{/* --- Bottom Row: Applicant Message --- */}
					{application.message && (
						<div className="mt-2">
							<div className="text-sm text-slate-500 flex items-center gap-2 mb-1">
								<MessageSquareText className="w-4 h-4" />
								<span>Applicant Message</span>
							</div>
							<Tooltip>
								<TooltipTrigger className="w-80">
									<TooltipContent className="bg-slate-700 text-white p-2 rounded-md">
										<p>{application.message}</p>
									</TooltipContent>
									<div className=" w-80 text-sm text-slate-700 bg-slate-50 p-3 rounded-md border border-slate-200 italic truncate">
										"{application.message}"
									</div>
								</TooltipTrigger>
							</Tooltip>
						</div>
					)}

					<div className="flex flex-row justify-between items-center">
						<Button variant="default">View Property</Button>
						<Select
							onValueChange={(value) => {
								console.log(value);
							}}
						>
							<SelectTrigger className=" bg-slate-50 text-slate-700">
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="approve">Approve</SelectItem>
								<SelectItem value="reject">Reject</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</Card>
		</TooltipProvider>
	);
};

export default PropertyApplicationCard;
