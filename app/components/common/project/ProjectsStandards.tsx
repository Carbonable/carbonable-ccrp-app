import type { Map } from "~/graphql/__generated__/graphql";
import { SmallTitle } from "../Title";
import SquaredInitials from "../SquaredInitials";
import { getNumericPercentage } from "~/utils/utils";

export default function ProjectsStandards({ standards }: { standards: Map[] }) {
    let standardsToSort = [...standards];
    standardsToSort.sort((a, b) => {
        const bValue = getNumericPercentage(b.value);
        const aValue = getNumericPercentage(a.value);
        return bValue - aValue;
    });
    
    return (
        <div>
            <SmallTitle title="Projects Standards" />
            <div className="w-full h-full md:mt-4 md:max-h-[420px] md:overflow-x-scroll">
                {standardsToSort.map((standard, index) => (
                    <ProjectStandardDetails key={index} standard={standard} />
                ))}
            </div>
        </div>
    )
}

function ProjectStandardDetails({ standard }: { standard: Map }) {
    return (
        <div className="flex justify-start px-4 mt-8 w-full">
            <div className="min-w-[32px]">
                <SquaredInitials text={standard.key} color="random" />
            </div>
            <div className="w-full pl-8">
                <div className="text-neutral-300 text-sm font-inter">{standard.key}</div>
                <div className="flex items-center mt-1">
                    <div className="w-full bg-opacityLight-5 rounded-full h-2">
                        <div className="bg-greenish-700 h-2 rounded-full" style={{width: `${getNumericPercentage(standard.value)}%`}}></div>
                    </div>
                    <div className="text-neutral-300 text-xs font-inter ml-3">{getNumericPercentage(standard.value)}%</div>
                </div>
                
            </div>
        </div>
    )
}