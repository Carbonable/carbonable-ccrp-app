import ErrorReload from "../../common/ErrorReload";
import { type NetZeroPlanning } from "~/graphql/__generated__/graphql";
import { Bar, Brush, CartesianGrid, Cell, ComposedChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import { CustomLegend } from "../../common/CustomGraphLegend";
import Title from "~/components/common/Title";

export default function ProjectDecarbonationComponent({ isFullScreen, loading, error, data, refetch }: { isFullScreen: boolean, loading: boolean, error: any, data: any, refetch: any }) {
    
    const [bar1Name] = useState('Ex Post');
    const [bar2Name] = useState('Ex Ante');

    const [legendPayload, setLegendPayload] = useState([
        {
            name: 'Ex Post',
            color: "#046B4D",
        },
        {
            name: 'Ex Ante',
            color: "#06A475",
        },
        {
            name: "Retired",
            color: "#0E3725",
        }
    ]);   

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    useEffect(() => {
        setLegendPayload([
            {
                name: bar1Name,
                color: "#046B4D",
            },
            {
                name: bar2Name,
                color: "#06A475",
            },
            {
                name: "Retired",
                color: "#0E3725",
            }
        ]);
    }, [bar1Name, bar2Name]);

    const netZeroPlanning: NetZeroPlanning[] = data?.netZeroPlanning;

    if (loading) {
        return (
            <div className="mt-12 w-full">
                Loading charts ...
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-12 w-full">
                <ErrorReload refetchData={refetchData} />
            </div>
        )
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="px-8 pt-4 pb-4 bg-neutral-700 font-inter rounded-lg text-xs font-extralight text-left text-neutral-100">
                    <p>{`Year: ${label}`}</p>
                    <p>{`Ex-ante: ${payload[1].value} t`}</p>
                    <p>{`Ex-post: ${payload[0].value} t`}</p>
                    <p>{`Retired: ${parseInt(payload[2].value)}t`}</p>
                </div>
            );
        }
      
        return null;
    }

    return (
        <div className={`w-full px-0 mt-8 h-full`}>
            <Title title="Net Zero planning" />
            <ResponsiveContainer width="100%" height="100%" aspect={2.2}>
                <ComposedChart
                    width={300}
                    height={300}
                    data={netZeroPlanning}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    style={{
                        fontSize: '14px',
                        fontFamily: 'Inter',
                    }}
                >
                    <CartesianGrid stroke="#2B2E36" />
                    <XAxis dataKey="vintage" />
                    <YAxis yAxisId="left" label={{ value: 'Tons', angle: -90, position: 'insideLeft' }}  />
                    <Tooltip content={<CustomTooltip />} />
                    {!isFullScreen && <Legend /> }
                    <Bar dataKey="ex_post_count" name={bar1Name} yAxisId="left" stackId="a" fill="#046B4D">
                        {netZeroPlanning.map((entry: any, index: number) => {
                            return (
                                // @ts-ignore
                                <Cell key={`cell-${index}`} radius={entry.ex_ante_count === 0 ? [10, 10, 0, 0] : undefined} />
                            );
                        })}
                    </Bar>
                    <Bar dataKey="ex_ante_count" name={bar2Name} yAxisId="left" stackId="a" fill="#06A475" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="retired" name="Retired" yAxisId="left" fill="#0E3725" radius={[10, 10, 0, 0]} />
                    <Brush dataKey="vintage" height={30} stroke="#878A94" fill="#1F2128" />
                </ComposedChart>
            </ResponsiveContainer>
            <div className="text-neutral-300 text-sm lg:text-lg font-inter text-center w-fit mx-auto md:mt-2">
                <CustomLegend payload={legendPayload} />
            </div>
        </div>
    )
}