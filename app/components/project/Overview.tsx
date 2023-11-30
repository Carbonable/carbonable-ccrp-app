import type { SanityContent } from "~/utils/sanity/types";
import SectionWrapper from "./overview/SectionWrapper";
import ImageGallery from "./overview/ImagesGallery";
import Title from "../common/Title";
import { useEffect, useState } from "react";
import { client } from "~/utils/sanity/client";
import type { Project } from "~/graphql/__generated__/graphql";

export default function Overview({ project }: { project: Project}) {
    const [content, setContent] = useState<SanityContent | undefined>(undefined);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const result = await client.fetch(
                    `*[_type == "project" && slug.current == $slug]`,
                    { slug: project.id }
                );
      
                setContent(result[0]); // Assuming you expect a single project
      
            } catch (error) {
              console.error('Error fetching project data:', error);
            }
          };
      
          fetchProjectData();
    }, [project.id]);

    if (!content) {
        return (
            <div className="mt-6"> 
                Overview not available
            </div>
        )
    }

    return (
        <>
            { content && content.projectOverview && content.projectOverview.sections.length > 0 && content.projectOverview.sections.map((section, index) => (
                <SectionWrapper key={`section_${index}`} section={section}></SectionWrapper>
            ))}
            { content.imagesGallery?.length > 0 && 
                <>
                    <Title title="Images gallery" />
                    <div className="mt-4">
                        <ImageGallery images={content.imagesGallery} videos={content.videosGallery} />
                    </div>
                </>
            }
        </>
    )
}