import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface QRCodeItemProps {
    link: string;
    campaign: string;
    qrCodeId: string;
}

function QRCodeItem({ link, campaign, qrCodeId }: QRCodeItemProps) {
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleDownload = () => {
        const sourceCanvas = canvasRef.current?.querySelector('canvas');
        if (!sourceCanvas) return;

        const padding = 10;
        const textHeight = 48;
        const size = sourceCanvas.width;
        const text = qrCodeId;

        // Create a new canvas that's a bit taller, to fit the text
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = size;
        exportCanvas.height = size + textHeight + padding;

        const ctx = exportCanvas.getContext('2d');
        if (!ctx) return;

        // White background (canvas is transparent by default;
        // PNGs with transparency can look odd when the text sits on it)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

        // Draw the QR code onto the new canvas
        ctx.drawImage(sourceCanvas, 0, 0);

        // Draw the link text below it
        ctx.fillStyle = '#000000';
        ctx.font = '24px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(text, size / 2, size + textHeight);

        const url = exportCanvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = `qr-${campaign}-${qrCodeId}.png`;
        a.click();
    };

    return (
        <div>
            <div ref={canvasRef}>
                <QRCodeCanvas value={link} size={140} />
            </div>
            <button onClick={handleDownload}>
                Download PNG
            </button>
        </div>
    );
}

export default QRCodeItem;