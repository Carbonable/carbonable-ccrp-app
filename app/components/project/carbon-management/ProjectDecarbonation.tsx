import { useQuery } from "@apollo/client";
import ProjectDecarbonationComponent from "~/components/common/net-zero/ProjectDecarbonation";
import { NET_ZERO_PLANNING } from "~/graphql/queries/net-zero";

export default function ProjectDecarbonation({ isFullScreen, projectId }: { isFullScreen: boolean, projectId: string }) {
    const { loading, error, data, refetch } = useQuery(NET_ZERO_PLANNING, {
        variables: {
            view: {
                project_id: projectId
            }
        }
    });
    
    return (
        <ProjectDecarbonationComponent 
            isFullScreen={isFullScreen} 
            loading={loading} 
            error={error} 
            data={data} 
            refetch={refetch} 
        />
    )
}