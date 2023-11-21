export function GlobalKPI({title, kpi, loading, error, refetchData}: {title: string, kpi: any, loading?: boolean, error?: any, refetchData?: any}) {
    if (loading) return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="animate-pulse bg-opacityLight-10 w-3/4 h-6 mt-2 rounded-md"></div>
        </div>
    )

    if (error) return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2 bg-opacityLight-5 border border-neutral-600 rounded-xl px-4 py-2 cursor-pointer hover:brightness-105" onClick={refetchData}>
                Reload
            </div>
        </div>
    )

    return (
        <div className="relative w-full border border-neutral-700 bg-allocation-card bg-blend-overlay bg-cover p-4 xl:p-8 rounded-xl">
            <div className="text-neutral-300 text-sm font-light">{title}</div>
            <div className="text-neutral-100 text-xl font-bold mt-2">
                {kpi}
            </div>
        </div>
    )
}

export function KPI({title, kpi, loading, error, refetchData}: {title: string, kpi: any, loading?: boolean, error?: any, refetchData?: any}) {
    const cssClass = "relative w-full border border-opacityLight-10 py-1 px-2 md:py-2 md:px-4 rounded-lg uppercase";
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
            <div className="text-neutral-100 text-xl mt-2">
                {kpi}
            </div>
        </div>
    )
}