export default function Repartition({block}: {block: any}) {
    const allocationsList = block.allocations ? block.allocations.concat(block.carbon_credit_purchased) : [];
    const totalConsumption = allocationsList.length > 0 ? allocationsList.map((totalAllocation: any) => totalAllocation.carbon_credit_allocated).reduce((acc: any, amount: any) => acc + amount) : 0;

    const AllocationPercentage = ({allocation, idx}: {allocation: any, idx: number}) => {
        const percentage = Math.round((allocation.carbon_credit_allocated / totalConsumption) * 100);
        return (
            <div 
                className={`${idx === 0 ? "rounded-l-full" : ""}
                            ${idx === allocationsList.length - 1 ? "rounded-r-full" : ""}
                            h-[10px]
                            `}
                style={{width: `${percentage}%`, backgroundColor: `${allocation.color}`}}
            >
            </div>
        )
    }

    return (
        <>
            {allocationsList.map((allocation: any, idx: number) => (
                <AllocationPercentage allocation={allocation} idx={idx} key={`allocation_${idx}`}  />
            ))}
        </>
    )
}