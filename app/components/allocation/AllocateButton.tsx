import { useMutation } from "@apollo/client";
import { GreenButton } from "../common/Buttons";
import { CREATE_ALLOCATION } from "~/graphql/queries/allocation";
import { useEffect } from "react";

export default function AllocateButton({ businessUnitId, projectId, amount, setIsOpen, hasError }: { businessUnitId: string | undefined | any, projectId: string | undefined, amount: number, setIsOpen: (b: boolean) => void, hasError: boolean }) {
    
    const [createAllocation, { loading, error, data }] = useMutation(CREATE_ALLOCATION);

    const handleAction = async () => {
        try {
          // Execute the mutation function with the input variable
            const result = await createAllocation({
                variables: {
                    request: {
                        project_id: projectId,
                        business_unit_id: businessUnitId,
                        amount: parseInt(amount.toString())
                    }
                }
            });
    
            // Handle the result as needed
            console.log('Mutation result:', result);
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
        <GreenButton className={`w-fit ${hasError || !businessUnitId || !projectId ? "cursor-not-allowed bg-greenish-500/50 text-neutral-300 hover:bg-greenish-500/50" : ""}`} onClick={handleAction} disabled={hasError}>Allocate</GreenButton>
    )
}