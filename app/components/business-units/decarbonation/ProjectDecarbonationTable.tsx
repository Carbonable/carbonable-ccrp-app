import { useQuery } from "@apollo/client";
import { ANNUAL } from "~/graphql/queries/net-zero";
import ProjectDecarbonationTableComponent from "~/components/common/net-zero/ProjectDecarbonationTable";

export default function ProjectDecarbonationTable({ businessUnitId }: { businessUnitId: string }) {
    const { loading, error, data, refetch } = useQuery(ANNUAL, {
        variables: {
            view: {
                business_unit_id: businessUnitId
            }
        }
    });

    return (
        <ProjectDecarbonationTableComponent loading={loading} error={error} data={data} refetch={refetch} />
    )
}
