import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProjectAssetsAllocationComponent from "~/components/common/allocation/ProjectAssetsAllocationComponent";
import { GET_PROJECT_ALLOCATIONS } from "~/graphql/queries/allocation";
import { RESULT_PER_PAGE } from "~/utils/constant";


export default function ProjectAllocationTable({ projectId }: { projectId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(GET_PROJECT_ALLOCATIONS, {
        variables: {
            id: projectId,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        }
    });

    const refetchData = () => {
        refetch({
            id: projectId,
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);

    return <ProjectAssetsAllocationComponent 
        loading={loading}
        error={error}
        data={data}
        refetchData={refetchData}
        setCurrentPage={setCurrentPage}
    />
}
