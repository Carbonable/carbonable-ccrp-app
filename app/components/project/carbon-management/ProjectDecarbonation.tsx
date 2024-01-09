import { useQuery } from "@apollo/client";
import { NET_ZERO_PLANNING } from "~/graphql/queries/net-zero";
import ProjectDecarbonationComponent from "./ProjectDecarbonationComponent";

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