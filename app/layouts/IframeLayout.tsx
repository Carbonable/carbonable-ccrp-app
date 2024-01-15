export default function IframeLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="p-4 ml-0 mt-[66px] md:p-8 lg:p-4 lg:mt-0 lg:pl-[222px] lg:mx-auto max-w-[11/12]">
            {children}
        </div>
    )
}