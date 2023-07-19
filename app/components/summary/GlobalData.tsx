import { useQuery } from "@apollo/client";
import type { GlobalData } from "~/graphql/__generated__/graphql";
import { GET_GLOBAL_DATA } from "~/graphql/queries";

function GlobalKPI({title, kpi, loading, error, refetchData}: {title: string, kpi: any, loading?: boolean, error?: any, refetchData?: any}) {
    if (loading) return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="animate-pulse bg-opacityLight-10 w-3/4 h-6 mt-2 rounded-md"></div>
        </div>
    )

    if (error) return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105">
                Reload
            </div>
        </div>
    )

    return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2">
                {kpi}
            </div>
        </div>
    )
}

export default function GlobalData() {
    const { loading, error, data, refetch } = useQuery(GET_GLOBAL_DATA);

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const globalData: GlobalData = data?.getGlobalData;
    console.log(data);
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            <GlobalKPI title="Invested amount" kpi={globalData?.total_invested} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Generated CC" kpi={globalData?.generated_cc} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Forecasted CC" kpi={globalData?.forecasted_cc} loading={loading} error={error} refetchData={refetchData} />
            <GlobalKPI title="Retired CC" kpi={globalData?.retired_cc} loading={loading} error={error} refetchData={refetchData} />
        </div>
    );
}