export default function Title({ title, isBeta }: { title: string, isBeta?: boolean }) {
    return (
        <div className="text-neutral-100 text-xl font-bold pb-2 border-b border-neutral-500 mt-12 mb-8 flex items-center">
            {title}
            {isBeta && <span className="px-3 py-1 ml-3 bg-beta-button text-xs rounded-md font-light">Beta version</span>}
        </div>
    )
}

export function SmallTitle({ title }: { title: string }) {   
    return (
        <div className="text-neutral-300 text-sm text-center w-full">{title}</div>
    )
}

export function ImpactTitle({title, value}: {title: string, value: string}) {
    return (
        <>
            <div className="text-neutral-300 text-sm">{title}</div>
            <div className="text-neutral-50 text-xl font-bold mt-3">{value}</div>
        </>
    )
}
    