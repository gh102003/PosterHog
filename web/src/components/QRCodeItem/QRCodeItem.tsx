import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeItemProps {
    link: string;
    campaign: string;
    qrCodeId: string;
}

function QRCodeItem({ link, campaign, qrCodeId }:QRCodeItemProps) {
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        const canvas = canvasRef.current?.querySelector('canvas');
        if (!canvas) return;

        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${campaign}-${qrCodeId}.png`;
        a.click();
    };

    return (
        <div>
            <div ref={canvasRef}>
                <QRCodeCanvas value={link} size={140} />
                <a href={link}>Link</a>
            </div>
            <button onClick={handleDownload}>
                Download PNG
            </button>
        </div>
    );
}

export default QRCodeItem;