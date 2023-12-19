import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ErrorReloadTable, NoDataTable } from "~/components/common/ErrorReload";
import Pagination from "~/components/common/Pagination";
import Title from "~/components/common/Title";
import TableLoading from "~/components/table/TableLoading";
import type { CumulativeData, PageInfo } from "~/graphql/__generated__/graphql";
import { CUMULATIVE } from "~/graphql/queries/net-zero";
import { RESULT_PER_PAGE } from "~/utils/constant";

export default function ProjectDecarbonationTableCumulative({ businessUnitId }: { businessUnitId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(CUMULATIVE, {
        variables: {
            view: {
                business_unit_id: businessUnitId
            },
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        }
    });

    const refetchData = () => {
        refetch({
            view: {
                business_unit_id: businessUnitId
            },
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    const cumulative: CumulativeData[] = data?.cumulative.data;
    const pagination: PageInfo = data?.cumulative.page_info;

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);
    
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
                        {loading && <TableLoading resultsPerPage={RESULT_PER_PAGE} numberOfColumns={11} />}
                        {!loading && !error && <ProjectedDecarbonationLoaded cumulative={cumulative} />}
                        {error && <ErrorReloadTable refetchData={refetchData} /> }
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination 
                    currentPage={currentPage}
                    pageCount={pagination?.total_page} 
                    handlePageClick={handlePageClick}
                />
            </div>
        </div>
    );
}

function ProjectedDecarbonationLoaded({cumulative}: {cumulative: CumulativeData[]}) {
    if (cumulative.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {cumulative.map((data: any, idx: number) => {
                const { time_period, emissions, ex_post_issued, ex_post_purchased, ex_post_retired, delta, debt } = data;

                if (!time_period) {
                    return null;
                }

                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(time_period) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{time_period}</td>
                        <td className="px-4">{emissions}</td>
                        <td className="px-4">{ex_post_retired}</td>
                        <td className="px-4">{ex_post_issued}</td>
                        <td className="px-4">{ex_post_purchased}</td>
                        <td className="px-4">{delta ? delta : 'n/a'}</td>
                        <td className="px-4">{debt}</td>
                    </tr>
                )
            })}
        </>
    )
}
