import Title from "~/components/common/Title";

export default function ProjectDecarbonationTableCumulative() {
    
    return (
        <div className="mt-12 w-full">
            <Title title="Cumulative" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Cumulative Emissions</th>
                            <th className="px-4">Cumulative Retired</th>
                            <th className="px-4">Cumulative Issued</th>
                            <th className="px-4">Cumulative Purchased</th>
                            <th className="px-4">Cumulative Delta</th>
                            <th className="px-4">Cumulative Emission Debt</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProjectedDecarbonationLoaded projectedDecarbonationTable={["test"]} />
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                
            </div>
        </div>
    );
}

function ProjectedDecarbonationLoading({resultsPerPage}: {resultsPerPage: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const colums = [1, 2, 3, 4, 5, 6, 7];
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

function ProjectedDecarbonationLoaded({projectedDecarbonationTable}: {projectedDecarbonationTable: any[]}) {
    return (
        <>
            {projectedDecarbonationTable.map((projection: any, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:bg-neutral-600 group ${parseInt(projection.year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800 group-hover:bg-neutral-600">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                    </tr>
                )
            })}
        </>
    )
}