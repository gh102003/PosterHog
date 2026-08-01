import styles from "./LandingPage.module.css";
import Button from "../Button";
import {CAMPAIGN_PAGE, ANALYTICS_PAGE} from "../../constants.ts";

interface LandingPageProps {
    changePage: (pageName: string) => void;

}

function LandingPage({changePage}:LandingPageProps) {
    return (
        <>
            <div className={styles.heroWrapper}>
                <h1 className={styles.title}>Post Hog</h1>
                <div className={styles.buttonWrapper}>
                    <Button onClick={()=>changePage(CAMPAIGN_PAGE)} type={"primary"}>{CAMPAIGN_PAGE}</Button>
                    <Button onClick={()=>changePage(ANALYTICS_PAGE)} type={"primary"}>{ANALYTICS_PAGE}</Button>
                </div>
            </div>
        </>
    )
}

export default LandingPage
