import { useQuery } from '@apollo/client';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Fragment, useEffect } from 'react';
import type { BusinessUnit } from '~/graphql/__generated__/graphql';
import { BUSINESS_UNITS } from '~/graphql/queries/business-units';

export default function BUList({selectedBU, setSelectedBU}: { selectedBU: BusinessUnit | undefined, setSelectedBU: (project: BusinessUnit) => void}) {
    const { loading, error, data } = useQuery(BUSINESS_UNITS);

    if (error) {
        console.error(error);
    }

    const businessUnits: BusinessUnit[] = data?.businessUnits;

    useEffect(() => {
        if (businessUnits && businessUnits.length > 0) {
            setSelectedBU(businessUnits[0]);
        }
    }, [businessUnits]);

    if (loading || !selectedBU) {
        return (
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    Loading...
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="text-left text-neutral-200 uppercase mb-2 font-light">Select business unit</div>
            <Listbox value={selectedBU} onChange={setSelectedBU}>
            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-opacityLight-5 py-3 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
                <span className="block truncate">{selectedBU.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                />
                </span>
            </Listbox.Button>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-600 py-2 text-base shadow-lg ring-1 ring-neutral-700 focus:outline-none sm:text-sm z-10">
                {businessUnits.map((bu: BusinessUnit) => (
                    <Listbox.Option
                    key={bu.id}
                    className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 text-left ${
                        active ? 'bg-neutral-500 text-neutral-300' : 'text-neutral-300'
                        }`
                    }
                    value={bu}
                    >
                    {({ selected }) => (
                        <>
                        <span
                            className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                            {bu.name}
                        </span>
                        {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-300">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        ) : null}
                        </>
                    )}
                    </Listbox.Option>
                ))}
                </Listbox.Options>
            </Transition>
            </Listbox>
        </>
        
      )
}