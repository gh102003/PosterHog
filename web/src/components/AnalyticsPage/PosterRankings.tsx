import styles from "./AnalyticsPage.module.css";

interface Scan {
    poster_id: number;
    scan_id: number;
    time_scanned: string;
}


interface Poster {
    location_description: string;
    scans: Scan[];
}

interface CampaignData {
    posters: Poster[];
}

interface PosterRanking {
    name: string;
    scans: number;
}

interface PosterRankingsProps {
    selectedCampaignData: CampaignData | null;
}

function PosterRankings({ selectedCampaignData }: PosterRankingsProps) {
    if (selectedCampaignData === null) return null;

    const posterRankings: PosterRanking[] = selectedCampaignData.posters.map((poster) => {
        return { name: poster.location_description, scans: poster.scans.length };
    });

    posterRankings.sort((a, b) => b.scans - a.scans);

    return (
        <div className={styles.posterRankings}>
            {posterRankings.map((poster) => (
                <p key={poster.name} className={styles.posterRank}>
                    <span className={styles.posterName}>{poster.name} :</span> {poster.scans}
                </p>
            ))}
        </div>
    );
}

export default PosterRankings;