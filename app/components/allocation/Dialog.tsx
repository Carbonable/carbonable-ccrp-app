import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { GreenButton } from "../common/Buttons";

export const enum AssetsManagementContext {
    DEPOSIT = "Deposit",
    WITHDRAW = "Withdraw",
    CLAIM = "Claim",
}

export const enum AssetsManagementTabs {
    YIELD = "Yield",
    OFFSET = "Offset",
}

export default function AllocationDialog({isOpen, setIsOpen, allocation}: 
    {isOpen: boolean, setIsOpen: (b: boolean) => void, allocation: any}) {
    

    const [hasErrror, setHasError] = useState(false);
    const handleClose = () => {
        setIsOpen(false);
    }

    const handleAmountChange = (e: any) => {
        console.log(e.target.value);
        setHasError(false);
    }

    const handleSetMax = () => {
        console.log("set max");
    }

    const handleAction = () => {
        console.log("action");
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-light-80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md xl:max-w-xl transform overflow-hidden rounded-2xl border border-neutral-500 bg-neutral-700 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h3"
                            className="uppercase font-inter text-left text-neutral-300 font-bold text-sm flex items-center justify-between border-b border-neutral-500 px-6 py-4"
                        >
                            <div>Add allocation</div>
                            <div className="text-right"><XMarkIcon className="w-4 cursor-pointer hover:text-neutral-100" onClick={() => setIsOpen(false)} /> </div>
                        </Dialog.Title>
                        <div className="px-6">
                            <div className="text-center w-full mx-auto mt-8">
                                <div className="relative w-full">
                                <   div className={`relative w-full rounded-2xl py-4 px-6 text-left font-inter border border-opacityLight-10 bg-allocation`}>
                                        <div className="text-lg uppercase text-neutral-300">Business unit</div>
                                        <div className="text-sm font-thin text-neutral-100 mt-4">Actuals: TBD &nbsp; Target: TBD</div>
                                    </div>
                                    <div className="mt-8 flex items-center justify-between font-light">
                                        <div className="text-left text-neutral-200 uppercase">Select Amount</div>
                                        <div className="text-right text-neutral-200 uppercase">Available <span className="text-neutral-50 font-bold ml-1">TBD Units</span></div>
                                    </div>
                                    <div className="mt-1 w-full relative">
                                        <input className={`bg-neutral-800 text-left outline-0 border border-opacityLight-10 px-3 py-3 rounded-xl w-full focus:border-neutral-300 ${hasErrror ? "border-red-500 focus:border-red-500" : ""}`} type="number" value="" name="amount" aria-label="Amount" onChange={handleAmountChange} />
                                        <div className="absolute right-4 top-3 text-neutral-300 cursor-pointer font-bold font-sm" onClick={handleSetMax}>MAX</div>
                                    </div>
                                    <div className="mt-8 px-8 py-6 bg-neutral-800 rounded-xl border border-opacityLight-10 text-left text-sm">
                                        Carbon units will be allocated to this business unit on a fifo basis, based on target and other business units allocations.
                                    </div>
                                    <div className="w-full text-right my-8">
                                        <GreenButton className={`w-fit ${hasErrror ? "cursor-not-allowed bg-greenish-500/50 text-neutral-300 hover:bg-greenish-500/50" : ""}`} onClick={handleAction} disabled={hasErrror}>Allocate</GreenButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
            </Dialog>
      </Transition>
    )
}