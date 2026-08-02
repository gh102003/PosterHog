import React from "react";
import {getCampaigns} from "../../data/campaign.ts";
import {getByCampaign} from "../../data/scan.ts";

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
    const [selectedCampaignData, setSelectedCampaignData] = React.useState<any>({posters:[]});
    React.useEffect(()=>{
        if(selectedCampaign!=""){
            getByCampaign(selectedCampaign).then(data => {
                setSelectedCampaignData(data);
                console.log(data);
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
            <div>
                {selectedCampaignData.posters.map((poster:any) => (
                    <p key={poster.link_uuid}>{poster.link_uuid} : {poster.scans.length}</p>
                ))}
            </div>
        </>
    )
}

export default AnalyticsPage
