import { useQuery } from "@apollo/client";
import { GET_PROJECTS_METRICS } from "~/graphql/queries/projects";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";
import ProjectsMetricsComponenent from "~/components/common/project/metrics";

export default function ProjectsMetrics() {
    const { loading, error, data, refetch } = useQuery(GET_PROJECTS_METRICS, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID,
            }
        }
    });

    return (
        <ProjectsMetricsComponenent
            loading={loading}
            error={error}
            data={data}
            refetch={refetch}
        />
    )
}