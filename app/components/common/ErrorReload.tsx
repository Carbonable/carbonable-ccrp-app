export default function ErrorReload({refetchData}: {refetchData?: () => void}) {
    return (
        <div className="text-neutral-100 text-xl font-bold m-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
            Reload
        </div>
    )
}

export function ErrorReloadTable({refetchData}: {refetchData?: () => void}) {
    return (
        <tr>
            <td>
                <div className="text-neutral-100 text-xl font-bold m-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
                    Reload
                </div>
            </td>
        </tr>
    )
}

export function NoDataTable() {
    return (
        <tr>
            <td className="p-4 text-lg">No data</td>
        </tr>
    )
}
