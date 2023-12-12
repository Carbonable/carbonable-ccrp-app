import TableLoading from "~/components/table/TableLoading";
import { ErrorReloadTable, NoDataTable } from "../ErrorReload";
import Pagination from "../Pagination";
import SquaredInitials from "../SquaredInitials";
import SecondaryButton from "../Buttons";
import type { ProjectCarbonAssetAllocation } from "~/graphql/__generated__/graphql";

export default function ProjectAssetsAllocationComponent({ data, loading, error, refetch }: { data: any, loading: boolean, error: any, refetch: any }) {
    const currentPage = 1;
    const resultsPerPage = 5;

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const carbonAssetAllocation: ProjectCarbonAssetAllocation[] = data?.projectCarbonAssetAllocation;

    const handlePageClick = (data: any) => {
        refetch();
    }

    return (
        <div className="w-full">
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr className="table-style">
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Business Unit</th>
                            <th className="px-4">Allocated</th>
                            <th className="px-4">Allocation amount</th>
                            <th className="px-4">Target</th>
                            <th className="px-4">Actual</th>
                            <th className="px-4">Start date</th>
                            <th className="px-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={resultsPerPage} numberOfColumns={6} />}
                        {!loading && !error && <ProjectFundingAllocationLoaded carbonAssetAllocation={carbonAssetAllocation} />}
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

function ProjectFundingAllocationLoaded({carbonAssetAllocation}: {carbonAssetAllocation: ProjectCarbonAssetAllocation[]}) {
    if (carbonAssetAllocation.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {carbonAssetAllocation.map((allocation: ProjectCarbonAssetAllocation, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 bg-neutral-800 hover:brightness-110 items-center text-neutral-200 whitespace-nowrap group">
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.business_unit.name} color="random" />
                                </div>
                                <div className="ml-2 font-bold">{allocation.business_unit.name}</div>
                            </div>
                        </td>
                        <td className="px-4">{allocation.allocated}</td>
                        <td className="px-4">{allocation.allocation_amount}</td>
                        <td className="px-4">{allocation.target}</td>
                        <td className="px-4">{allocation.actual}</td>
                        <td className="px-4">{allocation.start_date}</td>
                        <td className="px-4"><SecondaryButton className="border-0">...</SecondaryButton></td>
                    </tr>
                )
            })}
        </>
    )
}
