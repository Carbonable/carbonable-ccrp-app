import { getNumericPercentage } from "~/utils/utils";
import TableLoading from "~/components/table/TableLoading";
import { useEffect, useState } from "react";
import { ErrorReloadTable, NoDataTable } from "../ErrorReload";
import Pagination from "../Pagination";
import SquaredInitials from "../SquaredInitials";
import SecondaryButton from "../Buttons";
import type { CompanyCarbonAssetAllocationData, PageInfo } from "~/graphql/__generated__/graphql";
import { RESULT_PER_PAGE } from "~/utils/constant";

export default function CompanyAssetsAllocationComponent({ data, loading, error, refetchData, setCurrentPage }: { data: any, loading: boolean, error: any, refetchData: any, setCurrentPage: (page: number) => void }) {
    const [filteredCarbonAssetAllocation, setFilteredCarbonAssetAllocation] = useState<CompanyCarbonAssetAllocationData[]>([]);

    if (error) {
        console.error(error);
    }

    const carbonAssetAllocation: CompanyCarbonAssetAllocationData[] = data?.companyCarbonAssetAllocation.data;
    const pagination: PageInfo = data?.companyCarbonAssetAllocation.page_info;

    useEffect(() => {
        if (!carbonAssetAllocation) {
            return;
        }

        const filteredResult: CompanyCarbonAssetAllocationData[] = carbonAssetAllocation.filter((allocation: CompanyCarbonAssetAllocationData) => { return allocation.total_allocated_to_date &&  allocation.total_allocated_to_date > 0 });
        setFilteredCarbonAssetAllocation(filteredResult);
    }, [carbonAssetAllocation]);

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }

    return (
        <div className="w-full">
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr className="table-style">
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Project Name</th>
                            <th className="px-4">Type</th>
                            <th className="px-4">Total Potential</th>
                            <th className="px-4">Ex-post to date</th>
                            <th className="px-4">Ex-ante to date</th>
                            <th className="px-4">Project completion (%)</th>
                            <th className="px-4"></th>
                            <th className="px-4">Total Allocated to date</th>
                            <th className="px-4">Total Available to date</th>
                            <th className="px-4">Allocation Rate</th>
                            <th className="px-4">Price/t</th>
                            <th className="px-4">Total $ amount</th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={RESULT_PER_PAGE} numberOfColumns={13} />}
                        {!loading && !error && <ProjectFundingAllocationLoaded carbonAssetAllocation={filteredCarbonAssetAllocation} />}
                        {error && <ErrorReloadTable refetchData={refetchData} /> }
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={pagination?.total_page} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

function ProjectFundingAllocationLoaded({carbonAssetAllocation}: {carbonAssetAllocation: CompanyCarbonAssetAllocationData[]}) {
    if (carbonAssetAllocation.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {carbonAssetAllocation.map((allocation: CompanyCarbonAssetAllocationData, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 bg-neutral-800 hover:brightness-110 items-center text-neutral-200 whitespace-nowrap group">
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.project_name} color="random" />
                                </div>
                                <div className="ml-2 font-bold">{allocation.project_name}</div>
                            </div>
                        </td>
                        <td className="px-4">{allocation.type}</td>
                        <td className="px-4">{allocation.total_potential}</td>
                        <td className="px-4">{allocation.ex_post_to_date}</td>
                        <td className="px-4">{allocation.ex_ante_to_date}</td>
                        <td className="px-4"><AllocationBar percentage={allocation.project_completion} /></td>
                        <td className="px-4">{allocation.project_completion}</td>
                        <td className="px-4">{allocation.total_allocated_to_date}</td>
                        <td className="px-4">{allocation.total_available_to_date}</td>
                        <td className="px-4">{allocation.allocation_rate}</td>
                        <td className="px-4">{allocation.price}</td>
                        <td className="px-4">{allocation.total_amount}</td>
                        <td className="px-4"><SecondaryButton className="border-0">...</SecondaryButton></td>
                    </tr>
                )
            })}
        </>
    )
}

function AllocationBar({ percentage }: { percentage: string | any }) {
    const percentageInt = getNumericPercentage(percentage);
    return (
        <div className="w-full h-2 bg-neutral-100 rounded-lg">
            <div className="h-full bg-greenish-500 rounded-lg" style={{width: `${percentageInt}%`}}></div>
        </div>
    )
}