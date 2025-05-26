import express, { Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import { readFileSync } from 'fs';
import cors from 'cors';

import { apiRouter } from './api';

const specJson = readFileSync(
  path.join(process.cwd(), 'spec/open-api-spec.json')
);

const spec = JSON.parse(specJson.toString());

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(spec));

// Anything not stated above is a 404
app.use((req: Request, res: Response) => {
  res.status(404).send('Not found');
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
