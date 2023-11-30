import type { Project } from "~/graphql/__generated__/graphql";
import BusinessUnitsAllocationTable from "./carbon-management/BusinessUnitsAllocationTable";
import ProjectDecarbonation from "./carbon-management/ProjectDecarbonation";
import ProjectDecarbonationTable from "./carbon-management/ProjectDecarbonationTable";

export default function CarbonManagement({ project }: { project: Project }) {
    return (
        <>
            <div className="mt-8">
                <ProjectDecarbonation isFullScreen={true} projectId={project.id} />
                <ProjectDecarbonationTable projectId={project.id} />
                <BusinessUnitsAllocationTable projectId={project.id} />
            </div>
        </>
    )
}