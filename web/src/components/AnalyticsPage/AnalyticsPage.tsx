import React from "react";
import {getCampaigns} from "../../data/campaign.ts";
import {getByCampaign} from "../../data/scan.ts";
import styles from "./AnalyticsPage.module.css";
import ViewDistributionChart from "./ViewDistributionChart.tsx";
import WeekScanFrequency from "./WeekScanFrequency.tsx";
import PosterRankings from "./PosterRankings.tsx";
import PosterMap from "./PosterMap.tsx";

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
        <div className={styles.pageWrapper}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.mainPageWrapper}>
                <select
                    id="campaign-select"
                    className={styles.campaignSelect}
                    value={selectedCampaign}
                    onChange={(event) => setSelectedCampaign(event.target.value)}
                >
                    <option value="" disabled>
                        Select a campaign...
                    </option>

                    {campaignsData.map((c: any) => (
                        <option key={c.campaignId} value={c.campaignId}>
                            {c.campaignName}
                        </option>
                    ))}
                </select>
                {selectedCampaignData && <div className={styles.contentWrapper}>

                  <div className={styles.chartWrapper}>
                    <div className={styles.chartTitleWrapper}>
                      <h2 className={styles.chartTitle}>Poster View Distribution</h2>
                    </div>
                    <div className={styles.chart}>
                      <ViewDistributionChart selectedCampaignData={selectedCampaignData}/>
                    </div>
                  </div>
                  <div className={styles.chartWrapper}>
                    <div className={styles.chartTitleWrapper}>
                      <h2 className={styles.chartTitle}>Scans Per Day</h2>
                    </div>
                    <WeekScanFrequency selectedCampaignData={selectedCampaignData}/>
                  </div>
                  <div className={styles.chartWrapper}>
                    <div className={styles.chartTitleWrapper}>
                      <h2 className={styles.chartTitle}>Poster Rankings</h2>
                    </div>
                    <PosterRankings selectedCampaignData={selectedCampaignData}/>
                  </div>

                  <div className={styles.chartWrapper}>
                    <div className={styles.chartTitleWrapper}>
                      <h2 className={styles.chartTitle}>Poster Locations</h2>
                    </div>
                    <PosterMap selectedCampaignData={selectedCampaignData}/>
                  </div>

                </div>}
            </div>

        </div>
    )
}

export default AnalyticsPage;
