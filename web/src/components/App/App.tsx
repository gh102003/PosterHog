import LandingPage from "../LandingPage";
import styles from "./App.module.css";
import AnalyticsPage from "../AnalyticsPage";
import CampaignPage from "../CampaignPage";
import {type JSX, useState} from "react";
import NavBar from "../NavBar";
import {ANALYTICS_PAGE, CAMPAIGN_PAGE, LANDING_PAGE, type PageName} from "../../constants.ts";


function App() {
    const [currentPage, setCurrentPage] = useState<PageName>(LANDING_PAGE);

    function changePage(page: PageName){
        setCurrentPage(page);
    }

    const Pages: Record<PageName, JSX.Element> = {
        [LANDING_PAGE]: (
            <LandingPage
                changePage={changePage}
            />
        ),
        [ANALYTICS_PAGE]: <AnalyticsPage />,
        [CAMPAIGN_PAGE]: <CampaignPage />,
    };

    return (
        <div className={styles.wrapper}>
            <NavBar activePage={currentPage} changePage={changePage}></NavBar>
            <div className={styles.pageWrapper}>
                {Pages[currentPage]}
            </div>
        </div>
    );
}

export default App;