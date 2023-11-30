import { useQuery } from "@apollo/client";
import type { CarbonAssetAllocation, ProjectFundingAllocation } from "~/graphql/__generated__/graphql";
import Pagination from "../../common/Pagination";
import { getNumericPercentage } from "~/utils/utils";
import SquaredInitials from "../../common/SquaredInitials";
import { ErrorReloadTable, NoDataTable } from "../../common/ErrorReload";
import TableLoading from "~/components/table/TableLoading";
import { GET_ALLOCATIONS } from "~/graphql/queries/allocation";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";

export default function ProjectFundingAllocation() {
    const currentPage = 1;
    const resultsPerPage = 5;
    const { loading, error, data, refetch } = useQuery(GET_ALLOCATIONS, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID,
            }
        }
    });

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const carbonAssetAllocation: CarbonAssetAllocation[] = data?.carbonAssetAllocation;

    const handlePageClick = (data: any) => {
        refetch({
            view: {
                company_id: CARBONABLE_COMPANY_ID,
            }
        });
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
                            <th className="px-4">Total Allocated to date</th>
                            <th className="px-4">Total Available to date</th>
                            <th className="px-4">Allocation Rate</th>
                            <th className="px-4"></th>
                            <th className="px-4">Price/t</th>
                            <th className="px-4">Total $ amount</th>
                            <th className="px-4"># of blocks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={resultsPerPage} numberOfColumns={12} />}
                        {!loading && !error && <CarbonAssetAllocationLoaded carbonAssetAllocation={carbonAssetAllocation} />}
                        {error && <ErrorReloadTable refetchData={refetchData} /> }
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={currentPage} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

function CarbonAssetAllocationLoaded({carbonAssetAllocation}: {carbonAssetAllocation: CarbonAssetAllocation[]}) {
    if (carbonAssetAllocation === null || carbonAssetAllocation.length === 0) {
        return <NoDataTable />
    }
    
    return (
        <>
            {carbonAssetAllocation.map((allocation: CarbonAssetAllocation, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 bg-neutral-800 hover:brightness-110 items-center text-neutral-200 whitespace-nowrap group">
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.project_name} color={allocation.type} />
                                </div>
                                <div className="ml-2 font-bold">{allocation.project_name}</div>
                            </div>
                        </td>
                        <td className="px-4">{allocation.type}</td>
                        <td className="px-4">{allocation.total_potential}</td>
                        <td className="px-4">{allocation.ex_post_to_date}</td>
                        <td className="px-4">{allocation.ex_ante_to_date}</td>
                        <td className="px-4">{allocation.project_completion}</td>
                        <td className="px-4">{allocation.total_allocated_to_date}</td>
                        <td className="px-4">{allocation.total_available_to_date}</td>
                        <td className="px-4"><AllocationBar percentage={allocation.allocation_rate} /></td>
                        <td className="px-4">{allocation.allocation_rate}</td>
                        <td className="px-4">{allocation.price}</td>
                        <td className="px-4">{allocation.total_amount}</td>
                        <td className="px-4">TBD</td>
                    </tr>
                )
            })}
        </>
    )
}

function AllocationBar({percentage}: {percentage: string | any}) {
    const percentageInt = getNumericPercentage(percentage);
    return (
        <div className="w-full h-2 bg-neutral-100 rounded-lg">
            <div className="h-full bg-greenish-500 rounded-lg" style={{width: `${percentageInt}%`}}></div>
        </div>
    )
}