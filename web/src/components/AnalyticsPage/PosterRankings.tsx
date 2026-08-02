import styles from "./AnalyticsPage.module.css";

function PosterRankings({selectedCampaignData}:{selectedCampaignData:any}) {
    if(selectedCampaignData===null) return;

    let posterRankings = selectedCampaignData.posters.map(poster=>{return{name:poster.location_description, scans:poster.scans.length}})
    posterRankings.sort((a,b)=>b.scans - a.scans);

    return(
        <div className={styles.posterRankings}>{
        posterRankings.map(poster=>
            <p className={styles.posterRank}><span className={styles.posterName}>{poster.name} :</span> {poster.scans}</p>
        )
    }</div>
    );

}

export default PosterRankings;