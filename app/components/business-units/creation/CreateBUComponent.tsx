import { useState } from "react";
import CreateButton from "./CreateButton";

export default function CreateBUComponent({ setIsOpen, refetch }: { setIsOpen: (b: boolean) => void, refetch: () => void}) {
    const [buName, setBuName] = useState("");
    const [buDescription, setBuDescription] = useState("");
    const [buMetadata, setBuMetadata] = useState("");

    return (
        <div className="px-6">
            <div className="text-left w-full mx-auto mt-8">
                <div className="mt-1 w-full relative">
                    <label className="text-left text-neutral-100 pl-1 text-sm leading-tight uppercase">Name</label>
                    <input 
                        className={`bg-opacityLight-5 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300`} 
                        type="text" 
                        value={buName} 
                        name="buName" 
                        aria-label="Name" 
                        placeholder="Enter business unit name"
                        onChange={(e) => setBuName(e.target.value)} 
                    />
                </div>
                <div className="mt-4 w-full relative">
                    <label className="text-left text-neutral-100 pl-1 text-sm leading-tight uppercase">Description</label>
                    <input 
                        className={`bg-opacityLight-5 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300`} 
                        type="text" 
                        value={buDescription} 
                        name="buDescription" 
                        aria-label="Description" 
                        placeholder="Enter business unit description"
                        onChange={(e) => setBuDescription(e.target.value)} 
                    />
                </div>
                <div className="mt-4 w-full relative">
                    <label className="text-left text-neutral-100 pl-1 text-sm leading-tight uppercase">Metadata</label>
                    <input 
                        className={`bg-opacityLight-5 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300`} 
                        type="text" 
                        value={buMetadata} 
                        name="buMetadata" 
                        aria-label="Metadata" 
                        placeholder="key-value (eg. type-usine, color-red)"
                        onChange={(e) => setBuMetadata(e.target.value)} 
                    />
                </div>
                <div className="w-full text-right my-8">
                    <CreateButton
                        setIsOpen={setIsOpen}
                        buName={buName}
                        buDescription={buDescription}
                        buMetadata={buMetadata}
                        hasError={false}
                        refetch={refetch}
                    />
                </div>
            </div>
        </div>
    )
}