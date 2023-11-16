import type { SanitySection } from "~/utils/sanity/types"
import Title from "~/components/common/Title"
import TabsWrapper from "./TabsWrapper"

export default function SectionWrapper({section}: {section: SanitySection}) {
    return (
        <>
            <Title title={section.title} />
            <div className="mt-6"> 
                { section.tabs && <TabsWrapper tabs={section.tabs}></TabsWrapper> }
            </div>
        </>
    )
}