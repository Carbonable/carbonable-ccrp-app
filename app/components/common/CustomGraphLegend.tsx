export function CustomLegend({ payload }: any) {
    return (
        <ul className="flex flex-wrap justify-center items-center gap-2">
            {payload.map((entry: any, index: number) => (
                <li key={`item-${index}`} className="flex items-center border border-neutral-500 text-neutral-300 text-xs py-1 px-3 rounded-full min-w-fit">
                    <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                    <span>{entry.name}</span>
                </li>
            ))}
        </ul>
    );
}