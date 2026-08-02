import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRCodeReaderProps {
  onScan: (value: string) => void;
}

export default function QRCodeReader({
  onScan,
}: QRCodeReaderProps) {
  const html5QrCodeRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    html5QrCodeRef.current = scanner;

    const startScanner = async () => {
      try {
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: {
              width: 250,
              height: 250,
            },
          },
          (decodedText: string) => {
            onScan(decodedText);

            scanner
              .stop()
              .catch((err: unknown) =>
                console.error("Failed to stop scanner:", err)
              );
          },
          () => {
            // Ignore failed scan attempts
          }
        );
      } catch (err) {
        console.error(err);
        setError("Unable to access camera.");
      }
    };

    void startScanner();

    return () => {
      if (html5QrCodeRef.current?.isScanning) {
        void html5QrCodeRef.current
          .stop()
          .then(() => html5QrCodeRef.current?.clear())
          .catch(console.error);
      }
    };
  }, [onScan]);

  return (
    <div>
      <div
        id="qr-reader"
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}