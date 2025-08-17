import PropertyForm from "@/components/forms/PropertyForm";

const LandlordCreateProperty = () => {
	return (
		<div className="flex flex-col gap-4 w-full p-4">
			<div className="flex flex-col gap-4 w-full p-4">
				<PropertyForm className="w-full" />
			</div>
		</div>
	);
};

export default LandlordCreateProperty;
