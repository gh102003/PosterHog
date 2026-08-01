import express, { type Express, type Request, type Response } from 'express';
import {router as scanRouter} from "./scan/router.ts";

const app: Express = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/scan', scanRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});