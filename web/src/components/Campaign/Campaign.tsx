import { Collapsible } from "radix-ui";
import styles from "./Campaign.module.css"
import QRCodeItem from "../QRCodeItem";
import type { CampaignType } from "../../data/campaign";

type CampaignProps = {
    campaign: CampaignType
    handleAddPosters: (count: number) => Promise<void>
}

export default function Campaign({ campaign, handleAddPosters }: CampaignProps) {
    return (
        <Collapsible.Root>
            <Collapsible.Trigger className={styles.campaignTitle}>{campaign.campaignName}</Collapsible.Trigger>
            <Collapsible.Content className={styles.campaignContent}>
                <div className={styles.qrCodesWrapper}>
                    {campaign.posters.map((poster, i) => (
                        <QRCodeItem poster={poster} campaign={campaign} key={i} />
                    ))}
                    <button onClick={() => handleAddPosters(1)} className={styles.generateNewQrButton}>+</button>
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}