import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ErrorReloadTable, NoDataTable } from "~/components/common/ErrorReload";
import Pagination from "~/components/common/Pagination";
import Title from "~/components/common/Title";
import TableLoading from "~/components/table/TableLoading";
import type { FinancialAnalysisData, PageInfo } from "~/graphql/__generated__/graphql";
import { FINANCIAL_ANALYSIS } from "~/graphql/queries/net-zero";
import { RESULT_PER_PAGE } from "~/utils/constant";

export default function FinancialAnalysisTable({ businessUnitId }: { businessUnitId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(FINANCIAL_ANALYSIS, {
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

    const financialAnalysis: FinancialAnalysisData[] = data?.financialAnalysis.data;
    const pagination: PageInfo = data?.financialAnalysis.page_info;

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }
    
    useEffect(() => {
        refetchData();
    }, [currentPage]);

    return (
        <div className="mt-12 w-full">
            <Title title="Financial analysis" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                        <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Average Purchased price ($/t)</th>
                            <th className="px-4">Average Issued price ($/t)</th>
                            <th className="px-4">Average price ($/t)</th>
                            <th className="px-4">Total Purchased amount ($)</th>
                            <th className="px-4">Total Issued amount ($)</th>
                            <th className="px-4">Total amount ($)</th>
                            <th className="px-4">All time avg purchased price ($/t)</th>
                            <th className="px-4">All time avg issued price ($/t)</th>
                            <th className="px-4">All time avg price ($/t)</th>
                            <th className="px-4">Cumulative Total Amount ($)</th>
                            <th className="px-4">Emission Debt ($)</th>
                            <th className="px-4">Cumulative Emission Debt ($)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={RESULT_PER_PAGE} numberOfColumns={11} />}
                        {!loading && !error && <TableLoaded financialAnalysis={financialAnalysis} />}
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

function TableLoaded({financialAnalysis}: {financialAnalysis: FinancialAnalysisData[]}) {
    if (financialAnalysis.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {financialAnalysis.map((data: FinancialAnalysisData, idx: number) => {
                const { 
                    year,
                    all_time_avg_issued_price,
                    all_time_avg_purchased_price,
                    all_time_avg_price,
                    avg_issued_price,
                    avg_purchased_price,
                    avg_price,
                    cumulative_emission_debt,
                    cumulative_total_amount,
                    emission_debt,
                    total_amount,
                    total_issued_amount,
                    total_purchased_amount
                } = data;

                if (!year) {
                    return null;
                }

                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{year}</td>
                        <td className="px-4">{avg_purchased_price}</td>
                        <td className="px-4">{avg_issued_price}</td>
                        <td className="px-4">{avg_price}</td>
                        <td className="px-4">{total_purchased_amount}</td>
                        <td className="px-4">{total_issued_amount}</td>
                        <td className="px-4">{total_amount}</td>
                        <td className="px-4">{all_time_avg_purchased_price}</td>
                        <td className="px-4">{all_time_avg_issued_price}</td>
                        <td className="px-4">{all_time_avg_price}</td>
                        <td className="px-4">{cumulative_total_amount}</td>
                        <td className="px-4">{emission_debt}</td>
                        <td className="px-4">{cumulative_emission_debt}</td>
                    </tr>
                )
            })}
        </>
    )
}
