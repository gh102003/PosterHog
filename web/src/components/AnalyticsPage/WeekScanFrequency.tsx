import {
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    LineChart,
    Line
} from "recharts";

function WeekScanFrequency({selectedCampaignData}:{selectedCampaignData:any}) {
    if(selectedCampaignData === null) return null;

    const dayFrequencyMap = {
        mon: 0,
        tue: 0,
        wed: 0,
        thur: 0,
        fri: 0,
        sat: 0,
        sun: 0,
    };



    for (const poster of selectedCampaignData.posters) {
        for (const scan of poster.scans) {
            const date = new Date(scan.time_scanned);
            const days = [
                "sun",
                "mon",
                "tue",
                "wed",
                "thur",
                "fri",
                "sat"
            ];

            const dayName = days[date.getUTCDay()] as keyof typeof dayFrequencyMap;
            dayFrequencyMap[dayName] += 1;
        }
    }

    const chartData = Object.entries(dayFrequencyMap).map(([day, scans]) => ({
        day,
        scans
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="day"
                />

                <YAxis
                    allowDecimals={false}
                />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="scans"
                    stroke="#8884d8"
                    strokeWidth={2}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default WeekScanFrequency;