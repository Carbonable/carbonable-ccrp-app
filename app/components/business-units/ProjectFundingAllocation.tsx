import { useQuery } from "@apollo/client";
import { GET_BU_ALLOCATIONS } from "~/graphql/queries/allocation";
import BUAssetsAllocationComponent from "../common/allocation/BUAssetsAllocationComponent";

export default function ProjectFundingAllocation({ businessUnitId }: { businessUnitId: string }) {
    const { loading, error, data, refetch } = useQuery(GET_BU_ALLOCATIONS, {
        variables: {
            id: businessUnitId,
        }
    });

    const refetchData = () => {
        refetch({
            id: businessUnitId,
        });
    }


    return <BUAssetsAllocationComponent 
        loading={loading}
        error={error}
        data={data}
        refetch={refetchData}
    />
}
