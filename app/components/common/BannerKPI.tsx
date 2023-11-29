import type { ReactNode } from "react"

export default function BannerKPI({title, value, loading, error}: {title: string, value: string, loading?: boolean, error?: any}) {
    if (loading) return (
       <BannerKPIWrapper title={title}></BannerKPIWrapper>
    )

    if (error) return (
        <BannerKPIWrapper title={title}>n/a</BannerKPIWrapper>
    )

    return (
        <BannerKPIWrapper title={title}>{value}</BannerKPIWrapper>
    )
}

function BannerKPIWrapper({title, children}: {title: string, children?: ReactNode}) {
    return (
        <div className="flex flex-col items-start justify-start text-neutral-100 font-trash">
            <h1 className="font-bold uppercase text-xs md:text-sm lg:text-lg">{title}</h1>
            <div className="text-2xl mt-3 lg:text-4xl">{children}</div>
        </div>
    )
}
