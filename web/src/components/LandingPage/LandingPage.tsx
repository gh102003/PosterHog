import styles from "./LandingPage.module.css";
import {ANALYTICS_PAGE, CAMPAIGN_PAGE, type PageName} from "../../constants.ts";

interface LandingPageProps {
    changePage: (page:PageName)=>void;
}
function LandingPage({changePage}:LandingPageProps) {
    return (
        <div className={styles.landingPageWrapper}>
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
            <div className={styles.heroWrapper}>
                <h1 className={styles.title}>Poster Hog</h1>
                <p className={styles.intro}>
                    Poster Hog is the poster analytics tool of your dreams.
                    Create a QR code for your campaign, attach it to your poster
                    and watch the analytics come in.
                </p>
                <button onClick={()=>changePage(CAMPAIGN_PAGE)} className={styles.bigNavBtn}>To {CAMPAIGN_PAGE}</button>
                <button onClick={()=>changePage(ANALYTICS_PAGE)} className={styles.bigNavBtn}>To {ANALYTICS_PAGE}</button>
            </div>
        </div>
    )
}

export default LandingPage
