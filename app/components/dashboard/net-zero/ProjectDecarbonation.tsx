import { useQuery } from "@apollo/client";
import ProjectDecarbonationComponent from "~/components/common/net-zero/ProjectDecarbonation";
import { NET_ZERO_PLANNING } from "~/graphql/queries/net-zero";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";

export default function ProjectDecarbonation({ isFullScreen }: { isFullScreen: boolean }) {
    const { loading, error, data, refetch } = useQuery(NET_ZERO_PLANNING, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID
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