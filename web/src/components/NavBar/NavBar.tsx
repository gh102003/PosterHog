import styles from "./NavBar.module.css";
import Button from "../Button";
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
                    <Button key={pageName} onClick={()=>{changePage(pageName)}} type={"secondary"} active={activePage===pageName}>{pageName}</Button>

                ))
            }
            </div>
            <div className={styles.side}></div>

        </div>
    )
}

export default NavBar
