export default function AllocationKPI({title, value}: {title: string, value: string | undefined}) {
    return (
        <div className="w-full grid grid-rows-2">
            <div className="text-neutral-300 text-[10px] xl:text-xs uppercase font-inter">{title}</div>
            <div className="text-neutral-100 text-2xl font-bold">{value}</div>
        </div>
    )
}