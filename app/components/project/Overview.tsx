import type { SanityContent } from "~/utils/sanity/types";
import SectionWrapper from "./overview/SectionWrapper";
import ImageGallery from "./overview/ImagesGallery";
import Title from "../common/Title";

export default function Overview({content}: {content: SanityContent}) {
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