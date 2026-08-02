import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function ViewDistributionChart({selectedCampaignData}:{selectedCampaignData:any}) {
    if(selectedCampaignData===null) return;
    const frequencyMap = new Map<number, number>();

    selectedCampaignData.posters.forEach((poster: any) => {
        const views = poster.scans.length;
        frequencyMap.set(
            views,
            (frequencyMap.get(views) ?? 0) + 1
        );
    });

    const chartData = [...frequencyMap.entries()]
        .map(([views, posters]) => ({
            views,
            posters,
        }))
        .sort((a, b) => a.views - b.views);

    if(chartData.length==0) return;
    return (

        <ResponsiveContainer height={chartData.length * 40 + 50} width="100%">
            <BarChart
                data={chartData}
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