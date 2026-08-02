import express from 'express';
import { prisma } from '../db.ts';

export const router = express.Router();

router.get('/:linkUuid', async (req: express.Request<{ linkUuid: string }>, res: express.Response) => {
    const link_uuid = req.params.linkUuid;

    let poster;
    try {
        poster = await prisma.posters.findFirst({
            where: { link_uuid },
            include: { campaigns: true }
        });
    } catch (err) {
        console.error(err)
        return res.status(404).json({ error: "Poster not found" });
    }

    if (!poster || !poster.campaigns) {
        return res.status(404).json({ error: "Poster not found" });
    }
    await recordScan(poster.poster_id);
    return res.redirect(302, poster.campaigns.destination);
});

router.get("/byCampaign/:campaignId", async (req: express.Request<{ campaignId: string }>, res: express.Response) => {
    let campaignId;

    try {
        campaignId = Number(req.params.campaignId);
    } catch (err) {
        console.error(err)
        return res.status(400).json({ error: "Campaign id invalid" });
    }

    const posters = await prisma.posters.findMany({
        where: { campaign_id: campaignId },
        omit: {location_photo: true},
        include: {
            scans: true
        }
    })

    return res.status(200).json({posters});

});

async function recordScan(posterId: number) {
    return await prisma.scans.create({
        data: {
            poster_id: posterId,
            time_scanned: new Date()
        }
    })
}