import { useQuery } from "@apollo/client";
import type { GlobalData } from "~/graphql/__generated__/graphql";
import { GET_GLOBAL_DATA } from "~/graphql/queries/net-zero";
import GlobalDataComponent from "../../common/global-data/GlobalData";


export default function GlobalData() {
    const { loading, error, data, refetch } = useQuery(GET_GLOBAL_DATA);

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    return <GlobalDataComponent loading={loading} error={error} data={data} refetch={refetchData} />
}