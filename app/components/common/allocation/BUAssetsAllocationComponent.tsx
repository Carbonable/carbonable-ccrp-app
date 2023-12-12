import TableLoading from "~/components/table/TableLoading";
import { ErrorReloadTable, NoDataTable } from "../ErrorReload";
import Pagination from "../Pagination";
import SquaredInitials from "../SquaredInitials";
import SecondaryButton from "../Buttons";
import type { BusinessUnitCarbonAssetAllocation } from "~/graphql/__generated__/graphql";

export default function BUAssetsAllocationComponent({ data, loading, error, refetch }: { data: any, loading: boolean, error: any, refetch: any }) {
    const currentPage = 1;
    const resultsPerPage = 5;

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const carbonAssetAllocation: BusinessUnitCarbonAssetAllocation[] = data?.businessUnitCarbonAssetAllocation;

    const handlePageClick = (data: any) => {
        refetch();
    }

    return (
        <div className="w-full">
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr className="table-style">
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Project Name</th>
                            <th className="px-4">Total Carbon Unit</th>
                            <th className="px-4">Allocated</th>
                            <th className="px-4">Generated</th>
                            <th className="px-4">Forward</th>
                            <th className="px-4">Retired</th>
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

function ProjectFundingAllocationLoaded({carbonAssetAllocation}: {carbonAssetAllocation: BusinessUnitCarbonAssetAllocation[]}) {
    if (carbonAssetAllocation.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {carbonAssetAllocation.map((allocation: BusinessUnitCarbonAssetAllocation, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 bg-neutral-800 hover:brightness-110 items-center text-neutral-200 whitespace-nowrap group">
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.project.name} color="random" />
                                </div>
                                <div className="ml-2 font-bold">{allocation.project.name}</div>
                            </div>
                        </td>
                        <td className="px-4">{allocation.total_cu}</td>
                        <td className="px-4">{allocation.allocated}</td>
                        <td className="px-4">{allocation.generated}</td>
                        <td className="px-4">{allocation.forward}</td>
                        <td className="px-4">{allocation.retired}</td>
                        <td className="px-4"><SecondaryButton className="border-0">...</SecondaryButton></td>
                    </tr>
                )
            })}
        </>
    )
}
