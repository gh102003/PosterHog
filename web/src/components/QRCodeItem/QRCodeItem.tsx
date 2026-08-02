import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { constructScanLink } from "../../data/scan";
import type { CampaignType } from "../../data/campaign";
import type { PosterType } from "../../data/poster";

interface QRCodeItemProps {
    poster: PosterType,
    campaign: CampaignType
}

function QRCodeItem({ poster, campaign }:QRCodeItemProps) {

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
        <div>
            <div ref={canvasRef}>
                <QRCodeCanvas value={link} size={140} />
            </div>
            <a href={link}>link</a>
            <button onClick={handleDownload}>
                Download PNG
            </button>
        </div>
    );
}

export default QRCodeItem;