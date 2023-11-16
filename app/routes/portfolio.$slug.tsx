import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import BackButton from "~/components/common/BackButton";
import ProjectTabs from "~/components/project/ProjectTabs";
import { client } from "~/utils/sanity/client";

export async function loader({ params }: LoaderArgs) {
    try {
        const content = await client.fetch(
            `*[_type == "project" && slug.current == $slug]`,
            { slug: params.slug }
          );
      
          return json({ content, mapboxKey: process.env.MAPBOX_KEY, trackingActivated: process.env.TRACKING_ACTIVATED === "true", slug: params.slug });
    } catch (error) {
        console.error(error);
        throw new Response("Not Found", {status: 404})
    } 
  }
export default function Index() {
    const { content, mapboxKey, trackingActivated, slug } = useLoaderData();

    return (
        <>
            <BackButton />
            <div className="mt-4">
                <ProjectTabs mapboxKey={mapboxKey} slug={slug} trackingActivated={trackingActivated} content={content[0]} />
            </div>
            
        </>
    )
}