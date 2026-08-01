import express from 'express';
import { prisma } from '../db.ts';

export const router = express.Router();

router.get('/:linkUuid', async (req: express.Request<{linkUuid: string}>, res: express.Response) => {
    const link_uuid = req.params.linkUuid;

    let poster;
    try {
        poster = await prisma.posters.findFirst({
            where: { link_uuid },
            include: { campaigns: true }
        });
    } catch(err) {
        console.error(err)
        return res.status(404).json({ error: "Poster not found" });
    }

    if (!poster || !poster.campaigns) {
        return res.status(404).json({ error: "Poster not found" });
    }

    recordScan(poster.poster_id)

    return res.redirect(301, poster.campaigns.destination);
});

async function recordScan(posterId: number) {
    return await prisma.scans.create({
        data: {
            poster_id: posterId,
            time_scanned: new Date()
        }
    })
}