import { useQuery } from "@apollo/client";
import { GET_BU_ALLOCATIONS } from "~/graphql/queries/allocation";
import BUAssetsAllocationComponent from "../common/allocation/BUAssetsAllocationComponent";
import { useEffect, useState } from "react";
import { RESULT_PER_PAGE } from "~/utils/constant";

export default function ProjectFundingAllocation({ businessUnitId }: { businessUnitId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_BU_ALLOCATIONS, {
        variables: {
            id: businessUnitId,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        }
    });

    const refetchData = () => {
        refetch({
            id: businessUnitId,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);


    return <BUAssetsAllocationComponent 
        loading={loading}
        error={error}
        data={data}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        refetchData={refetchData}
    />
}
