import FinancialAnalysisTable from "./decarbonation/FinancialAnalysisTable";
import ProjectDecarbonation from "./decarbonation/ProjectDecarbonation";
import ProjectDecarbonationTable from "./decarbonation/ProjectDecarbonationTable";
import ProjectDecarbonationTableCumulative from "./decarbonation/ProjectDecarbonationTableCumulative";

export default function DecarbonationOverview() {
    return (
        <>
            <ProjectDecarbonation isFullScreen={true} />
            <ProjectDecarbonationTable />
            <ProjectDecarbonationTableCumulative />
            <FinancialAnalysisTable />
        </>
    )
}