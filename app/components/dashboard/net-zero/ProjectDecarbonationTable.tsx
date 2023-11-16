import { useQuery } from "@apollo/client";
import Pagination from "../../common/Pagination";
import type { PaginationObject, ProjectedDecarbonation } from "~/graphql/__generated__/graphql";
import { GET_PROJECTED_DECARBONATION_TABLE } from "~/graphql/queries";
import ErrorReload from "../../common/ErrorReload";
import Title from "~/components/common/Title";

export default function ProjectDecarbonationTable() {
    const currentPage = 1;
    const resultsPerPage = 5;
    const { loading, error, data, refetch } = useQuery(GET_PROJECTED_DECARBONATION_TABLE, {
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

    const projectedDecarbonationTable: ProjectedDecarbonation[] = data?.getProjectedDecarbonationTable.data;
    const pagination: PaginationObject = data?.getProjectedDecarbonationTable.pagination;

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
            <Title title="Annual" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Emission</th>
                            <th className="px-4">Ex-Post Issued</th>
                            <th className="px-4">Ex-Post Purchased</th>
                            <th className="px-4">Ex-Post Retired</th>
                            <th className="px-4">Neutrality Target</th>
                            <th className="px-4">Actual Rate</th>
                            <th className="px-4">Delta %</th>
                            <th className="px-4">Debt</th>
                            <th className="px-4">Ex-Post Stock</th>
                            <th className="px-4">Ex-ante Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <ProjectedDecarbonationLoading resultsPerPage={resultsPerPage} />}
                        {!loading && !error && <ProjectedDecarbonationLoaded projectedDecarbonationTable={projectedDecarbonationTable} />}
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

function ProjectedDecarbonationLoading({resultsPerPage}: {resultsPerPage: number}) {
    const lines = Array.from(Array(resultsPerPage).keys());
    const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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

function ProjectedDecarbonationLoaded({projectedDecarbonationTable}: {projectedDecarbonationTable: ProjectedDecarbonation[]}) {
    return (
        <>
            {projectedDecarbonationTable.map((projection: ProjectedDecarbonation, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(projection.year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{projection.year}</td>
                        <td className="px-4">{projection.emissions}</td>
                        <td className="px-4">{projection.received_cc}</td>
                        <td className="px-4">{projection.purchased_cc}</td>
                        <td className="px-4">{projection.retired_cc}</td>
                        <td className="px-4">{projection.target}</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">{projection.delta ? projection.delta : 'n/a'}</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">TBD</td>
                    </tr>
                )
            })}
        </>
    )
}
