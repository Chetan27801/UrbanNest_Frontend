import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverPortal,
} from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface DatePickerProps {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	label: string;
}

const DatePicker = ({ date, setDate, label }: DatePickerProps) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="justify-between font-normal">
					{date ? date.toLocaleDateString() : label}
					<ChevronDownIcon className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverPortal>
				<PopoverContent
					align="start"
					sideOffset={8}
					className="z-50 w-auto p-0 bg-white border border-border rounded-md shadow-lg"
				>
					<Calendar
						mode="single"
						selected={date}
						captionLayout="dropdown"
						onSelect={(date) => {
							setDate(date);
							setOpen(false);
						}}
						className="bg-background w-full h-full"
					/>
				</PopoverContent>
			</PopoverPortal>
		</Popover>
	);
};

export default DatePicker;
