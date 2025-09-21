import { useGetAllApplications } from "@/services/applicationService";
import ApplicationCard from "@/components/common/ApplicationCard";

const TenantApplications = () => {
	const { data: applications, isLoading, error } = useGetAllApplications(10);
	const allApplications = applications?.pages.flatMap(
		(page) => page.applications
	);

	return (
		<div className="flex flex-col gap-4 p-4">
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{allApplications &&
					allApplications.map((application) => (
						<ApplicationCard key={application._id} application={application} />
					))}
			</div>
		</div>
	);
};

export default TenantApplications;
