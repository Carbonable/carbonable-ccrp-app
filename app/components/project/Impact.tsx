import { useQuery } from "@apollo/client";
import { GET_IMPACT_METRICS } from "~/graphql/queries/impact";
import ImpactComponent from "~/components/common/impact/ImpactComponent";

export default function ProjectsImpact({ projectId, reportLink }: { projectId: string, reportLink: string | undefined }) {
    const { loading, error, data, refetch } = useQuery(GET_IMPACT_METRICS, {
        variables: {
            view: {
                project_id: projectId
            }
        }
    });
   
    return (
        <ImpactComponent 
            loading={loading}
            error={error}
            data={data}
            refetch={refetch}
            link={reportLink}
        />
    )
}