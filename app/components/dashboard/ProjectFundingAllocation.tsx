import { useQuery } from "@apollo/client";
import type { PaginationObject, ProjectFundingAllocation } from "~/graphql/__generated__/graphql";
import Pagination from "../common/Pagination";
import { GET_PROJECT_FUNDING_ALLOCATION } from "~/graphql/queries";
import { getNumericPercentage } from "~/utils/utils";
import SquaredInitials from "../common/SquaredInitials";
import ErrorReload from "../common/ErrorReload";

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
        <div className="mt-12 w-full">
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full border border-neutral-600">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr className="table-style">
                            <th className="pl-2">Project Name</th>
                            <th className="pl-2">Allocation</th>
                            <th className="pl-2">%</th>
                            <th className="pl-2">Generated CC</th>
                            <th className="pl-2">Forward CC</th>
                            <th className="pl-2">Commited CC</th>
                            <th className="pl-2">Retired CC</th>
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

function ProjectFundingAllocationLoaded({projectFundingAllocation}: {projectFundingAllocation: ProjectFundingAllocation[]}) {
    return (
        <>
            {projectFundingAllocation.map((allocation: any, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className="border-b h-12 last:border-b-0 border-neutral-600 hover:bg-neutral-600 items-center text-neutral-200 whitespace-nowrap">
                        <td>
                            <div className="flex items-center justify-start text-neutral-100 w-max">
                                <div className="p-2">
                                    <SquaredInitials text={allocation.name} color={allocation.color} />
                                </div>
                                <div className="ml-2 font-bold">{allocation.name}</div>
                            </div>
                        </td>
                        <td className="pl-2"><AllocationBar percentage={allocation.allocation} /></td>
                        <td className="pl-2">{allocation.allocation}</td>
                        <td className="pl-2">{allocation.generated_cc}</td>
                        <td className="pl-2">{allocation.forwarded_cc}</td>
                        <td className="pl-2">{allocation.comitted_cc}</td>
                        <td className="pl-2">{allocation.retired_cc}</td>
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