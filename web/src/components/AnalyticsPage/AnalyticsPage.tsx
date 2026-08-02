import React from "react";
import {getCampaigns} from "../../data/campaign.ts";
import {getByCampaign} from "../../data/scan.ts";
import styles from "./AnalyticsPage.module.css";
import ViewDistributionChart from "./ViewDistributionChart.tsx";


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
            <div className={styles.chartWrapper}>
                {<ViewDistributionChart selectedCampaignData={selectedCampaignData} />}
            </div>
        </>
    )
}

export default AnalyticsPage;
