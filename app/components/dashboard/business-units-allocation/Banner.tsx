import BannerKPI from "../../common/BannerKPI";

export default function Banner() {
    return (
        <div className="relative w-full border border-neutral-700 bg-planification bg-cover bg-bottom rounded-3xl px-4 py-6 flex items-start justify-start flex-wrap md:p-10 lg:p-12">
            <div className="grid grid-cols-3 gap-3 md:grid-cols-none md:grid-flow-col md:auto-cols-max md:gap-6 xl:gap-16">
                <BannerKPI title="MY Net-zero objective" value={`TBD%`} />
                <BannerKPI title="Missing contributions" value={`t TBD`} />
            </div>
            <img src="/assets/images/common/logo-transparent.svg" alt="Carbonable logo transparent" className="absolute bottom-0 right-12 w-[100px] xl:right-20 lg:w-[110px]" />
        </div>
    )
}