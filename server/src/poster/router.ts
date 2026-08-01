import crypto from "node:crypto";
import express from 'express';
import { prisma } from '../db.ts';
import * as z from "zod";
import type { postersCreateArgs, postersCreateManyInput, postersModel } from "../../prisma/generated/models.ts";

export const router = express.Router();

const creationSchema = z.object({
    count: z.int().positive().max(500).default(1)
})

// Create one or more posters
router.post('/:campaignId/poster', async (req: express.Request<{ campaignId: string }>, res: express.Response) => {

    // check campaign exists
    let campaignId;
    try {
        campaignId = Number(req.params.campaignId);
        await prisma.campaigns.findFirstOrThrow({
            where: { campaign_id: campaignId },
            select: {}
        })
    } catch (error) {
        console.warn(error);
        return res.status(404).json({ error: "Campaign id not found" });
    }

    let numberToGenerate;
    try {
        const body = creationSchema.parse(req.body);
        numberToGenerate = body.count;
    } catch (error) {
        return res.status(400).json({ error });
    }

    const postersToCreate: postersCreateManyInput[] = [];
    for (let i = 0; i < numberToGenerate; i++) {
        postersToCreate.push({
            link_uuid: crypto.randomUUID(),
            campaign_id: campaignId,
        });
    }

    const posters = await prisma.posters.createManyAndReturn({
        data: postersToCreate,
        select: {
            poster_id: true,
            link_uuid: true,
            campaign_id: true,
            location_lat: true,
            location_long: true
        }
    });
    return res.status(201).json({ posters });
})

// Get one poster and its scans
router.get("/:campaignId/poster/:posterId", async (req: express.Request<{ campaignId: string, posterId: string }>, res: express.Response) => {
    let campaignId: number, posterId: number;
    try {
        campaignId = Number(req.params.campaignId);
    } catch (error) {
        console.warn(error);
        return res.status(404).json({ error: "Campaign id invalid" });
    }
    let poster;
    try {
        posterId = Number(req.params.posterId);
        poster = await prisma.posters.findFirstOrThrow({
            where: { poster_id: posterId, campaign_id: campaignId },
            include: { scans: true }
        })
    } catch (error) {
        console.warn(error);
        return res.status(404).json({ error: "Campaign id not found" });
    }
    return res.status(200).json({...poster});
});