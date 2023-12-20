import { useQuery } from "@apollo/client";
import { useState } from "react";
import type { BusinessUnit, Project } from "~/graphql/__generated__/graphql";
import { GreenButton } from "../common/Buttons";
import AllocateButton from "./AllocateButton";
import { GET_PROJECT_WITHOUT_VINTAGES } from "~/graphql/queries/projects";
import BUList from "./BUList";
import Available from "./Available";

export default function ProjectAllocationDialog({setIsOpen, projectId }:
    { setIsOpen: (b: boolean) => void, projectId?: string}) {
    
    const [selectedBU, setSelectedBU] = useState<BusinessUnit|undefined>(undefined);
    const [availableUnits, setAvailableUnits] = useState(0);
    const [amount, setAmount] = useState(0);

    const { loading, error, data } = useQuery(GET_PROJECT_WITHOUT_VINTAGES, {
        variables: {
            field: "id",
            value: projectId
        }
    });

    const project: Project = data?.projectBy;

    const [hasError, setHasError] = useState(false);

    const handleAmountChange = (e: any) => {
        if (e.target.value > 100) {
            setAmount(100);
            return;
        }

        if (e.target.value < 0) {
            setAmount(0);
            return;
        }
        
        setAmount(e.target.value);
        setHasError(false);
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
                    <div className={`relative w-full rounded-2xl py-4 px-6 text-left font-inter border border-opacityLight-10 bg-allocation-project`}>
                        <div className="text-lg uppercase text-neutral-200">{project.name}</div>
                    </div>
                    <div className="mt-8">
                        <BUList selectedBU={selectedBU} setSelectedBU={setSelectedBU} />
                    </div>
                    <div className="mt-8 font-light">
                        <div className="text-left text-neutral-200 uppercase">Percentage to allocate</div>
                    </div>
                    <div className="mt-1 w-full relative">
                        <input className={`bg-opacityLight-5 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300 ${hasError ? "border-red-500 focus:border-red-500" : ""}`} type="number" value={amount} max={100} name="amount" aria-label="Amount" onChange={handleAmountChange} />
                    </div>
                    <div className="flex items-center mt-1 ml-1 uppercase text-left text-neutral-200 text-xs">
                        <div className="">
                            Available 
                            <span className="text-neutral-50 font-bold ml-1">
                                <Available
                                    businessUnitId={selectedBU?.id}
                                    projectId={project.id}
                                    setAvailableUnits={setAvailableUnits}
                                /> Units
                            </span>
                        </div>
                        <div className="ml-4">
                            To allocate 
                            <span className="text-neutral-50 font-bold ml-1">
                                {amount * availableUnits / 100} Units
                            </span>
                        </div>
                    </div>
                    <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">
                        Carbon units will be allocated to this business unit on a fifo basis, based on target and other business units allocations.
                    </div>
                    <div className="w-full text-right my-8">
                        <AllocateButton amount={amount} businessUnitId={selectedBU?.id} projectId={projectId} hasError={hasError} setIsOpen={setIsOpen} />
                    </div>
                </div>
            </div>
        </div>
    )
}