import api from "@/utils/apiAxios";
import API_ENDPOINTS from "@/utils/apiConstant";
import type { ErrorResponse } from "@/types/error";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// PDF Service Functions
export const pdfService = {
	downloadLeaseAgreementPDF: async (leaseId: string): Promise<Blob> => {
		const response = await api.get(
			API_ENDPOINTS.PDF.GENERATE_LEASE_AGREEMENT_PDF(leaseId),
			{
				responseType: "blob",
				headers: {
					Accept: "application/pdf",
				},
			}
		);
		return response.data;
	},

	previewLeaseAgreementPDF: async (leaseId: string): Promise<string> => {
		const response = await api.get(
			API_ENDPOINTS.PDF.PREVIEW_LEASE_AGREEMENT_PDF(leaseId),
			{
				responseType: "blob",
				headers: {
					Accept: "application/pdf",
				},
			}
		);

		// Create blob URL for preview
		const blob = new Blob([response.data], { type: "application/pdf" });
		return URL.createObjectURL(blob);
	},
};

// Utility function to download blob as file
const downloadBlob = (blob: Blob, filename: string) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
};

// TanStack Query Hooks
export const useDownloadLeaseAgreementPDF = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			leaseId,
			filename,
		}: {
			leaseId: string;
			filename?: string;
		}) => {
			const blob = await pdfService.downloadLeaseAgreementPDF(leaseId);
			const defaultFilename = `lease-agreement.pdf`;
			downloadBlob(blob, filename || defaultFilename);
			return { success: true, leaseId };
		},
		onSuccess: () => {
			toast.success("PDF downloaded successfully!");
			// Invalidate related queries if needed
			queryClient.invalidateQueries({
				queryKey: ["leases"],
			});
		},
		onError: (error: ErrorResponse) => {
			console.error("PDF download failed:", error);
			const message = error?.message || "Failed to download PDF";
			toast.error(message);
		},
	});
};

export const usePreviewLeaseAgreementPDF = () => {
	return useMutation({
		mutationFn: async (leaseId: string) => {
			const blobUrl = await pdfService.previewLeaseAgreementPDF(leaseId);
			// Open in new tab
			window.open(blobUrl, "_blank", "width=800,height=900");
			return { success: true, leaseId };
		},
		onSuccess: () => {
			toast.success("PDF opened in new tab");
		},
		onError: (error: ErrorResponse) => {
			console.error("PDF preview failed:", error);
			const message = error?.message || "Failed to preview PDF";
			toast.error(message);
		},
	});
};

// Advanced hook with multiple options
export const useLeaseAgreementPDF = () => {
	const downloadMutation = useDownloadLeaseAgreementPDF();
	const previewMutation = usePreviewLeaseAgreementPDF();

	const downloadPDF = async (
		leaseId: string,
		options?: { filename?: string }
	) => {
		return downloadMutation.mutateAsync({
			leaseId,
			filename: options?.filename,
		});
	};

	const previewPDF = async (leaseId: string) => {
		return previewMutation.mutateAsync(leaseId);
	};

	const downloadWithCustomName = async (
		leaseId: string,
		tenantName: string
	) => {
		const filename = `lease-agreement-${tenantName
			.replace(/\s+/g, "-")
			.toLowerCase()}-${leaseId}.pdf`;
		return downloadPDF(leaseId, { filename });
	};

	return {
		downloadPDF,
		previewPDF,
		downloadWithCustomName,
		isDownloading: downloadMutation.isPending,
		isPreviewing: previewMutation.isPending,
		isLoading: downloadMutation.isPending || previewMutation.isPending,
		downloadError: downloadMutation.error,
		previewError: previewMutation.error,
		error: downloadMutation.error || previewMutation.error,
	};
};
