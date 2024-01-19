import type { Allocation, BusinessUnit } from "~/graphql/__generated__/graphql";

export default function Repartition({block}: {block: BusinessUnit}) {
    if (!block.allocations || block.allocations.length === 0) {
        return (
            <div 
                className="rounded-full bg-opacityLight-5 w-full h-[10px]"
            >
            </div>
        )
    }

    const totalConsumption = block.allocations.reduce((sum, allocation: any) => sum + allocation.amount, 0);

    return (
        <>
            {block.allocations.map((allocation: any, idx: number) => (
                <AllocationPercentage allocation={allocation} idx={idx} totalConsumption={totalConsumption} length={block.allocations ? block.allocations.length : 0} key={`allocation_${idx}`}  />
            ))}
        </>
    )
}

function AllocationPercentage({allocation, idx, totalConsumption, length}: {allocation: Allocation, idx: number, totalConsumption: number, length: number}) {
    if (!allocation.amount) {
        return null;
    }

    const percentage = Math.round((allocation.amount / totalConsumption) * 100);
    const colors = ["#29A46F", "#F9C74F", "#F8961E", "#F3722C", "#F94144", "#277DA1", "#9C6644", "#553C9A", "#2A9D8F", "#E9C46A", "#E76F51", "#264653"];

    return (
        <div 
            className={`${idx === 0 ? "rounded-l-full" : ""}
                        ${idx === length - 1 ? "rounded-r-full" : ""}
                        h-[10px]
                        `}
            style={{width: `${percentage}%`, backgroundColor: `${colors[idx]}`}}
        >
        </div>
    )
}