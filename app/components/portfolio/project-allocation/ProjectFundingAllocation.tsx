import { useQuery } from "@apollo/client";
import type { PaginationObject, ProjectFundingAllocation } from "~/graphql/__generated__/graphql";
import Pagination from "../../common/Pagination";
import { GET_PROJECT_FUNDING_ALLOCATION } from "~/graphql/queries";
import { getNumericPercentage } from "~/utils/utils";
import SquaredInitials from "../../common/SquaredInitials";
import ErrorReload from "../../common/ErrorReload";

export default function ProjectFundingAllocation() {
    const currentPage = 1;
    const resultsPerPage = 5;
    const { loading, error, data, refetch } = useQuery(GET_PROJECT_FUNDING_ALLOCATION, {
        variables: {
            pagination: {
                page: currentPage,
                count: resultsPerPage
            }
        }
    });

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const projectFundingAllocation: ProjectFundingAllocation[] = data?.getProjectFundingAllocation.data;
    const pagination: PaginationObject = data?.getProjectFundingAllocation.pagination;

    const handlePageClick = (data: any) => {
        refetch({
            pagination: {
                page: data.selected + 1,
                count: resultsPerPage
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
                            <th className="px-4">End Date</th>
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
                        {loading && <ProjectFundingAllocationLoading resultsPerPage={resultsPerPage} />}
                        {!loading && !error && <ProjectFundingAllocationLoaded projectFundingAllocation={projectFundingAllocation} />}
                        {error && <ErrorReload refetchData={refetchData} /> }
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={pagination?.max_page} handlePageClick={handlePageClick} />
            </div>
        </div>
    );
}

function ProjectFundingAllocationLoading({resultsPerPage}: {resultsPerPage: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
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

function ProjectFundingAllocationLoaded({projectFundingAllocation}: {projectFundingAllocation: ProjectFundingAllocation[]}) {
    return (
        <>
            {projectFundingAllocation.map((allocation: any, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 bg-neutral-800 hover:brightness-110 items-center text-neutral-200 whitespace-nowrap group">
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.name} color={allocation.color} />
                                </div>
                                <div className="ml-2 font-bold">{allocation.name}</div>
                            </div>
                        </td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4"><AllocationBar percentage={allocation.allocation} /></td>
                        <td className="px-4">{allocation.allocation}</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                    </tr>
                )
            })}
        </>
    )
}

function AllocationBar({percentage}: {percentage: string}) {
    const percentageInt = getNumericPercentage(percentage);
    return (
        <div className="w-full h-2 bg-neutral-100 rounded-lg">
            <div className="h-full bg-greenish-500 rounded-lg" style={{width: `${percentageInt}%`}}></div>
        </div>
    )
}