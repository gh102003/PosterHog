import express, { type Express, type Request, type Response } from 'express';
import cors from "cors";
import { router as scanRouter } from "./scan/router.ts";
import { router as campaignRouter } from "./campaign/router.ts";

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json({limit: '10mb'}))

app.use('/scan', scanRouter);
app.use('/campaign', campaignRouter);

app.listen(port, () => {
  console.log(`PosterHog server listening on port ${port}`);
});