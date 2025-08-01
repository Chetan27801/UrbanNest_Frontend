import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const DatePicker = ({
	date,
	setDate,
	label,
}: {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	label: string;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="justify-between font-normal">
					{date ? date.toLocaleDateString() : label}
					<ChevronDownIcon className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto overflow-hidden p-0" align="start">
				<Calendar
					mode="single"
					selected={date}
					captionLayout="dropdown"
					onSelect={(date) => {
						setDate(date);
						setOpen(false);
					}}
					className="bg-background border border-border rounded-md shadow-sm w-full h-full z"
				/>
			</PopoverContent>
		</Popover>
	);
};

export default DatePicker;
