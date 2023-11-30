import { useQuery } from "@apollo/client";
import type { ImpactMetrics, Sdg } from "~/graphql/__generated__/graphql";
import ErrorReload from "../../common/ErrorReload";
import { ImpactTitle } from "../../common/Title";
import { LinkSecondary } from "../../common/Buttons";
import { GET_IMPACT_METRICS } from "~/graphql/queries/impact";

export default function ProjectsImpact() {
    const { loading, error, data, refetch } = useQuery(GET_IMPACT_METRICS);
    const cssBlock = "border border-neutral-500 rounded-xl px-6 py-4 bg-neutral-700"

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const metrics: ImpactMetrics = data?.getImpactMetrics;

    if (loading) {
        return (
            <div className="mt-12 w-full">
                Loading ...
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-12 w-full">
                <ErrorReload refetchData={refetchData} />
            </div>
        )
    }

    return (
        <div className="mt-12 w-full grid grid-rows-3 md:grid-rows-3 grid-cols-4 grid-flow-col gap-4">
            <div className={`col-span-4 md:row-span-3 md:col-span-1 ${cssBlock}`}>
                <ImpactTitle title="Impacted SDGs" value={`# ${metrics.sdgs.length}`} />
                <div className="mt-8 grid grid-cols-5 gap-6 md:grid-cols-3">
                    {metrics.sdgs.map((sdg: Sdg, idx: number) => {
                        return (
                            <a href={`https://sdgs.un.org/goals/goal${sdg.number}`} key={`sdg_image_${sdg.number}`} target="_blank" rel="noreferrer" >
                                <img key={`sdg_${idx}`} className="rounded-lg" alt={`sdg_${sdg.number}`} src={`https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-${sdg.number < 10 ? '0' + sdg.number: sdg.number}.jpg`} />
                            </a>
                        )
                    })
                    }
                </div>
            </div>
            <div className="grid col-span-4 md:grid-cols-3 md:col-span-3 gap-4">
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Removed Tons" value={metrics.removed_tons} />
                </div>
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Restaured hectares" value={metrics.protected_forest} />
                </div>
                <div className={`col-span-1 ${cssBlock}`}>
                    <ImpactTitle title="Protected Species" value={metrics.protected_species} />
                </div>
            </div>
            <div className={`col-span-4 md:row-span-2 md:col-span-3 ${cssBlock} bg-impact-report relative overflow-hidden`}>
                <img className="absolute bottom-[-55%] right-[-2%] w-[90%] h-full object-contain object-top rounded-2xl -rotate-6 md:object-cover md:bottom-[-50%] md:w-[54%] lg:bottom-[-33%] lg:w-[60%]" src="/assets/images/impact/bel.png" alt="impact-report" />
                <div className="xl:p-8">
                    <div className="text-neutral-50 font-bold text-2xl">See your <br/>full impact report</div>
                    <div className="mt-8 lg:mt-12">
                        <LinkSecondary href="#">Go to impact Report</LinkSecondary>
                    </div>
                </div>
                
            </div>
        </div>
    );
}