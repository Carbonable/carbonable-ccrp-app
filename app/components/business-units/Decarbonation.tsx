import FinancialAnalysisTable from "./decarbonation/FinancialAnalysisTable";
import ProjectDecarbonation from "./decarbonation/ProjectDecarbonation";
import ProjectDecarbonationTable from "./decarbonation/ProjectDecarbonationTable";
import ProjectDecarbonationTableCumulative from "./decarbonation/ProjectDecarbonationTableCumulative";

export default function DecarbonationOverview({ businessUnitId }: { businessUnitId: string }) {
    return (
        <>
            <ProjectDecarbonation isFullScreen={true} businessUnitId={businessUnitId} />
            <ProjectDecarbonationTable businessUnitId={businessUnitId} />
            <ProjectDecarbonationTableCumulative businessUnitId={businessUnitId} />
            <FinancialAnalysisTable businessUnitId={businessUnitId} />
        </>
    )
}