import Title from "../common/Title";
import GlobalData from "./net-zero/GlobalData";
import ProjectDecarbonation from "./net-zero/ProjectDecarbonation";
import ProjectDecarbonationTable from "./net-zero/ProjectDecarbonationTable";
import ProjectFundingAllocation from "./project-allocation/ProjectFundingAllocation";
import ProjectsImpact from "./reporting/ProjectsImpact";
import ProjectsMetrics from "./project-allocation/ProjectsMetrics";

export default function Summary() {
    return (
        <div className="relative w-full">
            <GlobalData />
            <div className="relative">
                <Title title="Net Zero Planning" />
                <ProjectDecarbonation isFullScreen={true} />
                <ProjectDecarbonationTable />
            </div>
            <div className="relative">
                <Title title="PROJECT FUNDING ALLOCATION" />
                <ProjectFundingAllocation />
            </div>
            <div className="relative">
                <Title title="PROJECTS METRICS" />
                <ProjectsMetrics />
            </div>
            <div className="relative">
                <Title title="PROJECTS IMPACT" />
                <ProjectsImpact />
            </div>
        </div>
    );
}