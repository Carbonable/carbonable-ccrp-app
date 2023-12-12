import { useQuery } from "@apollo/client";
import ProjectAssetsAllocationComponent from "~/components/common/allocation/ProjectAssetsAllocationComponent";
import { GET_PROJECT_ALLOCATIONS } from "~/graphql/queries/allocation";


export default function BusinessUnitsAllocationTable({ projectId }: { projectId: string }) {
    const { loading, error, data, refetch } = useQuery(GET_PROJECT_ALLOCATIONS, {
        variables: {
            id: projectId,
        }
    });

    const refetchData = () => {
        refetch({
            id: projectId,
        });
    }


    return <ProjectAssetsAllocationComponent 
        loading={loading}
        error={error}
        data={data}
        refetch={refetchData}
    />
}
