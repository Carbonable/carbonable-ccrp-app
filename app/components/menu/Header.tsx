export default function Header() {
    
    return (
        <div className="w-full md:w-11/12 mx-auto sticky top-0 z-10">
            <div className="w-full flex items-center justify-between bg-neutral-800/80 backdrop-blur-sm p-4">
                <div className="">
                    <img src="/assets/images/logo.svg" alt="Carbonable logo" className="w-32 md:w-48" />
                </div>
            </div>
        </div>
    )
}