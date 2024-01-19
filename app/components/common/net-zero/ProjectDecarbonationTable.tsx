import Pagination from "../../common/Pagination";
import type { AnnualData, PageInfo } from "~/graphql/__generated__/graphql";
import { ErrorReloadTable, NoDataTable } from "../../common/ErrorReload";
import Title from "~/components/common/Title";
import TableLoading from "~/components/table/TableLoading";
import { RESULT_PER_PAGE } from "~/utils/constant";

export default function ProjectDecarbonationTableComponent({ loading, error, data, refetchData, currentPage, setCurrentPage }: { loading: boolean, error: any, data: any, refetchData: any, currentPage: number, setCurrentPage: (page: number) => void }) {

    if (error) {
        console.error(error);
    }

    const annual: AnnualData[] = data?.annual.data;
    const pagination: PageInfo = data?.annual.page_info;

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected + 1);
    }
    
    return (
        <div className="mt-12 w-full">
            <Title title="Stock - Annual" />
            <div className="mt-4 w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            <th className="px-4 sticky left-0 z-10 bg-neutral-500">Time Period</th>
                            <th className="px-4">Emission (t)</th>
                            <th className="px-4">Ex-Post Issued (t)</th>
                            <th className="px-4">Ex-Post Purchased (t)</th>
                            <th className="px-4">Ex-Post Retired (t)</th>
                            <th className="px-4">Total Ex-Post (t)</th>
                            <th className="px-4">Total Ex-Ante (t)</th>
                            <th className="px-4">Neutrality Target (%)</th>
                            <th className="px-4">Actual Rate (%)</th>
                            <th className="px-4">Delta (%)</th>
                            <th className="px-4">Debt (t)</th>
                            <th className="px-4">Ex-Post Stock (t)</th>
                            <th className="px-4">Ex-ante Stock (t)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={RESULT_PER_PAGE} numberOfColumns={11} />}
                        {!loading && !error && <ProjectedDecarbonationLoaded annual={annual} />}
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

function ProjectedDecarbonationLoaded({ annual }: { annual: AnnualData[] }) {
    if (annual.length === 0) {
        return <NoDataTable />
    }

    return (
        <>
            {annual.map((data: AnnualData, idx: number) => {
                const { 
                    time_period,
                    emissions,
                    ex_post_issued,
                    ex_post_purchased,
                    ex_post_retired,
                    target,
                    actual_rate,
                    delta, debt,
                    ex_post_stock,
                    ex_ante_stock,
                    total_ex_ante,
                    total_ex_post
                } = data;

                if (!time_period) {
                    return null;
                }

                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${parseInt(time_period) < new Date().getFullYear() ? "text-neutral-50" : "text-neutral-200"}`}>
                        <td className="px-4 sticky left-0 z-10 bg-neutral-800">{time_period}</td>
                        <td className="px-4">{emissions}</td>
                        <td className="px-4">{ex_post_issued}</td>
                        <td className="px-4">{ex_post_purchased}</td>
                        <td className="px-4">{ex_post_retired}</td>
                        <td className="px-4">{total_ex_post}</td>
                        <td className="px-4">{total_ex_ante}</td>
                        <td className="px-4">{target}</td>
                        <td className="px-4">{actual_rate ? actual_rate : 'n/a'}</td>
                        <td className="px-4">{delta ? delta : 'n/a'}</td>
                        <td className="px-4">{debt ? debt : 'n/a'}</td>
                        <td className="px-4">{ex_post_stock}</td>
                        <td className="px-4">{ex_ante_stock}</td>
                    </tr>
                )
            })}
        </>
    )
}
