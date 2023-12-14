import type { Project } from "~/graphql/__generated__/graphql";
import ProjectDecarbonation from "./carbon-management/ProjectDecarbonation";
import ProjectDecarbonationTable from "./carbon-management/ProjectDecarbonationTable";
import ProjectAllocationTable from "./carbon-management/ProjectAllocationTable";

export default function CarbonManagement({ project }: { project: Project }) {
    return (
        <>
            <div className="mt-8">
                <ProjectDecarbonation isFullScreen={true} projectId={project.id} />
                <ProjectDecarbonationTable projectId={project.id} />
                <ProjectAllocationTable projectId={project.id} />
            </div>
        </>
    )
}