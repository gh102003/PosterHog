import styles from "./CampaignPage.module.css"
import {Collapsible} from "radix-ui";

import QRCodeItem from "../QRCodeItem";

function CampaignPage() {
    const links = [
        "https://en.wikipedia.org/wiki/Charles_Babbage",
        "https://en.wikipedia.org/wiki/Ada_Lovelace",
        "https://en.wikipedia.org/wiki/Aquilegia",
        "https://en.wikipedia.org/wiki/Nectar_spur",
        "https://en.wikipedia.org/wiki/Pollinator"
    ]
    return (
        <div className={styles.wrapper}>
            <div className={styles.campaignWrapper}>
                <Collapsible.Root>
                    <Collapsible.Trigger className={styles.campaignTitle}>campaign-1</Collapsible.Trigger>
                    <Collapsible.Content className={styles.campaignContent}>
                        <div className={styles.qrCodesWrapper}>
                            {links.map((link, i) => (
                                    <QRCodeItem link={link} campaign={"campaign-1"} qrCodeId={i.toString()} key={i}/>
                            ))}
                            <button className={styles.generateNewQrButton}>+</button>
                        </div>
                    </Collapsible.Content>
                </Collapsible.Root>
            </div>

        </div>
    )
}

export default CampaignPage
