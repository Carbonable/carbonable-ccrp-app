import Title from "../common/Title";
import ProjectsMetrics from "./project-allocation/ProjectsMetrics";
import ProjectFundingAllocation from "./project-allocation/ProjectFundingAllocation";

export default function ProjectAllocation() {
    return (
        <>
            <div className="relative">
                <Title title="Carbon Assets’ Allocation " />
                <ProjectFundingAllocation />
            </div>
            <div className="relative">
                <Title title="Projects metrics" />
                <ProjectsMetrics />
            </div>
        </>
    )
}