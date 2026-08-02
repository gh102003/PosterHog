import axios from 'axios';
import { BACKEND_URL } from "../constants";
import * as z from "zod";

const campaignSchema = z.object({
    campaign_id: z.int(),
    campaign_name: z.string(),
    destination: z.httpUrl(),
    poster_pdf: z.base64().nullable(),
    posters: z.any().array()
}).transform(x => ({
    campaignId: x.campaign_id,
    campaignName: x.campaign_name,
    destination: x.destination,
    posterPdf: x.poster_pdf,
    posters: x.posters
}));

export type CampaignType = z.infer<typeof campaignSchema>;

export async function getCampaigns(): Promise<CampaignType[]> {
    const response = await axios.get(`${BACKEND_URL}/campaign`);
    return campaignSchema.array().parse(response.data.campaigns);
}

export async function getCampaign(id: number) {
    const response = await axios.get(`${BACKEND_URL}/campaign/${id}`);
    return response.data;
}

export async function createCampaign(name: string, destination: string): Promise<CampaignType> {
    const response = await axios.post(`${BACKEND_URL}/campaign`, {
        name,
        destination
    });
    return campaignSchema.parse(response.data.campaign);
}