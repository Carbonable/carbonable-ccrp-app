import ErrorReload from "../common/ErrorReload";
import Pagination from "../common/Pagination";
import TableLoading from "./TableLoading";

export default function TableComponent({loading, error, refetchData, resultsPerPage, pagination, handlePageClick, columnsHeader, tableData}: 
    {loading: boolean, error: boolean, refetchData: any, resultsPerPage: number, pagination: any, handlePageClick: any, columnsHeader: string[], tableData: string[][]}) {
    
    return (
        <>
            <div className="w-full font-inter text-sm overflow-x-auto border border-neutral-600">
                <table className="table-auto text-left min-w-full">
                    <thead className="bg-neutral-500 text-neutral-100 whitespace-nowrap h-10">
                        <tr>
                            {columnsHeader.map((column: string, idx: number) => {
                                return (
                                    <th key={`column_${idx}`} className="px-4 first:sticky first:left-0 first:z-10 first:bg-neutral-500">{column}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {loading && <TableLoading resultsPerPage={resultsPerPage} numberOfColumns={11} />}
                        {!loading && !error && <TableLoaded tableData={tableData} />}
                        {error && <ErrorReload refetchData={refetchData} /> }
                    </tbody>
                </table>
            </div>
            <div className="mt-8">
                <Pagination pageCount={pagination?.max_page} handlePageClick={handlePageClick} />
            </div>
        </>
    )
}

function TableLoaded({tableData}: {tableData: string[][]}) {
    console.log(tableData)
    return (
        <>
            {tableData.map((data: string[], idx: number) => {
                return (
                    <tr key={`projection_${idx}`} className={`border-b border-neutral-600 bg-neutral-800 h-12 last:border-b-0 hover:brightness-110 ${(!isNaN(parseInt(data[0])) && parseInt(data[0]) < new Date().getFullYear()) ? "text-neutral-50" : "text-neutral-200"}`}>
                        {data.map((value: string, idx: number) => {
                            return (
                                <td key={`data_${idx}`} className="px-4 first:sticky first:left-0 first:z-10 first:bg-neutral-800">{value}</td>
                            )
                        })}
                    </tr>
                )
            })}
        </>
    )
}