import request from 'supertest';
import { app } from '../../../../src/app';

const BASE_ROUTE = '/v1/games';

describe('Games API Routes', () => {
  const testGame = {
    id: 'test-api-game',
    name: 'API Test Game',
    releaseYear: 2024,
    publisher: 'Test Publisher',
    type: 'BaseGame',
  };

  afterAll(async () => {
    // Clean up test doc if it still exists
    await request(app).delete(`${BASE_ROUTE}/${testGame.id}`);
  });

  it('POST /v1/games → creates a new game', async () => {
    const res = await request(app).post(BASE_ROUTE).send(testGame);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Game created');
    expect(res.body.id).toBe(testGame.id);
  });

  it('GET /v1/games → includes the created game', async () => {
    const res = await request(app).get(BASE_ROUTE);
    expect(res.status).toBe(200);
    const found = res.body.find((g: any) => g.id === testGame.id);
    expect(found).toBeDefined();
    expect(found.name).toBe('API Test Game');
  });

  it('PUT /v1/games/:id → updates an existing game', async () => {
    const updated = { ...testGame, name: 'Updated Name' };
    const res = await request(app).put(`${BASE_ROUTE}/${testGame.id}`).send(updated);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Game updated');

    const getRes = await request(app).get(BASE_ROUTE);
    const match = getRes.body.find((g: any) => g.id === testGame.id);
    expect(match.name).toBe('Updated Name');
  });

  it('DELETE /v1/games/:id → deletes the game', async () => {
    const res = await request(app).delete(`${BASE_ROUTE}/${testGame.id}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Game deleted');

    const getRes = await request(app).get(BASE_ROUTE);
    const match = getRes.body.find((g: any) => g.id === testGame.id);
    expect(match).toBeUndefined();
  });
});
