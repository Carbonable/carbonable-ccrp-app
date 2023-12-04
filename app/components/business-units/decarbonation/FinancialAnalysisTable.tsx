import { useQuery } from "@apollo/client";
import { ErrorReloadTable, NoDataTable } from "~/components/common/ErrorReload";
import Pagination from "~/components/common/Pagination";
import Title from "~/components/common/Title";
import TableLoading from "~/components/table/TableLoading";
import type { FinancialAnalysis } from "~/graphql/__generated__/graphql";
import { FINANCIAL_ANALYSIS } from "~/graphql/queries/net-zero";

export default function FinancialAnalysisTable({ businessUnitId }: { businessUnitId: string }) {
    const currentPage = 1;
    const resultsPerPage = 5;
    const { loading, error, data, refetch } = useQuery(FINANCIAL_ANALYSIS, {
        variables: {
            view: {
                business_unit_id: businessUnitId
            }
        }
    });

    const refetchData = () => {
        refetch();
    }

    const financialAnalysis: FinancialAnalysis[] = data?.financialAnalysis;

    const handlePageClick = (data: any) => {
        refetch();
    }
    
    return (
        <div className="mt-12 w-full">
            <Title title="Financial analysis" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Average Purchased price (y)</th>
                            <th className="px-4">Average Purchased price (Cumulative)</th>
                            <th className="px-4">Total Purchased amount (y)</th>
                            <th className="px-4">Total Purchased amount (Cumulative)</th>
                            <th className="px-4">Average Issued price (y)</th>
                            <th className="px-4">Average Issued price (Cumulative)</th>
                            <th className="px-4">Total Issued amount (y)</th>
                            <th className="px-4">Total Issued amount (Cumulative)</th>
                            <th className="px-4">Gran Total amount (y)</th>
                            <th className="px-4">Gran Total amount (Cumulative)</th>
                            <th className="px-4">Emission Debt est. $ amount (y)</th>
                            <th className="px-4">Emission Debt est. $ amount (Cumulative)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={resultsPerPage} numberOfColumns={11} />}
                        {!loading && !error && <TableLoaded financialAnalysis={financialAnalysis} />}
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

function TableLoaded({financialAnalysis}: {financialAnalysis: FinancialAnalysis[]}) {
    if (financialAnalysis.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {financialAnalysis.map((data: FinancialAnalysis, idx: number) => {
                const { 
                    year,
                    purchased_price,
                    cumulative_purchased_price,
                    total_purchased_amount,
                    cumulative_total_purchased_amount,
                    issued_price, 
                    total_issued_amount,
                    cumulative_total_issued_amount,
                    gran_total_amount,
                    cumulative_gran_total_amount,
                    estimated_debt_amount,
                    cumulative_estimated_debt_amount
                } = data;

                if (!year) {
                    return null;
                }

                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(year) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{year}</td>
                        <td className="px-4">{purchased_price}</td>
                        <td className="px-4">{cumulative_purchased_price}</td>
                        <td className="px-4">{total_purchased_amount}</td>
                        <td className="px-4">{cumulative_total_purchased_amount}</td>
                        <td className="px-4">{issued_price}</td>
                        <td className="px-4">TBD</td>
                        <td className="px-4">{total_issued_amount}</td>
                        <td className="px-4">{cumulative_total_issued_amount}</td>
                        <td className="px-4">{gran_total_amount}</td>
                        <td className="px-4">{cumulative_gran_total_amount}</td>
                        <td className="px-4">{estimated_debt_amount}</td>
                        <td className="px-4">{cumulative_estimated_debt_amount}</td>
                    </tr>
                )
            })}
        </>
    )
}
