import express from 'express';
import { prisma } from '../db.ts';
import * as z from "zod";
import {router as posterRouter} from "../poster/router.ts";

export const router = express.Router();

// Get all campaigns
router.get('/', async (req: express.Request, res: express.Response) => {

    const campaigns = await prisma.campaigns.findMany({
        select: {
            campaign_id: true,
            campaign_name: true,
            destination: true
        }
    })
    return res.status(200).json({ campaigns });
})

// Get one campaign
router.get('/:campaignId', async (req: express.Request<{ campaignId: string }>, res: express.Response) => {

    let campaignId: number;
    try {
        campaignId = Number(req.params.campaignId)
    } catch (error) {
        return res.status(400).json({ error: "Invalid or missing campaign id" });
    }

    const campaign = await prisma.campaigns.findFirst({
        where: {
            campaign_id: campaignId
        },
        include: {
            posters: true
        }
    });

    if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
    }

    return res.status(200).json({ ...campaign });
})

const creationSchema = z.object({
    name: z.string(),
    destination: z.httpUrl()
});

router.post('/', async (req: express.Request, res: express.Response) => {

    let body: z.infer<typeof creationSchema>;
    try {
        body = creationSchema.parse(req.body);
    } catch (error) {
        return res.status(400).json({ error });
    }

    const campaign = await prisma.campaigns.create({
        data: {
            campaign_name: body.name,
            destination: body.destination
        }
    });
    return res.status(201).json({ campaign });
})

router.use(posterRouter);