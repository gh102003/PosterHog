import { BACKEND_URL } from "../constants";
import axios from "axios";

export function constructScanLink(linkUuid: string): string {
    return `${BACKEND_URL}/scan/${linkUuid}`
}

export async function getByCampaign(campaignId:any): Promise<any> {
    const response = await axios.get(`${BACKEND_URL}/scan/byCampaign/${campaignId}`);
    return response.data;
}
