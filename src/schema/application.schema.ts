import { z } from "zod";

export const applicationFormSchema = z.object({
	message: z.string().min(1, "Message is required"),
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;
