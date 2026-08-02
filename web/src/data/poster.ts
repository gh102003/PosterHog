import axios from 'axios';
import { BACKEND_URL } from "../constants";
import * as z from "zod";

export const posterSchema = z
    .object({
        poster_id: z.number().int(),
        link_uuid: z.uuid(),
        campaign_id: z.number().int(),
        location_lat: z.number().nullable(),
        location_long: z.number().nullable(),
        location_photo: z.base64().nullable(),
        location_description: z.string().nullable(),
        poster_state: z.enum([
            "generated",
            "distributed",
            "removed",
        ]).default('generated'),
    })
    .transform((poster) => ({
        posterId: poster.poster_id,
        linkUuid: poster.link_uuid,
        campaignId: poster.campaign_id,
        locationLat: poster.location_lat,
        locationLong: poster.location_long,
        locationPhoto: poster.location_photo,
        locationDescription: poster.location_description,
        posterState: poster.poster_state,
    }));

export type PosterType = z.infer<typeof posterSchema>;

export async function createPosters(campaignId: number, count: number) {
    const response = await axios.post(`${BACKEND_URL}/campaign/${campaignId}/poster`, {
        count
    });
    return response.data.posters;
}

export async function getPoster(campaignId: number, posterId: number): Promise<PosterType> {
    const response = await axios.get(`${BACKEND_URL}/campaign/${campaignId}/poster/${posterId}`);
    return response.data;
}

export async function updatePoster(campaignId: number, posterId: number, poster: Partial<PosterType>) {
    const response = await axios.put(`${BACKEND_URL}/campaign/${campaignId}/poster/${posterId}`, {
        location_lat: poster.locationLat,
        location_long: poster.locationLong,
        location_photo: poster.locationPhoto,
        location_description: poster.locationDescription,
        poster_state: poster.posterState
    });
    return response.data;
}