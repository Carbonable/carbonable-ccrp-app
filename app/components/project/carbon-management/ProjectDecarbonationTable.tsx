import { useQuery } from "@apollo/client";
import ProjectDecarbonationTableComponent from "~/components/common/net-zero/ProjectDecarbonationTable";
import { ANNUAL } from "~/graphql/queries/net-zero";

export default function ProjectDecarbonationTable({ projectId }: { projectId: string }) {
    const { loading, error, data, refetch } = useQuery(ANNUAL, {
        variables: {
            view: {
                project_id: projectId
            }
        }
    });

    return (
        <ProjectDecarbonationTableComponent 
            loading={loading}
            error={error}
            data={data}
            refetch={refetch}
        />
    )
}
