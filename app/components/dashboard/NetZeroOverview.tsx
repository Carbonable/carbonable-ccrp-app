import ProjectDecarbonation from "./net-zero/ProjectDecarbonation";
import ProjectDecarbonationTable from "./net-zero/ProjectDecarbonationTable";
import GlobalData from "./net-zero/GlobalData";
import ProjectDecarbonationTableCumulative from "./net-zero/ProjectDecarbonationTableCumulative";
import FinancialAnalysisTable from "./net-zero/FinancialAnalysisTable";
export default function NetZeroOverview() {
    return (
        <>
            <GlobalData />
            <div className="mt-8">
                <ProjectDecarbonation isFullScreen={true} />
                <ProjectDecarbonationTable />
                <ProjectDecarbonationTableCumulative />
                <FinancialAnalysisTable />
            </div>
        </>
    )
}