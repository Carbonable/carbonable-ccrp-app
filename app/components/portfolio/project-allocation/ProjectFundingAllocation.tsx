import { useQuery } from "@apollo/client";
import CompanyAssetsAllocationComponent from "~/components/common/allocation/CompanyAssetsAllocationComponent";
import { GET_COMPANY_ALLOCATIONS } from "~/graphql/queries/allocation";
import { CARBONABLE_COMPANY_ID } from "~/utils/constant";

export default function ProjectFundingAllocation() {
    const { loading, error, data, refetch } = useQuery(GET_COMPANY_ALLOCATIONS, {
        variables: {
            id: CARBONABLE_COMPANY_ID,
        }
    });

    const refetchData = () => {
        refetch({
            id: CARBONABLE_COMPANY_ID,
        });
    }


    return <CompanyAssetsAllocationComponent
        loading={loading}
        error={error}
        data={data}
        refetch={refetchData}
    />
}
