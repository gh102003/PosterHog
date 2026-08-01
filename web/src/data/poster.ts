import axios from 'axios';
import { BACKEND_URL } from "../constants";

export async function createPosters(campaignId: number, count: number) {
    const response = await axios.post(`${BACKEND_URL}/campaign/${campaignId}/poster`, {
        count
    });
    return response.data;
}

export async function getPoster(campaignId: number, posterId: number) {
    const response = await axios.get(`${BACKEND_URL}/campaign/${campaignId}/poster/${posterId}`);
    return response.data;
}