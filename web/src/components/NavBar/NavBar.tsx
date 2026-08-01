import styles from "./NavBar.module.css";
import {PAGE_NAMES, type PageName} from "../../constants.ts";

interface NavBarProps {
    activePage: PageName;
    changePage: (page: PageName) => void;
}

function NavBar({activePage, changePage}: NavBarProps) {
    return (
        <div className={styles.navBarWrapper}>
            <div className={styles.side}></div>
            <div className={styles.btnGroup}>
                {
                    PAGE_NAMES.map((pageName) => (
                        <button onClick={()=>{changePage(pageName)}} className={`${styles.navBtn} ${activePage===pageName && styles.activeBtn}`}>{pageName}</button>

                    ))
                }
            </div>
            <div className={styles.side}></div>

        </div>
    )
}

export default NavBar
