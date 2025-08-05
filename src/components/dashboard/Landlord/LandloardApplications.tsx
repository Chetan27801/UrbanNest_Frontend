import { useGetAllApplicationsByLandlord } from "@/services/applicationService";
import PropertyApplicationCard from "@/components/common/PropertyApplicationCard";

const LandloardApplications = () => {
	const { data: applications } = useGetAllApplicationsByLandlord();
	return (
		<div className="flex flex-col gap-4 w-full p-4">
			{applications?.data.map((application) => (
				<PropertyApplicationCard
					key={application._id}
					application={application}
				/>
			))}
		</div>
	);
};

export default LandloardApplications;
