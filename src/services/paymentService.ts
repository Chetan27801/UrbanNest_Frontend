import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/utils/apiAxios";
import { QUERY_KEYS } from "@/lib/queryClient";
import API_CONSTANT from "@/utils/apiConstant";
import type { PaymentResponse } from "@/types/payment";

export const paymentApiFunctions = {
	getPaymentsByLeaseId: async (
		leaseId: string,
		page: number = 1,
		limit: number = 10,
		status: string = "all"
	): Promise<PaymentResponse> => {
		const response = await api.get(
			API_CONSTANT.PAYMENTS.GET_BY_LEASE_ID(leaseId, status),
			{
				params: { page, limit },
			}
		);
		return response.data.data;
	},
	getPaymentHistory: async (
		page: number,
		limit: number,
		status: string
	): Promise<PaymentResponse> => {
		const response = await api.get(API_CONSTANT.PAYMENTS.GET_HISTORY(status), {
			params: { page, limit },
		});
		return response.data.data;
	},

	createPayment: async (paymentId: string) => {
		try {
			const response = await api.post(API_CONSTANT.PAYMENTS.CREATE_PAYMENT, {
				paymentId,
			});
			return response.data.data;
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				(error.message?.includes("ERR_NETWORK") ||
					error.message?.includes("CORS"))
			) {
				throw new Error(
					"Network error: Please check your connection and try again"
				);
			}
			throw error;
		}
	},

	capturePayment: async (paymentId: string, orderId: string) => {
		try {
			const response = await api.post(API_CONSTANT.PAYMENTS.CAPTURE_PAYMENT, {
				paymentId,
				orderId,
			});
			return response.data.data;
		} catch (error: unknown) {
			if (
				error instanceof Error &&
				(error.message?.includes("ERR_NETWORK") ||
					error.message?.includes("CORS"))
			) {
				throw new Error(
					"Network error: Please check your connection and try again"
				);
			}
			throw error;
		}
	},
};

export const useGetPaymentsByLease = (
	leaseId: string,
	limit: number = 10,
	status: string = "all"
) => {
	return useInfiniteQuery({
		queryKey: [...QUERY_KEYS.payments.byLeaseId(leaseId, limit), status],
		queryFn: ({ pageParam = 1 }) =>
			paymentApiFunctions.getPaymentsByLeaseId(
				leaseId,
				pageParam,
				limit,
				status
			),
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaymentResponse) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const useGetPaymentHistory = (status: string, limit: number = 10) => {
	return useInfiniteQuery({
		queryKey: QUERY_KEYS.payments.history(status),
		queryFn: ({ pageParam }) =>
			paymentApiFunctions.getPaymentHistory(pageParam, limit, status),
		initialPageParam: 1,
		getNextPageParam: (lastPage: PaymentResponse) => {
			if (lastPage.pagination.hasNextPage) {
				return lastPage.pagination.page + 1;
			}
			return undefined;
		},
	});
};

export const useCreatePayment = () => {
	return useMutation({
		mutationFn: (paymentId: string) =>
			paymentApiFunctions.createPayment(paymentId),
	});
};

export const useCapturePayment = (paymentId: string, orderId: string) => {
	return useMutation({
		mutationFn: () => paymentApiFunctions.capturePayment(paymentId, orderId),
	});
};
