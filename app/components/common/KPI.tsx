export function GlobalKPI({title, kpi, loading, error, refetchData}: {title: string, kpi: any, loading?: boolean, error?: any, refetchData?: any}) {
    const cssClass = "relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover py-2 px-4 md:py-4 md:px-8 rounded-xl";
    if (loading) return (
        <div className={cssClass}>
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="animate-pulse bg-opacityLight-10 w-3/4 h-6 mt-2 rounded-md"></div>
        </div>
    )

    if (error) return (
        <div className={cssClass}>
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
                Reload
            </div>
        </div>
    )

    return (
        <div className={cssClass}>
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2">
                {kpi}
            </div>
        </div>
    )
}

export function KPI({title, kpi, loading, error, refetchData}: {title: string, kpi: any, loading?: boolean, error?: any, refetchData?: any}) {
    const cssClass = "relative w-full border border-opacityLight-10 py-1 px-2 md:py-2 md:px-4 rounded-lg";
    if (loading) return (
        <div className={cssClass}>
            <div className="text-neutral-200 text-sm font-light">{title}</div>
            <div className="animate-pulse bg-opacityLight-10 w-3/4 h-6 mt-2 rounded-md"></div>
        </div>
    )

    if (error) return (
        <div className={cssClass}>
            <div className="text-neutral-200 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl mt-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
                Reload
            </div>
        </div>
    )

    return (
        <div className={cssClass}>
            <div className="text-neutral-200 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl mt-2 capitalize">
                {kpi.toString().toLowerCase()}
            </div>
        </div>
    )
}