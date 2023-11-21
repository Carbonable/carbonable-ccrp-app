import { useQuery } from "@apollo/client";
import { GlobalKPI } from "~/components/common/KPI";
import type { GlobalData } from "~/graphql/__generated__/graphql";
import { GET_GLOBAL_DATA } from "~/graphql/queries";


export default function GlobalData() {
    const { loading, error, data, refetch } = useQuery(GET_GLOBAL_DATA);

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const globalData: GlobalData = data?.getGlobalData;
    console.log(globalData);

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            <GlobalKPI title="Target (current year)" kpi={`TBD`} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Actual (current year)" kpi={`TBD`} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Debt" kpi={`TBD`} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Number of projects" kpi={`TBD`} loading={loading} error={error} refetchData={refetchData} />
        </div>
    );
}