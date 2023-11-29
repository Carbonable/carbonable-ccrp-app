import SecondaryButton from "~/components/common/Buttons";
import Block from "./Block";
import { useQuery } from "@apollo/client";
import { BUSINESS_UNITS } from "~/graphql/queries/business-units";
import type { BusinessUnit } from "~/graphql/__generated__/graphql";
import ErrorReload from "~/components/common/ErrorReload";

export default function DecarbonizationMap() {
    const { loading, error, data, refetch } = useQuery(BUSINESS_UNITS);

    if (error) {
        console.error(error);
    }

    const businessUnits: BusinessUnit[] = data?.businessUnits;

    const handleAddBlock = () => {
        console.log('add block');
    }

    if (loading) return (
        <BusinessUnitWrapper>
            <div className="border border-neutral-700 w-full p-4 xl:p-8 rounded-3xl cursor-pointer animate-pulse bg-opacityLight-5"></div>
        </BusinessUnitWrapper>
    )

    if (error) return (
        <BusinessUnitWrapper>
            <ErrorReload refetchData={refetch} />
        </BusinessUnitWrapper>
    )

    if (businessUnits.length === 0) return (
        <BusinessUnitWrapper>
            No business unit found
        </BusinessUnitWrapper>
    )

    return (
        <BusinessUnitWrapper displayButton={true} buttonAction={handleAddBlock}>
            {businessUnits.map((businessUnit: BusinessUnit, idx: number) => (
                <a key={`block_${idx}`} href={`/businessunit/${idx}`} className="outline-none">
                    <Block block={businessUnit} />
                </a>
            ))}
        </BusinessUnitWrapper>
    )
}

function BusinessUnitWrapper({ displayButton, buttonAction, children }: { displayButton?: boolean, buttonAction?: any ,children?: any }) {
    return (
        <>
            <div className="flex justify-between items-center flex-wrap">
                <div className="font-extrabold text-neutral-100 text-lg uppercase w-full md:w-fit">
                    Decarbonization map
                </div>
                { displayButton && 
                    <div className="text-right w-full mt-4 md:w-fit">
                        <SecondaryButton onClick={buttonAction}>Add block</SecondaryButton>
                    </div>
                }
            </div>
            <div className="mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-4">
                    {children}
                </div>
            </div>
        </>
    )
}