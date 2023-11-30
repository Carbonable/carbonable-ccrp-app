import { useQuery } from "@apollo/client";
import BannerKPI from "~/components/common/BannerKPI";
import { GET_GLOBAL_DATA } from "~/graphql/queries/net-zero";
import type { GlobalData } from "~/graphql/__generated__/graphql";

export default function Banner() {
    const { loading, error, data } = useQuery(GET_GLOBAL_DATA);

    if (error) {
        console.error(error);
    }

    const globalData: GlobalData = data?.getGlobalData;

    return (
        <div className="relative w-full border border-neutral-700 bg-planification bg-cover bg-bottom rounded-3xl px-4 py-6 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-none md:grid-flow-col md:auto-cols-max md:gap-6 xl:gap-16">
                <BannerKPI title="Invested amount" value={globalData?.invested_amount} loading={loading} error={error} />
                <BannerKPI title="Number of projects" value={globalData?.number_of_projects} loading={loading} error={error} />
            </div>
            <img src="/assets/images/common/logo-transparent.svg" alt="Carbonable logo transparent" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
        </div>
    )
}