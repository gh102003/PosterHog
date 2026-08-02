import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { constructScanLink } from "../../data/scan";
import type { CampaignType } from "../../data/campaign";
import type { PosterType } from "../../data/poster";
import styles from "./QRCodeItem.module.css";

interface QRCodeItemProps {
    poster: PosterType,
    campaign: CampaignType
}

function getStateDescription(poster: PosterType): string {
    switch (poster.posterState) {
        case "generated":
            return "Not put up yet"
        case "distributed":
            return "Live"
        case "removed":
            return "Taken down"
    }
}

function QRCodeItem({ poster, campaign }: QRCodeItemProps) {

    const link = constructScanLink(poster.linkUuid);

    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        const canvas = canvasRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${campaign.campaignId}-${poster.linkUuid}.png`;
        a.click();
    };

    return (
        <div className={styles.card}>
            <div ref={canvasRef}>
                <QRCodeCanvas value={link} size={140} />
                <a href={link}>Link</a>
            </div>
            <a href={link} className={styles.link}>{poster.linkUuid}</a>
            <button onClick={handleDownload}>
                Download PNG
            </button>
            <p>{getStateDescription(poster)}</p>
            {poster.posterState !== "generated" && <div>
                <p>{poster.locationDescription}</p>
                <p>Latitude {poster.locationLat}, longitude {poster.locationLong}</p>
                <img className={styles.locationImage} src={"data:image/jpeg;base64," + poster.locationPhoto}/>
            </div>
            }
        </div>
    );
}

export default QRCodeItem;