import DefaultLayout from "~/layouts/DefaultLayout";
import BackButton from "../common/BackButton";
import ProjectInfo from "./info/ProjectInfo";
import { GreenButton } from "../common/Buttons";
import type { Project } from "~/graphql/__generated__/graphql";
import AllocationDialogComponent from "../common/Dialog";
import { AllocationType } from "~/types/allocation";
import { useState } from "react";

export default function ProjectHeader({ project }: { project: Project }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAction = () => {
        setIsOpen(true);
    }
    return (
        <>
            <div className="bg-project-info">
                <DefaultLayout>
                    <BackButton />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        <div className="order-1 lg:order-2">
                            Project image
                        </div>
                        <div className="order-2 lg:order-1 lg:col-span-2">
                            <ProjectInfo name={project.name} data={project.global_data} />
                            <div className="mt-4">
                                <GreenButton className="w-full" onClick={handleAction}>Allocate</GreenButton>
                            </div>
                        </div>
                    </div>
                </DefaultLayout>
                <AllocationDialogComponent isOpen={isOpen} setIsOpen={setIsOpen} projectId={project.id} type={AllocationType.PROJECT} />
            </div>
        </>
    )
}