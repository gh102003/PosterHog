import express from 'express';
import { prisma } from '../db.ts';

export const router = express.Router();

router.get('/:link_uuid', (req: express.Request, res: express.Response) => {
    console.log(prisma.campaigns.findMany());
});