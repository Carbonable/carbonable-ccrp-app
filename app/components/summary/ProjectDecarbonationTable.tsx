import { useQuery } from "@apollo/client";
import Pagination from "../common/Pagination";
import type { PaginationObject, ProjectedDecarbonation } from "~/graphql/__generated__/graphql";
import { GET_PROJECTED_DECARBONATION_TABLE } from "~/graphql/queries";
import { useState } from "react";

export default function ProjectDecarbonationTable() {
    const [currentPage] = useState(1);
    const [resultsPerPage] = useState(5);
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
            <div className="mt-4 w-full font-inter text-sm overflow-x-scroll">
                <table className="table-auto text-left min-w-full border border-neutral-600">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="pl-2">Time Period</th>
                            <th className="pl-2">Emission</th>
                            <th className="pl-2">Received CC</th>
                            <th className="pl-2">Purchased CC</th>
                            <th className="pl-2">Retired CC</th>
                            <th className="pl-2">Target</th>
                            <th className="pl-2">Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <ProjectedDecarbonationLoading resultsPerPage={resultsPerPage} />}
                        {!loading && !error && <ProjectedDecarbonationLoaded projectedDecarbonationTable={projectedDecarbonationTable} />}
                        {error && <ProjectedDecarbonationError refetchData={refetchData} /> }
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

function ProjectedDecarbonationLoaded({projectedDecarbonationTable}: {projectedDecarbonationTable: ProjectedDecarbonation[]}) {
    return (
        <>
            {projectedDecarbonationTable.map((projection: ProjectedDecarbonation, idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 h-12 last:border-b-0 hover:bg-neutral-600 ${parseInt(projection.year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="pl-2">{projection.year}</td>
                        <td className="pl-2">{projection.emissions}</td>
                        <td className="pl-2">{projection.received_cc}</td>
                        <td className="pl-2">{projection.purchased_cc}</td>
                        <td className="pl-2">{projection.retired_cc}</td>
                        <td className="pl-2">{projection.target}</td>
                        <td className="pl-2">{projection.delta ? projection.delta : 'n/a'}</td>
                    </tr>
                )
            })}
        </>
    )
}

function ProjectedDecarbonationError({refetchData}: {refetchData?: () => void}) {
    return (
        <div className="text-neutral-100 text-xl font-bold m-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
            Reload
        </div>
    )
}
