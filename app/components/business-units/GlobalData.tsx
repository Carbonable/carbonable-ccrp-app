import { useQuery } from "@apollo/client";
import type { GlobalData } from "~/graphql/__generated__/graphql";
import { GET_GLOBAL_DATA } from "~/graphql/queries/net-zero";
import GlobalDataComponent from "../common/global-data/GlobalData";


export default function GlobalData({businessUnitId}: { businessUnitId: string}) {
    const { loading, error, data, refetch } = useQuery(GET_GLOBAL_DATA, {
        variables: {
            view: {
                business_unit_id: businessUnitId
            }
        }
    
    });

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch({
            view: {
                business_unit_id: businessUnitId
            }
        });
    }

    return <GlobalDataComponent loading={loading} error={error} data={data} refetch={refetchData} />
}