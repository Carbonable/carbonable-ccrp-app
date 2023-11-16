import Banner from "./overview/Banner";
import ProjectsList from "./overview/ProjectsList";

export default function Overview() {
    return (
        <>
             <div className="relative mt-4">
                <Banner />
            </div>
            <div className="relative mt-20">
                <ProjectsList />
            </div>
        </>
    )
}