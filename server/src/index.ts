import express, { type Express, type Request, type Response } from 'express';
import {router as scanRouter} from "./scan/router.ts";
import {router as campaignRouter} from "./campaign/router.ts";

const app: Express = express();
const port = 3000;

app.use(express.json())

app.use('/scan', scanRouter);
app.use('/campaign', campaignRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});