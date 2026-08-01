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
        prisma.campaigns.findFirstOrThrow({
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