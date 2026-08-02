import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { constructScanLink } from "../../data/scan";
import type { CampaignType } from "../../data/campaign";
import type { PosterType } from "../../data/poster";
import styles from "./QRCodeItem.module.css";
import { MapWithPoint } from "./Map";

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

    if (!poster.posterState) {
        poster.posterState = 'generated'
    }

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
            <div ref={canvasRef} className={styles.qrCanvasWrapper}>
                <QRCodeCanvas className={styles.qrCanvas} value={link} size={140} marginSize={2} />
            </div>
            <a href={link} className={styles.link} target="_blank" rel="noreferrer">{poster.linkUuid}</a>
            <button onClick={handleDownload}>
                Download PNG
            </button>
            <p className={styles.status} data-status={poster.posterState}>{getStateDescription(poster)}</p>
            {poster.posterState !== "generated" && <>
                <p>{poster.locationDescription}</p>
                {/* <p>Latitude {poster.locationLat}, longitude {poster.locationLong}</p> */}
                {poster.locationLat && poster.locationLong && <MapWithPoint lat={poster.locationLat} long={poster.locationLong}/>}
                {poster.locationPhoto && <img className={styles.locationImage} src={"data:image/jpeg;base64," + poster.locationPhoto}/>}
            </>
            }
        </div>
    );
}

export default QRCodeItem;