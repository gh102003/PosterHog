import { useEffect, useState } from "react";
import { createCampaign, getCampaigns, type CampaignType } from "../../data/campaign"
import Campaign from "../Campaign/Campaign";
import styles from "./CampaignPage.module.css"
import { createPosters } from "../../data/poster";
import { CreateCampaign } from "../CreateCampaign/CreateCampaign";
import { DistributePosters } from "../DistributePosters/DistributePosters";


function CampaignPage() {

    const [campaigns, setCampaigns] = useState<Record<number, CampaignType> | null>(null);
    const [disributingCampaignId, setDistributingCampaignId] = useState<number | null>(null);

    // Load the campaigns
    useEffect(() => {
        getCampaigns()
            // turn campaigns from array into object, keyed by id
            .then(campaignsArray => {
                console.log({campaignsArray});
                const campaignsObj = Object.fromEntries(campaignsArray.map(c => [c.campaignId, c]));
                setCampaigns(campaignsObj);
            });
    }, []);

    if (campaigns && disributingCampaignId !== null) {
        return <DistributePosters campaign={campaigns[disributingCampaignId]}/>;
    }

    return (
        <div className={styles.wrapper}>
            <h1>Campaigns</h1>
            <CreateCampaign handleSubmit={async (name, destination) => {
                const createdCampaign = await createCampaign(name, destination);
                setCampaigns({...campaigns, [createdCampaign.campaignId]: createdCampaign})
            }}/>
            <div className={styles.campaignWrapper}>
                {campaigns ?
                    Object.values(campaigns).map(c => (
                        <Campaign
                            key={c.campaignId}
                            campaign={c}
                            handleAddPosters={async () => {
                                // Update the value of 'campaigns' state
                                const newPosters = await createPosters(c.campaignId, 1);
                                const updatedCampaign = {...c, posters: [...c.posters, ...newPosters]};
                                setCampaigns({...campaigns, [c.campaignId]: updatedCampaign});
                            }}
                            handleStartDistributing={() => setDistributingCampaignId(c.campaignId)}
                        />
                    ))
                    :
                    <p>Loading campaigns...</p>
                }
            </div>
        </div>
    )
}

export default CampaignPage
