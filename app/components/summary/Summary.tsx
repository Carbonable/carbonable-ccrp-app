import Title from "../common/Title";
import GlobalData from "./GlobalData";
import ProjectDecarbonation from "./ProjectDecarbonation";
import ProjectDecarbonationTable from "./ProjectDecarbonationTable";
import ProjectFundingAllocation from "./ProjectFundingAllocation";
import ProjectsImpact from "./ProjectsImpact";
import ProjectsMetrics from "./ProjectsMetrics";

export default function Summary() {
    return (
        <div className="relative w-full md:px-4">
            <GlobalData />
            <div className="relative">
                <Title title="PROJECTED DECARBONATION" />
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