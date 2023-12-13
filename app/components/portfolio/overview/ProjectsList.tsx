import { useQuery } from "@apollo/client";
import type { Project } from "~/graphql/__generated__/graphql";
import { GET_PROJECTS } from "~/graphql/queries/projects";

export default function ProjectsList() {

    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (error) {
        console.error(error);
    }

    const projects: Project[] = data?.projects;

    if (loading) {
        return (
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    Loading...
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    Error: {error.message}
                </div>
            </div>
        )
    }
    console.log(projects);
    return (
        <>
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    {projects.length} assets
                </div>
            </div>
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-4">
                    {projects.map((project: Project, idx: number) => (
                        <a 
                            key={`project_${project.id}_${idx}`}
                            href={`/portfolio/${project.slug}`}
                            className="overflow-hidden text-ellipsis"
                        >
                            <img src={project.metadata?.image_url} alt={`${project.name} project`} />
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}