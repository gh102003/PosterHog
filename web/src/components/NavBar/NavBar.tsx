import styles from "./NavBar.module.css";
import {PAGE_NAMES, type PageName} from "../../constants.ts";

import { Collapsible } from "radix-ui";
import { Menu } from 'feather-icons-react';


interface NavBarProps {
    activePage: PageName;
    changePage: (page: PageName) => void;
}
interface NavBarBtnGroupProps {
    btnStyle: string,
    activePage: PageName;
    changePage: (page: PageName) => void;

}

function NavBarBtnGroup({btnStyle, activePage, changePage}: NavBarBtnGroupProps) {
    return (<>
        {PAGE_NAMES.map((pageName) =>
            <button
                key={pageName}
                onClick={() => changePage(pageName)}
                className={`
                    ${styles.navBtn} 
                    ${btnStyle} 
                    ${activePage === pageName && styles.activeBtn}
                `}
            >
                {pageName}
            </button>
        )}
    </>);
}

function NavBar({activePage, changePage}: NavBarProps) {
    return (
        <div className={styles.navBarWrapper}>
            <div className={styles.desktopNavBar}>
                <div className={styles.side}></div>
                <div className={styles.btnGroup}>
                    <NavBarBtnGroup btnStyle={styles.desktopNavBtn} activePage={activePage} changePage={changePage} />
                </div>
                <div className={styles.side}></div>
            </div>
            <div className={styles.mobileNavBar}>
                <Collapsible.Root>
                    <Collapsible.Trigger className={styles.mobileMenuBtn}><Menu size={"36"} color={"white"}/></Collapsible.Trigger>
                    <Collapsible.Content className={styles.mobileNavBarBtnGroup}>
                        <NavBarBtnGroup btnStyle={styles.mobileNavBtn} activePage={activePage} changePage={changePage} />
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>


        </div>
    )
}

export default NavBar
