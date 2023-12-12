import { KPI } from "~/components/common/KPI";
import type { ProjectGlobalData } from "~/graphql/__generated__/graphql";

export default function ProjectInfo({ name, data }: { name: string | any, data: ProjectGlobalData | any }) {
    if (data === undefined) {
        return (
            <div className="relative rounded-lg w-full bg-project-header-border p-[1px]">
                <div className="relative rounded-lg bg-project-header p-6 w-full overflow-hidden">
                    <div className="text-xl uppercase font-bold">
                        {name}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-6 mt-8">
                        <KPI title="$ amount" kpi={`TBD`} />
                        <KPI title="Source" kpi={`TBD`} />
                        <KPI title="Rating" kpi={`TBD`} />
                        <KPI title="Allocation units" kpi={`TBD`} />
                        <KPI title="Available ex-post" kpi={`TBD`} />
                        <KPI title="Available ex-ante" kpi={`TBD`} />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative rounded-lg w-full bg-project-header-border p-[1px]">
            <div className="relative rounded-lg bg-project-header p-6 w-full overflow-hidden">
                <div className="text-xl uppercase font-bold">
                    {name}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-6 mt-8">
                    <KPI title="$ amount" kpi={data.amount} />
                    <KPI title="Source" kpi={data.source} />
                    <KPI title="Rating" kpi={data.rating} />
                    <KPI title="Allocation units" kpi={data.allocated_units} />
                    <KPI title="Available ex-post" kpi={data.available_ex_post} />
                    <KPI title="Available ex-ante" kpi={data.available_ex_ante} />
                </div>
            </div>
        </div>

    )
}