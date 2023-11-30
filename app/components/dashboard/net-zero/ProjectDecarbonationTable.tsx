import { useQuery } from "@apollo/client";
import { ANNUAL } from "~/graphql/queries/net-zero";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";
import ProjectDecarbonationTableComponent from "~/components/common/net-zero/ProjectDecarbonationTable";

export default function ProjectDecarbonationTable() {
    const { loading, error, data, refetch } = useQuery(ANNUAL, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID
            }
        }
    });

    return (
        <ProjectDecarbonationTableComponent loading={loading} error={error} data={data} refetch={refetch} />
    )
}
