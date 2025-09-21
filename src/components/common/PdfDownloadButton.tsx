import { Download, Loader2 } from "lucide-react";
import { useLeaseAgreementPDF } from "@/services/pdfService";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const PdfDownloadButton = ({
	className,
	leaseId,
}: {
	className: string;
	leaseId: string;
}) => {
	const { downloadPDF, isDownloading } = useLeaseAgreementPDF();
	return (
		<Button
			variant="outline"
			size="sm"
			className={cn("flex items-center gap-2", className)}
			onClick={() => downloadPDF(leaseId)}
			disabled={isDownloading}
		>
			{isDownloading ? (
				<Loader2 className="h-4 w-4 animate-spin" />
			) : (
				<Download className="h-4 w-4" />
			)}
			Download Agreement
		</Button>
	);
};

export default PdfDownloadButton;
