import { useQuery } from "@apollo/client";
import type { ProjectMetrics } from "~/graphql/__generated__/graphql";
import { GET_PROJECTS_METRICS } from "~/graphql/queries";
import ProjectsColors from "./ProjectsColors";
import ProjectsTypes from "./ProjectsTypes";
import ProjectsStandards from "./ProjectsStandards";
import ErrorReload from "../../common/ErrorReload";
import ProjectsCountries from "./ProjectsCountries";

export default function ProjectsMetrics() {
    const { loading, error, data, refetch } = useQuery(GET_PROJECTS_METRICS);

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const metrics: ProjectMetrics = data?.getProjectMetrics;

    if (loading) {
        return (
            <div className="mt-12 w-full">
                Loading ...
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-12 w-full">
                <ErrorReload refetchData={refetchData} />
            </div>
        )
    }

    return (
        <div className="mt-12 w-full">
            <div className="relative mt-4 font-inter grid grid-cols-3 gap-x-10 gap-y-14">
                <div className="col-span-3 md:col-span-1">
                    <ProjectsColors colors={metrics.colors} />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <ProjectsTypes types={metrics.types} />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <ProjectsStandards standards={metrics.standards} />
                </div>
                <div className="col-span-3 md:col-span-2">
                    <img className="pt-8" src="/assets/images/map.png" alt="Projects map" />
                </div>
                <div className="col-span-3 md:col-span-1">
                    <ProjectsCountries countries={metrics.localization} />
                </div>
            </div>
        </div>
    );
}