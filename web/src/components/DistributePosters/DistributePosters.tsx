import styles from "./DisributePosters.module.css"
import type { CampaignType } from "../../data/campaign"
import type { PosterType } from "../../data/poster"
import { useState } from "react"
import QRCodeReader from "../QRReader/QRReader"
import { BACKEND_URL } from "../../constants"
import z from "zod"
import { AddPosterInfo } from "../AddPosterInfo/AddPosterInfo"

type Props = {
    campaign: CampaignType
}

function uuidFromUrl(url: string): string {
    if (!url.startsWith(BACKEND_URL + "/scan/")) {
        throw new Error("Invalid URL");
    }
    const uuidString = url.split("/scan/")[1];

    try {
        return z.uuid().parse(uuidString);
    } catch (err) {
        throw new Error("Invalid URL");
    }
}

export function DistributePosters({ campaign }: Props) {

    const [currentPoster, setCurrentPoster] = useState<PosterType | null>(null);

    return (
        <div className={styles.wrapper}>
            <h2>Distributing posters for campaign {campaign.campaignName}</h2>
            {
                !currentPoster &&
                <QRCodeReader onScan={(value: string) => {
                    let matchingPosters: PosterType[];
                    try {
                        const uuid = uuidFromUrl(value);
                        matchingPosters = campaign.posters.filter(p => p.linkUuid === uuid);
                    } catch (err) {
                        alert(err);
                        return;
                    }
                    if (matchingPosters.length !== 1) {
                        alert("Poster not recognised");
                        return;
                    }
                    setCurrentPoster(matchingPosters[0]);
                }} />
            }
            {
                currentPoster &&
                <>
                    <p>Put up poster {currentPoster.linkUuid}</p>
                    <AddPosterInfo poster={currentPoster} handleDone={() => setCurrentPoster(null)}/>
                </>
            }
        </div>
    );
}