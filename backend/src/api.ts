import { Request, Response, Router } from 'express';

import { getItems, setItems } from './data';

export const apiRouter = Router();

apiRouter.get('/items', (req: Request, res: Response) => {
  res.json(getItems());
});

apiRouter.post('/items', (req: Request, res: Response) => {
  if (!req.body.id) {
    res.status(400).json({ error: 'Id is required' });
    return;
  }

  if (!req.body.description) {
    res.status(400).json({ error: 'Description is required' });
    return;
  }

  setItems([...getItems(), req.body]);
  res.json(req.body);
});

apiRouter.delete('/items/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({ error: ' Id must be a number' });
    return;
  }
  const newItems = getItems().filter((i) => i.id !== id);
  if (newItems.length === getItems().length) {
    res.status(404).json({ error: `Item with id [${id}] not found` });
    return;
  }
  setItems(newItems);
  res.json({ result: `Item with id [${id}] deleted` });
});
