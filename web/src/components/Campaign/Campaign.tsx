import { Collapsible } from "radix-ui";
import styles from "./Campaign.module.css"
import QRCodeItem from "../QRCodeItem/QRCodeItem";
import type { CampaignType } from "../../data/campaign";

type CampaignProps = {
    campaign: CampaignType
    handleAddPosters: (count: number) => Promise<void>
    handleStartDistributing: () => void
}

export default function Campaign({ campaign, handleAddPosters, handleStartDistributing }: CampaignProps) {
    return (
        <Collapsible.Root className={styles.campaignWrapper}>
            <Collapsible.Trigger className={styles.campaignTitle}>
                <span className={styles.campaignName}>{campaign.campaignName}</span>
                &nbsp;({campaign.posters.length} poster{campaign.posters.length !== 1 && "s"})
            </Collapsible.Trigger>
            <Collapsible.Content className={styles.campaignContent}>
            <p>These posters link to <a href={campaign.destination} target="_blank" rel="noreferrer">{campaign.destination}</a></p>
                <div className={styles.qrCodesWrapper}>
                    {campaign.posters.map((poster, i) => (
                        <QRCodeItem poster={poster} campaign={campaign} key={i} />
                    ))}
                    <button onClick={() => handleAddPosters(1)} className={styles.generateNewQrButton}>+</button>
                    <button onClick={() => handleStartDistributing()} className={styles.distributeButton}>Distribute posters</button>
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
}