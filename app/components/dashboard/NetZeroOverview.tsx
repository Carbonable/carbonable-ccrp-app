import ProjectDecarbonation from "./net-zero/ProjectDecarbonation";
import ProjectDecarbonationTable from "./net-zero/ProjectDecarbonationTable";
import GlobalData from "./net-zero/GlobalData";
import ProjectDecarbonationTableCumulative from "./net-zero/ProjectDecarbonationTableCumulative";
import FinancialAnalysisTable from "./net-zero/FinancialAnalysisTable";
import OrdersAnnualTable from "./net-zero/OrdersAnnualTable";
export default function NetZeroOverview() {
    return (
        <>
            <GlobalData />
            <div className="mt-8">
                <ProjectDecarbonation isFullScreen={true} />
                <ProjectDecarbonationTable />
                <ProjectDecarbonationTableCumulative />
                <OrdersAnnualTable />
                <FinancialAnalysisTable />
            </div>
        </>
    )
}