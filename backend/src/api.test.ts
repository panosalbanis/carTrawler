import request from 'supertest';
import express from 'express';

import { apiRouter } from './api';
import { init } from './data';

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

beforeEach(() => {
  init();
});

describe('api', () => {
  describe('GET', () => {
    test('Responds with a list of all items', async () => {
      const response = await request(app).get('/api/items');
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });
  });

  describe('POST', () => {
    test('Adds an item to the list given it is valid', async () => {
      const response = await request(app)
        .post('/api/items')
        .type('application/json')
        .send({
          id: 3,
          description: 'Do the dishes',
        });
      expect(response.statusCode).toEqual(200);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
        {
          id: 3,
          description: 'Do the dishes',
        },
      ]);
    });

    test('Responds with a 400 AND does not add if the item given has NO id', async () => {
      const response = await request(app)
        .post('/api/items')
        .type('application/json')
        .send({
          description: 'Do the dishes',
        });
      expect(response.statusCode).toEqual(400);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });

    test('Responds with a 400 AND does not add if the item given has NO description', async () => {
      const response = await request(app)
        .post('/api/items')
        .type('application/json')
        .send({
          id: 3,
        });
      expect(response.statusCode).toEqual(400);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });
  });

  describe('DELETE', () => {
    test('Deletes an item if a valid id is given and the item exists', async () => {
      const response = await request(app).delete('/api/items/1');
      expect(response.statusCode).toBe(200);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });

    test('Responds with a 400 if the id is not a number', async () => {
      const response = await request(app).delete('/api/items/one');
      expect(response.statusCode).toBe(400);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });

    test('Responds with a 404 if the id does not exist', async () => {
      const response = await request(app).delete('/api/items/3');
      expect(response.statusCode).toBe(404);
      const GetItemsResponse = await request(app).get('/api/items');
      expect(GetItemsResponse.body).toEqual([
        { id: 1, description: 'Prepare for exam' },
        { id: 2, description: 'Solve practice exercises' },
      ]);
    });
  });
});
