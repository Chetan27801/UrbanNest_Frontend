import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogDescription,
	DialogFooter,
	DialogTrigger,
} from "../ui/dialog";
import { DialogContent } from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { applicationFormSchema } from "@/schema/application.schema";
import type { ApplicationFormData } from "@/schema/application.schema";
import toast from "react-hot-toast";
import { useState } from "react";
import { useApplyForProperty } from "@/services/applicationService";
import { queryClient } from "@/lib/queryClient";
import type { ErrorResponse } from "@/types/error";

const ApplicationForm = ({ propertyId }: { propertyId: string }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { mutate: applyForProperty, isPending } = useApplyForProperty();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ApplicationFormData>({
		resolver: zodResolver(applicationFormSchema),
	});

	const onSubmit = (data: ApplicationFormData) => {
		applyForProperty(
			{ propertyId, data },
			{
				onSuccess: () => {
					toast.success("Application submitted successfully");
					queryClient.invalidateQueries({ queryKey: ["applications"] });
					reset();
					setIsOpen(false);
				},
				onError: (error: unknown) => {
					const errorMessage =
						error instanceof Error && "message" in error
							? (error as ErrorResponse)?.message
							: "Failed to submit application";
					toast.error(errorMessage);
					console.error(error);
				},
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button size="lg" className="w-full cursor-pointer">
					Apply Now
				</Button>
			</DialogTrigger>
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogHeader className="space-y-4">
						<DialogTitle>Apply for Property</DialogTitle>
						<DialogDescription>
							Please enter your message below to apply for the property.
						</DialogDescription>
						<Textarea
							placeholder="Enter your message"
							className="w-full"
							rows={4}
							{...register("message")}
						/>
						{errors.message && (
							<p className="text-red-500 text-sm">{errors.message.message}</p>
						)}
						<DialogFooter>
							<Button
								className="cursor-pointer"
								type="submit"
								disabled={isSubmitting || isPending}
							>
								{isSubmitting || isPending ? "Applying..." : "Apply"}
							</Button>
							<DialogClose asChild>
								<Button
									type="button"
									variant="outline"
									className="cursor-pointer"
								>
									Cancel
								</Button>
							</DialogClose>
						</DialogFooter>
					</DialogHeader>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default ApplicationForm;
