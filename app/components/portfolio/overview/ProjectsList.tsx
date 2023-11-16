export default function ProjectsList() {

    const projects = ["forest-regeneration-banegas-farm-costa-rica", "mangroves-regeneration-las-delicias-panama"];

    return (
        <>
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    {projects.length} assets
                </div>
            </div>
            <div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-2 mt-4">
                    {projects.map((project: any, idx: number) => (
                        <a 
                            key={`project_${project}`}
                            href={`/portfolio/${project}`}
                            className="overflow-hidden text-ellipsis"
                        >
                            Project {project}
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}