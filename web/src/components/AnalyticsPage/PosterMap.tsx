// npm install pigeon-maps
//
// Usage:
//   <PosterMap selectedCampaignData={campaign} />
//
// Expects selectedCampaignData.posters shaped like your API response:
//   {
//     poster_id, link_uuid, campaign_id,
//     location_lat, location_long, location_description, poster_state,
//     scans: [{ scan_id, poster_id, time_scanned }, ...]
//   }
// Scan count is derived as scans.length.

import { useMemo, useState } from "react";
import { Map as PigeonMap, Marker, Overlay } from "pigeon-maps";

const MIN_RADIUS = 8;
const MAX_RADIUS = 28;
const JITTER_RADIUS_DEG = 0.00006; // small offset so exact-duplicate coords don't fully overlap

function radiusFor(hits, maxHits) {
    if (maxHits === 0) return MIN_RADIUS;
    return MIN_RADIUS + Math.sqrt(hits / maxHits) * (MAX_RADIUS - MIN_RADIUS);
}

function colorFor(hits, maxHits) {
    const t = maxHits === 0 ? 0 : hits / maxHits;
    const r = Math.round(250 - t * 15);
    const g = Math.round(200 - t * 150);
    const b = Math.round(140 - t * 130);
    return `rgb(${r}, ${g}, ${b})`;
}

// Spread out posters that share (near-)identical coordinates in a small
// circle around the shared point, so every marker stays clickable.
function dedupeCoordinates(posters) {
    const groups = new Map();
    posters.forEach((p) => {
        const key = `${p.location_lat.toFixed(6)},${p.location_long.toFixed(6)}`;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(p);
    });

    const result = [];
    groups.forEach((group) => {
        const n = group.length;
        group.forEach((p, i) => {
            if (n === 1) {
                result.push({ ...p, displayLat: p.location_lat, displayLng: p.location_long });
            } else {
                const angle = (2 * Math.PI * i) / n;
                result.push({
                    ...p,
                    displayLat: p.location_lat + JITTER_RADIUS_DEG * Math.sin(angle),
                    displayLng: p.location_long + JITTER_RADIUS_DEG * Math.cos(angle),
                });
            }
        });
    });
    return result;
}

export default function PosterMap({ selectedCampaignData, height = 400 }) {
    const posters = selectedCampaignData?.posters ?? [];

    const [selectedId, setSelectedId] = useState(null);

    const { points, center, maxHits } = useMemo(() => {
        if (posters.length === 0) {
            return { points: [], center: [51.5072, -0.1276], maxHits: 0 };
        }
        const withCounts = posters.map((p) => ({ ...p, num_hits: p.scans?.length ?? 0 }));
        const spread = dedupeCoordinates(withCounts);
        const avgLat = posters.reduce((s, p) => s + p.location_lat, 0) / posters.length;
        const avgLng = posters.reduce((s, p) => s + p.location_long, 0) / posters.length;
        const max = Math.max(...withCounts.map((p) => p.num_hits));
        return { points: spread, center: [avgLat, avgLng], maxHits: max };
    }, [posters]);

    const selected = points.find((p) => p.poster_id === selectedId) ?? null;

    if (!selectedCampaignData) return null;

    return (
        <div style={{ position: "relative", width: "100%", height, marginTop:"20px" }}>
            <PigeonMap height={height} defaultCenter={center} defaultZoom={17}>
                {points.map((p) => {
                    const size = radiusFor(p.num_hits, maxHits) * 2;
                    return (
                        <Marker
                            key={p.poster_id}
                            anchor={[p.displayLat, p.displayLng]}
                            width={size}
                            onClick={() => setSelectedId(selectedId === p.poster_id ? null : p.poster_id)}
                        >
                            <div
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: "50%",
                                    background: colorFor(p.num_hits, maxHits),
                                    border: p.poster_state === "distributed" ? "1px solid #7a2e1a" : "1px dashed #999",
                                    opacity: 0.85,
                                    cursor: "pointer",
                                }}
                            />
                        </Marker>
                    );
                })}

                {selected && (
                    <Overlay anchor={[selected.displayLat, selected.displayLng]} offset={[0, 10]}>
                        <div
                            style={{
                                background: "white",
                                borderRadius: 8,
                                padding: "8px 12px",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                                fontSize: 13,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <strong>{selected.location_description}</strong>
                            <br />
                            {selected.num_hits.toLocaleString()} scan{selected.num_hits === 1 ? "" : "s"}
                            {" · "}
                            {selected.poster_state}
                            <br />
                            <span style={{ color: "#666" }}>
                {selected.location_lat.toFixed(6)}, {selected.location_long.toFixed(6)}
              </span>
                        </div>
                    </Overlay>
                )}
            </PigeonMap>
        </div>
    );
}