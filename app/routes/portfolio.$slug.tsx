import { useQuery } from "@apollo/client";
import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import ProjectHeader from "~/components/project/ProjectHeader";
import ProjectTabs from "~/components/project/ProjectTabs";
import type { Project } from "~/graphql/__generated__/graphql";
import { GET_PROJECT_WITHOUT_VINTAGES } from "~/graphql/queries/projects";
import DefaultLayout from "~/layouts/DefaultLayout";

export async function loader({ params }: LoaderArgs) {
    return json({ mapboxKey: process.env.MAPBOX_KEY, trackingActivated: process.env.TRACKING_ACTIVATED === "true", slug: params.slug });
}

export default function Index() {
    const { mapboxKey, trackingActivated, slug } = useLoaderData();

    const { loading, error, data } = useQuery(GET_PROJECT_WITHOUT_VINTAGES, {
        variables: {
            field: "id",
            value: slug
        }
    });

    if (loading) {
        return (
            <DefaultLayout>
                Loading...
            </DefaultLayout>
        )
    }

    if (error) {
        return (
            <DefaultLayout>
                Error: {error.message}
            </DefaultLayout>
        )
    }

    const project: Project = data?.projectBy;

    return (
        <>
            <ProjectHeader project={project} />
            <DefaultLayout>
                <div className="mt-4">
                    <ProjectTabs mapboxKey={mapboxKey} project={project} trackingActivated={trackingActivated} />
                </div>
            </DefaultLayout>
        </>
    )
}