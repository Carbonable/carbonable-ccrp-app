import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { GreenButton } from "~/components/common/Buttons";
import { CREATE_BUSINESS_UNIT } from "~/graphql/queries/business-units";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";

export default function CreateButton({ setIsOpen, buName, buDescription, buMetadata, defaultForecastedEmission, defaultTarget, hasError, refetch }: 
    { setIsOpen: (b: boolean) => void, buName: string, buDescription: string, buMetadata: string, defaultForecastedEmission?: number, defaultTarget?: number, hasError: boolean, refetch: () => void }) {
    
        
    const [createMutation, { loading, error, data }] = useMutation(CREATE_BUSINESS_UNIT);
    
    const handleAddBusinessUnit = async () => {
        try {
            // Execute the mutation function with the input variable
            await createMutation({
                variables: {
                    request: {
                        name: buName,
                        description: buDescription,
                        metadata: buMetadata,
                        company_id: CARBONABLE_COMPANY_ID,
                        default_forecasted_emission: defaultForecastedEmission ?  defaultForecastedEmission : 0,
                        default_target: defaultTarget ? defaultTarget : 0
                    }
                }
            });
    
            refetch();
            setIsOpen(false);
        } catch (error) {
          // Handle any errors
          console.error('Mutation error:', error);
        }
    };
    useEffect(() => {
        if (data) {
            setIsOpen(false);
        }
    }, [data]);

    return (
        <GreenButton className={`w-fit ${hasError ? "cursor-not-allowed bg-greenish-500/50 text-neutral-300 hover:bg-greenish-500/50" : ""}`} onClick={handleAddBusinessUnit} disabled={hasError}>Create</GreenButton>
    )
}