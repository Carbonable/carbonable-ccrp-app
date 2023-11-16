import BusinessUnitsAllocationTable from "./carbon-management/BusinessUnitsAllocationTable";
import ProjectDecarbonation from "./carbon-management/ProjectDecarbonation";
import ProjectDecarbonationTable from "./carbon-management/ProjectDecarbonationTable";

export default function CarbonManagement() {
    return (
        <>
            <div className="mt-8">
                <ProjectDecarbonation isFullScreen={true} />
                <ProjectDecarbonationTable />
                <BusinessUnitsAllocationTable />
            </div>
        </>
    )
}