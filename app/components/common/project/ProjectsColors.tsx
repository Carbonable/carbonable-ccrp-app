import type { ProjectColorRepartition } from "~/graphql/__generated__/graphql";
import { SmallTitle } from "../Title";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { CustomLegend } from "../CustomGraphLegend";
import { getNumericPercentage } from "~/utils/utils";

export default function ProjectsColors({ colors }: { colors: ProjectColorRepartition }) {

    const legendPayload = [
        {   
            type: "green",
            name: "Forest & Wetland",
            color: "#1B6B49",
        },
        {
            type: "blue",
            name: "Coasts & Submarine",
            color: "#334566",
        },
        {
            type: "orange",
            name: "Agro & Soil",
            color: "#CFBD70",
        }
    ]

    const newColors = { ...colors };
    delete newColors.__typename;
    const filteredNewColors = Object.assign(newColors);
    // Convert the colors object into an array
    const transformedColors = Object.keys(newColors).map((colorName: string) => (
        {
            name: colorName,
            value: getNumericPercentage(filteredNewColors[colorName].value),
            color: legendPayload.filter((legend) => legend.type === colorName)[0].color,
        }
    
    ));

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        
        return (
            <text x={x} y={y} fill="white" textAnchor={'middle'} dominantBaseline="central" className="text-sm">
            {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return  (
        <div>
            <SmallTitle title="Projects Colors" />
            <div className="w-full h-full md:mt-4">
                <ResponsiveContainer width="100%" aspect={1}>
                    <PieChart>
                        <Pie
                            data={transformedColors}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={110}
                            innerRadius={60}
                            dataKey="value"
                        >
                            {transformedColors.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="text-neutral-300 text-sm lg:text-lg font-inter text-center w-fit mx-auto md:mt-2 lg:mt-0">
                    <CustomLegend payload={legendPayload} />
                </div>
            </div>
        </div>
    )
}
