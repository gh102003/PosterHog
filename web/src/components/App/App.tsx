import LandingPage from "../LandingPage";
import styles from "./App.module.css";
import AnalyticsPage from "../AnalyticsPage";
import CampaignPage from "../CampaignPage";
import {type JSX, useState} from "react";
import NavBar from "../NavBar";
import {ANALYTICS_PAGE, CAMPAIGN_PAGE, LANDING_PAGE} from "../../constants.ts";


function App() {
    const [currentPage, setCurrentPage] = useState<string>(LANDING_PAGE);

    function changePage(page: string){
        setCurrentPage(page);
    }

    const Pages: Record<string, JSX.Element> = {
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
            {Pages[currentPage]}
        </div>
    );
}

export default App;