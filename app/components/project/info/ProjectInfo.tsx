import { KPI } from "~/components/common/KPI";

export default function ProjectInfo() {
    return (
        <div className="relative rounded-lg w-full bg-project-header-border p-[1px]">
            <div className="relative rounded-lg bg-project-header p-6 w-full overflow-hidden">
                <div className="text-xl uppercase font-bold">
                    Banegas Farms
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