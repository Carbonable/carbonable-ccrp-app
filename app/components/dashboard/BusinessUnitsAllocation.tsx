import Banner from "./business-units-allocation/Banner";
import DecarbonizationMap from "./business-units-allocation/DecarbonizationMap";

export default function BusinessUnitAllocation() {
    return (
        <>
            <div className="relative mt-4">
                <Banner />
            </div>
            <div className="relative mt-8">
                <DecarbonizationMap />
            </div>
        </>
    )
}