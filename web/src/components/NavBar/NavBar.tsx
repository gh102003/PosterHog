import styles from "./NavBar.module.css";
import Button from "../Button";

// interface NavBarProps {
//     toCampaignPage: ()=>void;
//     toAnalyticsPage: () => void;
//
// }

function NavBar() {
    return (
        <div className={styles.navBarWrapper}>
            <div className={styles.side}></div>
            <div className={styles.btnGroup}>
                <Button onClick={()=>{}} type={"secondary"}>Home</Button>
                <Button onClick={()=>{}} type={"secondary"}>Campaign Mode</Button>
                <Button onClick={()=>{}} type={"secondary"}>Analytics</Button>
            </div>
            <div className={styles.side}></div>

        </div>
    )
}

export default NavBar
