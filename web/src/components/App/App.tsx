import LandingPage from "../LandingPage";
import styles from "./App.module.css";
import AnalyticsPage from "../AnalyticsPage";
import CampaignPage from "../CampaignPage";
import {type JSX, useState} from "react";
import NavBar from "../NavBar";

type PageKey = "landingPage" | "analyticsPage" | "campaignPage";

function App() {
    const [currentPage, setCurrentPage] = useState<PageKey>("landingPage");

    const Pages: Record<PageKey, JSX.Element> = {
        landingPage: (
            <LandingPage
                toCampaignPage={() => setCurrentPage("campaignPage")}
                toAnalyticsPage={() => setCurrentPage("analyticsPage")}
            />
        ),
        analyticsPage: <AnalyticsPage />,
        campaignPage: <CampaignPage />,
    };

    return (
        <div className={styles.wrapper}>
            <NavBar></NavBar>
            {Pages[currentPage]}
        </div>
    );
}

export default App;