import {
	Select,
	SelectContent,
	SelectValue,
	SelectTrigger,
	SelectItem,
} from "../ui/select";

export const SelectDropDown = ({
	field,
	options,
	placeholder,
}: {
	field: {
		onChange: (value: string) => void;
		value: string;
	};
	options: { label: string; value: string }[];
	placeholder: string;
}) => {
	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options.map((option) => (
					<SelectItem key={option.value} value={option.value}>
						{option.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
