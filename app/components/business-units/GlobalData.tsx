import { GlobalKPI } from "~/components/common/KPI";
import type { GlobalData } from "~/graphql/__generated__/graphql";


export default function GlobalData() {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-12">
            <GlobalKPI title="Target (current year)" kpi={`TBD`} />
            <GlobalKPI title="Actual (current year)" kpi={`TBD`} />
            <GlobalKPI title="Debt (current year)" kpi={`TBD`} />
            <GlobalKPI title="Number of projects" kpi={`TBD`} />
        </div>
    );
}