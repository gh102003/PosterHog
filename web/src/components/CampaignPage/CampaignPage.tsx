import React from "react";
import styles from "./CampaignPage.module.css"
import Button from "../Button";
import {Collapsible} from "radix-ui";

import {QRCodeSVG} from 'qrcode.react';

function CampaignPage() {
    const [currentCampaign, setCurrentCampaign] = React.useState();
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
                    <Collapsible.Trigger className={styles.campaignTitle}> Campaign 1</Collapsible.Trigger>
                    <Collapsible.Content className={styles.campaignContent}>
                        <div className={styles.qrCodesWrapper}>
                            {links.map((link, i) => (
                                    <QRCodeSVG value={link} size={140} key={i}/>
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
