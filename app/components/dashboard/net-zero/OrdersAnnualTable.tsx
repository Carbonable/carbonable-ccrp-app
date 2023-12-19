import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ErrorReloadTable, NoDataTable } from "~/components/common/ErrorReload";
import Pagination from "~/components/common/Pagination";
import Title from "~/components/common/Title";
import TableLoading from "~/components/table/TableLoading";
import type { PageInfo, StockData } from "~/graphql/__generated__/graphql";
import { GET_STOCKS } from "~/graphql/queries/stock";
import { CARBONABLE_COMPANY_ID, RESULT_PER_PAGE } from "~/utils/constant";

export default function OrdersAnnualTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_STOCKS, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID
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
                company_id: CARBONABLE_COMPANY_ID
            },
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    const stocks: StockData[] = data?.getStock.data;
    const pagination: PageInfo = data?.getStock.page_info;

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);
    
    return (
        <div className="mt-12 w-full">
            <Title title="Orders - Annual" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Project</th>
                            <th className="px-4">Qty allocated</th>
                            <th className="px-4">Stock available</th>
                            <th className="px-4">Qty Locked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={RESULT_PER_PAGE} numberOfColumns={5} />}
                        {!loading && !error && <TableLoaded stocks={stocks} />}
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

function TableLoaded({stocks}: {stocks: StockData[]}) {
    if (stocks.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {stocks.map((data: StockData, idx: number) => {
                const { 
                    vintage,
                    project,
                    quantity,
                    available,
                    locked
                } = data;

                if (!vintage) {
                    return null;
                }

                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(vintage) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{vintage}</td>
                        <td className="px-4">{project.name}</td>
                        <td className="px-4">{quantity}</td>
                        <td className="px-4">{available}</td>
                        <td className="px-4">{locked}</td>
                    </tr>
                )
            })}
        </>
    )
}
