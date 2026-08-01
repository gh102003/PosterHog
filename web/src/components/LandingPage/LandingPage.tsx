import styles from "./LandingPage.module.css";
import Button from "../Button";

interface LandingPageProps {
    toCampaignPage: ()=>void;
    toAnalyticsPage: () => void;

}

function LandingPage({toCampaignPage, toAnalyticsPage}:LandingPageProps) {
    return (
        <>
            <div className={styles.heroWrapper}>
                <h1 className={styles.title}>Post Hog</h1>
                <div className={styles.buttonWrapper}>
                    <Button onClick={()=>{toCampaignPage()}}>Campaigns</Button>
                    <Button onClick={()=>{toAnalyticsPage()}}>Analytics</Button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
