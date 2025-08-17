import { z } from "zod";

export const profileSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	email: z.email("Invalid email address").optional(),
	phoneNumber: z.string().min(1, "Phone number is required").optional(),
	avatar: z
		.instanceof(File)
		.optional()
		.refine(
			(file) => {
				if (!file) return true;
				return file.type.startsWith("image/");
			},
			{ message: "Please select a valid image file" }
		)
		.refine(
			(file) => {
				if (!file) return true;
				return file.size <= 5 * 1024 * 1024; // 5MB limit
			},
			{ message: "Image size must be less than 5MB" }
		)
		.optional(),
});

export const profileSchemaWithImages = profileSchema.extend({
	avatar: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileFormDataWithImages = z.infer<typeof profileSchemaWithImages>;
