import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ANNUAL } from "~/graphql/queries/net-zero";
import { RESULT_PER_PAGE } from "~/utils/constant";
import ProjectDecarbonationTableComponent from "./ProjectDecarbonationTableComponent";

export default function ProjectDecarbonationTable({ projectId }: { projectId: string }) {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(ANNUAL, {
        variables: {
            view: {
                project_id: projectId
            },
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        }
    });

    const refetchData = () => {
        refetch({
            view: {
                project_id: projectId
            },
            pagination: {
                page: currentPage,
                count: RESULT_PER_PAGE
            }
        });
    }

    useEffect(() => {
        refetchData();
    }, [currentPage]);

    return (
        <ProjectDecarbonationTableComponent
            loading={loading}
            error={error}
            data={data}
            refetchData={refetchData}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage} 
        />
    )
}
