import SecondaryButton from "~/components/common/Buttons";
import Block from "./Block";
import { useMutation, useQuery } from "@apollo/client";
import { BUSINESS_UNITS, CREATE_BUSINESS_UNIT } from "~/graphql/queries/business-units";
import type { BusinessUnit } from "~/graphql/__generated__/graphql";
import ErrorReload from "~/components/common/ErrorReload";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";

export default function DecarbonizationMap() {
    const { loading, error, data, refetch } = useQuery(BUSINESS_UNITS);
    const [createMutation, { loading: loadingMutation, error: errorMutation, data: dataMutation }] = useMutation(CREATE_BUSINESS_UNIT);

    if (error) {
        console.error(error);
    }

    const businessUnits: BusinessUnit[] = data?.businessUnits;

    const handleAddBusinessUnit = async () => {
        try {
          // Execute the mutation function with the input variable
            const result = await createMutation({
                variables: {
                    request: {
                        name: "Usine",
                        description: "usine",
                        metadata:"type-usine,color-red,icon-warehouse",
                        company_id: CARBONABLE_COMPANY_ID,
                        default_forecasted_emission: 1000,
                        default_target: 500
                    }
                }
            });

            refetch();
    
          // Handle the result as needed
          console.log('Mutation result:', result);
        } catch (error) {
          // Handle any errors
          console.error('Mutation error:', error);
        }
    };

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
        <BusinessUnitWrapper displayButton={true} buttonAction={handleAddBusinessUnit}>
            No business unit found
        </BusinessUnitWrapper>
    )

    return (
        <BusinessUnitWrapper displayButton={true} buttonAction={handleAddBusinessUnit}>
            {businessUnits.map((businessUnit: BusinessUnit, idx: number) => (
                <a key={`block_${businessUnit.id}`} href={`/businessunit/${businessUnit.id}`} className="outline-none">
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
                        <SecondaryButton onClick={buttonAction}>Add Business Unit</SecondaryButton>
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