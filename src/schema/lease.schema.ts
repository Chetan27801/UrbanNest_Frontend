import { z } from "zod";

export const createLeaseSchema = z.object({
	startDate: z.date(),
	endDate: z.date(),
	rent: z.number(),
	deposit: z.number(),
	property: z.string(),
	tenant: z.string(),
	landlord: z.string().optional(),
	application: z.string(),
});

export type CreateLeaseType = z.infer<typeof createLeaseSchema>;
