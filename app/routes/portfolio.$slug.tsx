import { useQuery } from "@apollo/client";
import { json, type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react"
import ProjectHeader from "~/components/project/ProjectHeader";
import ProjectTabs from "~/components/project/ProjectTabs";
import type { Project } from "~/graphql/__generated__/graphql";
import { GET_PROJECT_WITHOUT_VINTAGES } from "~/graphql/queries/projects";
import DefaultLayout from "~/layouts/DefaultLayout";
import { useEffect, useState } from 'react';
import type { Dmrv } from '~/types/dmrv';

export async function loader({ params }: LoaderArgs) {
    return json({ mapboxKey: process.env.MAPBOX_KEY, trackingActivated: process.env.TRACKING_ACTIVATED === "true", slug: params.slug });
}

export default function Index() {
    const { mapboxKey, trackingActivated, slug } = useLoaderData();

    const { loading, error, data } = useQuery(GET_PROJECT_WITHOUT_VINTAGES, {
        variables: {
            field: "slug",
            value: slug
        }
    });

    const fetcherDmrv = useFetcher();
    const [dmrv, setDmrv] = useState<Dmrv | undefined>(undefined);
    const project: Project = data?.projectBy;

    useEffect(() => {
        if (fetcherDmrv.data !== undefined || trackingActivated === false) { return; }
        
        fetcherDmrv.load(`/api/dmrv?slug=${slug}`);
      }, []);

    useEffect(() => {
        if (fetcherDmrv.data === undefined) return;
    
        const data = fetcherDmrv.data;
        setDmrv(data);
    }, [fetcherDmrv.data]);

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

    return (
        <>
            <ProjectHeader project={project} />
            <DefaultLayout>
                <div className="mt-4">
                    <ProjectTabs mapboxKey={mapboxKey} project={project} dmrv={dmrv} />
                </div>
            </DefaultLayout>
        </>
    )
}