import express from 'express';
import { prisma } from '../db.ts';

export const router = express.Router();

router.get('/:link_uuid', async (req: express.Request, res: express.Response) => {
    const link_uuid = req.params.link_uuid[0];

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

    return res.redirect(301, poster.campaigns.destination);
});