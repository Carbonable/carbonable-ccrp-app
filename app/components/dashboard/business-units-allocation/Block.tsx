import { shortenNumber } from "~/utils/utils";
import Repartition from "./block/Repartition";
import CircleProgress from "./block/CircleProgress";
import AllocationKPI from "./block/AllocationKPI";

export default function Block({block}: {block: any}) {
    const handleOpenDetail = (block: any) => {
        console.log('open block detail', block);
    }

    return (
        <div className="border border-neutral-700 w-full p-4 xl:p-8 rounded-3xl cursor-pointer hover:brightness-[120%]" onClick={() => handleOpenDetail(block)}>
            <div className="flex justify-start items-end">
                <span className="text-2xl" role="img" aria-label="block icon">{block.icon}</span>
                <div className="ml-2 text-neutral-50 text-xl">{block.name}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-x-4 lg:gap-x-8">
                <AllocationKPI title="Yearly Emission" value={`${shortenNumber(block.yearly_emissions)} t`} />
                <AllocationKPI title="yearly contribution" value={`$${shortenNumber(block.yearly_contribution)}`} />
                <div className="w-full">
                    <CircleProgress value={block.total_consumption} over={block.yearly_emissions} size={52} bgColor="#29A46F" progressColor="#363840" />
                </div>
            </div>
            <div className="mt-8 w-full bg-neutral-600 rounded-full h-4 p-[4px] flex items-center justify-start">
                <Repartition block={block} />
            </div>
        </div>
    )
}