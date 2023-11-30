export default function DefaultLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="p-4 ml-0 mt-[66px] md:p-8 lg:p-4 lg:mt-0 lg:pl-[222px] lg:mx-auto max-w-full lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
            {children}
        </div>
    )
}