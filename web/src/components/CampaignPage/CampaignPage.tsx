import { useEffect, useState } from "react";
import { getCampaigns, type CampaignType } from "../../data/campaign"
import Campaign from "../Campaign/Campaign";
import styles from "./CampaignPage.module.css"


function CampaignPage() {

    const [campaigns, setCampaigns] = useState<CampaignType[] | null>(null);

    // Load the campaigns
    useEffect(() => {
        getCampaigns().then(setCampaigns);
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.campaignWrapper}>
                {campaigns ? 
                    campaigns.map(c => (
                        <Campaign key={c.campaignId} campaign={c}/>
                    ))
                :
                    <p>Loading campaigns...</p>
                    }
            </div>

        </div>
    )
}

export default CampaignPage
