import { useQuery } from "@apollo/client";
import { GlobalData } from "~/graphql/__generated__/graphql";
import { GET_GLOBAL_DATA } from "~/graphql/queries/net-zero";

export default function ProjectData({ businessUnitId, loadingBU }: { businessUnitId: string | undefined, loadingBU: boolean }) {
    const { loading, error, data } = useQuery(GET_GLOBAL_DATA, {
        variables: {
            view: {
                business_unit_id: businessUnitId
            }
        }
    
    });

    const globalData: GlobalData = data?.getGlobalData;

    if (loading || loadingBU) {
        return (
            <div className="text-sm font-thin text-neutral-100 mt-4">Actuals: - &nbsp; Target: -</div>
        )
    }

    if (error) {
        console.error(error);
    }

    return (
        <div className="text-sm font-thin text-neutral-100 mt-4">Actuals: {globalData.actual} &nbsp; Target: {globalData.target}</div>
    )
}