import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import CompanyAssetsAllocationComponent from "~/components/common/allocation/CompanyAssetsAllocationComponent";
import { GET_COMPANY_ALLOCATIONS } from "~/graphql/queries/allocation";
import { CARBONABLE_COMPANY_ID, RESULT_PER_PAGE } from "~/utils/constant";

export default function ProjectFundingAllocation() {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_COMPANY_ALLOCATIONS, {
        variables: {
            id: CARBONABLE_COMPANY_ID,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        }
    });

    const refetchData = () => {
        refetch({
            id: CARBONABLE_COMPANY_ID,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);
    


    return <CompanyAssetsAllocationComponent
        loading={loading}
        error={error}
        data={data}
        refetchData={refetchData}
        setCurrentPage={setCurrentPage}
    />
}
