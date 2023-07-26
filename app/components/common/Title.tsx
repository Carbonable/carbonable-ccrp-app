export default function Title({ title }: { title: string }) {   
    return (
        <div className="text-neutral-100 text-xl font-bold pb-2 border-b border-neutral-500 mt-20">{title}</div>
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
    