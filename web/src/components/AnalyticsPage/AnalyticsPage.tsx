import React from "react";
import {getCampaigns} from "../../data/campaign.ts";
import {getByCampaign} from "../../data/scan.ts";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
function AnalyticsPage() {
    const [campaignsData, setCampaignsData] = React.useState<any>([]);
    const [selectedCampaign, setSelectedCampaign] = React.useState<any>("");
    React.useEffect(() => {
        getCampaigns()
            // turn campaigns from array into object, keyed by id
            .then(campaignsArray => {
                setCampaignsData(campaignsArray);
                console.log(campaignsArray);
            });
    }, []);
    const [selectedCampaignData, setSelectedCampaignData] = React.useState<any>(null);
    React.useEffect(()=>{
        if(selectedCampaign!=""){
            getByCampaign(selectedCampaign).then(data => {
                setSelectedCampaignData(data);
            })
        }

    },[selectedCampaign]);

    const [posterViewDistribution, setPosterViewDistribution] = React.useState<any>(null);

    React.useEffect(() => {
        if (selectedCampaignData) {
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

            setPosterViewDistribution(chartData);
        }
    }, [selectedCampaignData]);


    return (
        <>
            <select
                id="campaign-select"
                value={selectedCampaign}
                onChange={(event) => setSelectedCampaign(event.target.value)}
            >
                <option value="" disabled>
                    Select a campaign...
                </option>

                {campaignsData.map((c:any) => (
                    <option key={c.campaignId} value={c.campaignId}>
                        {c.campaignName}
                    </option>
                ))}
            </select>
            {selectedCampaignData &&
              <div>
                {selectedCampaignData.posters.map((poster: any) => (
                    <p key={poster.link_uuid}>{poster.link_uuid} : {poster.scans.length}</p>
                ))}
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={posterViewDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                      dataKey="views"
                      label={{
                          value: "Views",
                          position: "insideBottom",
                          offset: -5
                      }}
                    />

                    <YAxis
                      allowDecimals={false}
                      label={{
                          value: "Number of Posters",
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
                </ResponsiveContainer>
              </div>
            }
        </>
    )
}

export default AnalyticsPage;
