import { useQuery } from "@apollo/client";
import { ANNUAL } from "~/graphql/queries/net-zero";
import { CARBONABLE_COMPANY_ID, RESULT_PER_PAGE } from "~/utils/constant";
import ProjectDecarbonationTableComponent from "~/components/common/net-zero/ProjectDecarbonationTable";
import { useEffect, useState } from "react";

export default function ProjectDecarbonationTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading, error, data, refetch } = useQuery(ANNUAL, {
        variables: {
            view: {
                company_id: CARBONABLE_COMPANY_ID
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
                company_id: CARBONABLE_COMPANY_ID
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
