export interface Payment {
	_id: string;
	amountDue: number;
	amountPaid: number;
	dueDate: Date;
	paymentDate?: Date;
	paymentStatus: string;
	lease: string;
	paymentMethod?: string;
	transactionId?: string;
	notes?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface PaymentResponse {
	payments: Payment[];
	pagination: {
		page: number;
		totalPages: number;
		totalItems: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		limit: number;
	};
}
