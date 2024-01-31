import Repartition from "./block/Repartition";
import CircleProgress from "./block/CircleProgress";
import AllocationKPI from "./block/AllocationKPI";
import type { BusinessUnit } from "~/graphql/__generated__/graphql";

export default function Block({ block }: { block: BusinessUnit }) {
    return (
        <div className="border border-neutral-700 w-full p-4 xl:p-8 rounded-3xl cursor-pointer hover:brightness-[120%]">
            <div className="flex justify-start items-center">
                <img src="/assets/images/logo-only.png" alt="Carbonable logo" className="w-8" />
                <div className="ml-2 text-neutral-50 text-xl">{block.name}</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-x-4 lg:gap-x-8">
                <AllocationKPI title="Yearly Emission" value={block.yearly_emissions?.toString()} />
                <AllocationKPI title="yearly contribution" value={block.yearly_contributions?.toString()} />
                <div className="w-full">
                    <CircleProgress rate={block.actual_rate} size={52} bgColor="#29A46F" progressColor="#363840" />
                </div>
            </div>
            <div className="mt-8 w-full bg-neutral-600 rounded-full h-4 p-[4px] flex items-center justify-start">
                <Repartition block={block} />
            </div>
        </div>
    )
}