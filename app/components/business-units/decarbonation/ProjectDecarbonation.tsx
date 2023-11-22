import { useQuery } from "@apollo/client";
import { GET_PROJECTED_DECARBONATION } from "~/graphql/queries";
import { ProjectedDecarbonationViewType, type ProjectedDecarbonationGraph } from "~/graphql/__generated__/graphql";
import { Bar, CartesianGrid, Cell, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";
import ErrorReload from "../../common/ErrorReload";
import { CustomLegend } from "../../common/CustomGraphLegend";

export default function ProjectDecarbonation({ isFullScreen}: { isFullScreen: boolean }) {
    const { loading, error, data, refetch } = useQuery(GET_PROJECTED_DECARBONATION, {
        variables: {
            viewType: ProjectedDecarbonationViewType.OffsetType
        }
    });
    
    const [bar1Name, setBar1Name] = useState('Ex Post');
    const [bar2Name, setBar2Name] = useState('Ex Ante');

    const [legendPayload, setLegendPayload] = useState([
        {
            name: "Emissions",
            color: "#334566",
        },
        {
            name: bar1Name,
            color: "#046B4D",
        },
        {
            name: bar2Name,
            color: "#06A475",
        },
        {
            name: "Target",
            color: "#D0D1D6",
        }
    ]);   

    if (error) {
        console.error(error);
    }

    const refetchData = () => {
        refetch();
    }

    const handleChange = (event: any) => {
        const value = event.target.value;
        switch (value) {
            case ProjectedDecarbonationViewType.OffsetType:
                setBar1Name('Ex Post');
                setBar2Name('Ex Ante');
                break;
            case ProjectedDecarbonationViewType.InvestmentType:
                setBar1Name('Forward Finance');
                setBar2Name('Direct Purchase');
                break;
            case ProjectedDecarbonationViewType.ProjectType:
                setBar1Name('REDD+');
                setBar2Name('ARR');
                break;
        }
        refetch({
            viewType: value
        });
    }

    useEffect(() => {
        setLegendPayload([
            {
                name: "Emissions",
                color: "#334566",
            },
            {
                name: bar1Name,
                color: "#046B4D",
            },
            {
                name: bar2Name,
                color: "#06A475",
            },
            {
                name: "Target",
                color: "#D0D1D6",
            }
        ]);
    }, [bar1Name, bar2Name]);

    const options = [
        {
            key: ProjectedDecarbonationViewType.OffsetType,
            value: 'Offset type'
        },
        {
            key: ProjectedDecarbonationViewType.InvestmentType,
            value: 'Investment type'
        },
        {
            key: ProjectedDecarbonationViewType.ProjectType,
            value: 'Project type'
        }
    ];

    const projectedDecarbonation: ProjectedDecarbonationGraph[] = data?.getProjectedDecarbonation;

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
                <div className="px-8 pt-4 pb-4 bg-neutral-700 font-inter rounded-lg text-xs font-extralight text-center text-neutral-100">
                    <p>{`Carbon emission: ${payload[0].value}kt`}</p>
                    <p>{`CO² contribution: ${parseInt(payload[1].value + payload[2].value)}kt`}</p>
                    <p>{`Neutrality: ${payload[3].value}%`}</p>
                </div>
            );
        }
      
        return null;
    };
    return (
        <div className={`w-full px-0 mt-8 h-full`}>
            <div className="w-fit mt-2 mb-12 ml-2">
                <div className="text-neutral-300 font-inter font-medium ml-1 text-sm">View type:</div>
                <div className="relative w-full border border-neutral-500 bg-opacityLight-10 rounded-lg pl-4 pr-2 py-1 mt-1 focus:border-neutral-300">
                    <select 
                        id="viewType" 
                        className="text-neutral-100 outline-0 w-full bg-transparent cursor-pointer" 
                        style={{ WebkitPaddingEnd: '20px'}} 
                        name="viewType" 
                        placeholder="Offset type"
                        onChange={handleChange}
                    >
                        {options.map((option: {key: ProjectedDecarbonationViewType, value: string}, index: number) => {
                            return (
                                <option key={index} value={option.key}>{option.value}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%" aspect={2.2}>
                <ComposedChart
                    width={300}
                    height={300}
                    data={projectedDecarbonation}
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
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" label={{ value: 'Kilo t', angle: -90, position: 'insideLeft' }}  />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Target (%)', angle: 90, position: 'insideRight' }} domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    {!isFullScreen && <Legend /> }
                    <Bar dataKey="emissions" name="Emission" yAxisId="left" barSize={10} fill="#334566" radius={[10, 10, 0, 0]} />
                    <Bar dataKey="data[1].value" name={bar1Name} yAxisId="left" stackId="a" barSize={10} fill="#046B4D">
                        {projectedDecarbonation.map((entry: any, index: number) => {
                            return (
                                // @ts-ignore
                                <Cell key={`cell-${index}`} radius={entry.data[0].value === 0 ? [10, 10, 0, 0] : undefined} />
                            );
                        })}
                    </Bar>
                    <Bar dataKey="data[0].value" name={bar2Name} yAxisId="left" stackId="a" barSize={10} fill="#06A475" radius={[10, 10, 0, 0]} />
                    <Line type="monotone" name="Target" yAxisId="right" dataKey="target" stroke="#D0D1D6" strokeWidth={2} dot={false} activeDot={false} />
                </ComposedChart>
            </ResponsiveContainer>
            <div className="text-neutral-300 text-sm lg:text-lg font-inter text-center w-fit mx-auto md:mt-2 lg:mt-0">
                <CustomLegend payload={legendPayload} />
            </div>
        </div>
    )
}