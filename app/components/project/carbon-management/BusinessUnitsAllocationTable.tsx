import SecondaryButton from "~/components/common/Buttons";
import Pagination from "~/components/common/Pagination";
import Title from "~/components/common/Title";

export default function BusinessUnitsAllocationTable() {

    const handlePageClick = (data: any) => {
        console.log(data);
    }
    
    return (
        <div className="mt-12 w-full">
            <Title title="Project Allocations" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Business Unit</th>
                            <th className="px-4">Allocated Units</th>
                            <th className="px-4">Allocated %</th>
                            <th className="px-4">Target</th>
                            <th className="px-4">Actual</th>
                            <th className="px-4">Start Date</th>
                            <th className="px-4">End Date</th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <BusinessUnitsAllocationTableLoaded businessUnitAllocationTable={["test"]} />
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={1} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

function BusinessUnitsAllocationTableLoading({resultsPerPage}: {resultsPerPage: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const colums = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <>
            {lines.map((line: number) => {
                return (
                    <tr className="border-b border-neutral-600 last:border-b-0" key={`loader_${line}`}>
                        { colums.map((column: number) => {
                            return (
                                <td className="animate-pulse bg-opacityLight-10 h-12 border-4 border-transparent" key={`loader_${line}_${column}`}></td>
                            )
                        })}
                    </tr>
                )
            })}
            
        </>
    )
}

function BusinessUnitsAllocationTableLoaded({businessUnitAllocationTable}: {businessUnitAllocationTable: any[]}) {
    const allocate = (allocation: any) => () => {
        console.log(allocation);
    }

    return (
        <>
            {businessUnitAllocationTable.map((allocation: any, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 group ${parseInt(allocation.year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4"><SecondaryButton onClick={allocate(allocation)}>Allocate</SecondaryButton></td>
                    </tr>
                )
            })}
        </>
    )
}
