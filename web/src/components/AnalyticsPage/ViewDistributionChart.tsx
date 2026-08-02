import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function ViewDistributionChart({posterViewDistribution}) {
    if(posterViewDistribution===null || posterViewDistribution.length==0) return;
    return (

        <ResponsiveContainer height={posterViewDistribution.length * 40 + 50}>
            <BarChart
                data={posterViewDistribution}
                layout="vertical"
            >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    type="number"
                    allowDecimals={false}
                    label={{
                        value: "Number of Posters",
                        position: "insideBottom",
                        offset: -5
                    }}
                />

                <YAxis
                    type="category"
                    dataKey="views"
                    label={{
                        value: "Views",
                        angle: -90,
                        position: "insideLeft"
                    }}
                />

                <Tooltip />

                <Bar
                    dataKey="posters"
                    fill="#8884d8"
                />
            </BarChart>
        </ResponsiveContainer>)
}

export default ViewDistributionChart;