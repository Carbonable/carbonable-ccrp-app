import { useQuery } from "@apollo/client";
import { GET_PROJECTS_METRICS } from "~/graphql/queries/projects";
import ProjectsMetricsComponenent from "~/components/common/project/metrics";

export default function ProjectsMetrics({ businessUnitId }: { businessUnitId: string }) {
    const { loading, error, data, refetch } = useQuery(GET_PROJECTS_METRICS, {
        variables: {
            view: {
                business_unit_id: businessUnitId,
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