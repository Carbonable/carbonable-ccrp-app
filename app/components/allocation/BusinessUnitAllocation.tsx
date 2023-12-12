import { useQuery } from "@apollo/client";
import { useState } from "react";
import type { Project, BusinessUnit } from "~/graphql/__generated__/graphql";
import { BUSINESS_UNITS_DETAILS } from "~/graphql/queries/business-units";
import { GreenButton } from "../common/Buttons";
import BusinessUnitsData from "./BusinessUnitsData";
import ProjectsList from "./ProjectsList";
import AllocateButton from "./AllocateButton";
import Available from "./Available";

export default function BusinessUnitAllocationDialog({setIsOpen, businessUnitId }: 
    { setIsOpen: (b: boolean) => void, businessUnitId?: string}) {
    
    const [selectedProject, setSelectedProject] = useState<Project|undefined>(undefined);
    const [availableUnits, setAvailableUnits] = useState(0);
    const [amount, setAmount] = useState(0);

    const { loading, error, data } = useQuery(BUSINESS_UNITS_DETAILS, {
        variables: {
            id: businessUnitId
        }
    });

    const businessUnit: BusinessUnit = data?.businessUnitDetails;

    const [hasError, setHasError] = useState(false);

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);
        setHasError(false);
    }

    const handleSetMax = () => {
        setAmount(availableUnits);
    }

    if (loading) {
        return (
            <div className="flex justify-between items-center mt-12 px-4">
                <div className="text-xl uppercase">
                    Loading...
                </div>
                <div className="text-right">
                    <GreenButton disabled={true}>Add allocation</GreenButton>
                </div>
            </div>
        )
    }

    if (error) {
        console.error(error);

        return (
            <div className="flex justify-between items-center mt-12 px-4">
                <div className="text-xl uppercase">
                    Error
                </div>
                <div className="text-right">
                    <GreenButton disabled={true}>Add allocation</GreenButton>
                </div>
            </div>
        )
    }
    
    return (
        <div className="px-6">
            <div className="text-center w-full mx-auto mt-8">
                <div className="relative w-full">
                    <div className={`relative w-full rounded-2xl py-4 px-6 text-left font-inter border border-opacityLight-10 bg-allocation-bu`}>
                        <div className="text-lg uppercase text-neutral-200">{businessUnit.name}</div>
                        <BusinessUnitsData businessUnitId={businessUnitId} loadingBU={loading} />
                    </div>
                    <div className="mt-8">
                        <ProjectsList selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
                    </div>
                    <div className="mt-8 flex items-center justify-between font-light">
                        <div className="text-left text-neutral-200 uppercase">Select Amount</div>
                        <div className="text-right text-neutral-200 uppercase">Available <span className="text-neutral-50 font-bold ml-1"><Available businessUnitId={businessUnitId} projectId={selectedProject?.id} setAvailableUnits={setAvailableUnits} /> Units</span></div>
                    </div>
                    <div className="mt-1 w-full relative">
                        <input className={`bg-opacityLight-5 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300 ${hasError ? "border-red-500 focus:border-red-500" : ""}`} type="number" value={amount} name="amount" aria-label="Amount" onChange={handleAmountChange} />
                        <div className="absolute right-4 top-3 text-neutral-300 cursor-pointer font-bold font-sm" onClick={handleSetMax}>MAX</div>
                    </div>
                    <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">
                        Carbon units will be allocated to this business unit on a fifo basis, based on target and other business units allocations.
                    </div>
                    <div className="w-full text-right my-8">
                        <AllocateButton amount={amount} businessUnitId={businessUnitId} projectId={selectedProject?.id} hasError={hasError} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}