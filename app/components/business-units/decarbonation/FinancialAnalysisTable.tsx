import Pagination from "~/components/common/Pagination";

export default function FinancialAnalysisTable() {

    const handlePageClick = (data: any) => {
        console.log(data);
    }
    
    return (
        <div className="mt-12 w-full">
            <div className="font-bold text-lg">Financial analysis</div>
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Average Purchased price (y)</th>
                            <th className="px-4">Average Purchased price (Cumulative)</th>
                            <th className="px-4">Total Purchased amount (y)</th>
                            <th className="px-4">Total Purchased amount (Cumulative)</th>
                            <th className="px-4">Average Issued price (y)</th>
                            <th className="px-4">Average Issued price (Cumulative)</th>
                            <th className="px-4">Total Issued amount (y)</th>
                            <th className="px-4">Total Issued amount (Cumulative)</th>
                            <th className="px-4">Gran Total amount (y)</th>
                            <th className="px-4">Gran Total amount (Cumulative)</th>
                            <th className="px-4">Emission Debt est. $ amount (y)</th>
                            <th className="px-4">Emission Debt est. $ amount (Cumulative)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ProjectedDecarbonationLoaded projectedDecarbonationTable={["test"]} />
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={1} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

function ProjectedDecarbonationLoaded({projectedDecarbonationTable}: {projectedDecarbonationTable: any[]}) {
    return (
        <>
            {projectedDecarbonationTable.map((projection: any, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(projection.year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
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