export default function CircleProgress({rate, size, bgColor, progressColor}: {rate?: number | undefined | any, size: number, bgColor: string, progressColor: string}) {
    if (!rate || rate === 0) return null;

    return (
        <div className="relative w-[60px] h-[60px] rounded-full bg-neutral-500 ml-auto mr-3"
             style={{backgroundImage: `conic-gradient(${bgColor} ${rate}%, ${progressColor} 0)` }}>
            <div className={`flex items-center justify-center absolute top-2/4 left-2/4 bg-neutral-800 font-inter font-semibold text-neutral-50 translate-y-[-50%] translate-x-[-50%] rounded-full`} style={{width: `${size}px`, height: `${size}px`}}>{rate}</div>
        </div>

    )
}