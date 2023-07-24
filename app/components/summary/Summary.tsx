import Title from "../common/Title";
import GlobalData from "./GlobalData";
import ProjectDecarbonationTable from "./ProjectDecarbonationTable";
import ProjectFundingAllocation from "./ProjectFundingAllocation";

export default function Summary() {
    return (
        <div className="relative w-full md:px-4">
            <GlobalData />
            <div className="relative">
                <Title title="PROJECTED DECARBONATION" />
                <ProjectDecarbonationTable />
            </div>
            <div className="relative">
                <Title title="PROJECT FUNDING ALLOCATION" />
                <ProjectFundingAllocation />
            </div>
        </div>
    );
}