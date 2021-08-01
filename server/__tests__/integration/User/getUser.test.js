const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('GET /api/user', () => {
  it('should be able to get all users', async () => {
    const names = ['user1', 'user2', 'user3'];

    await Promise.all(names.map(async (name) => {
      await factory.create('User', {
        name
      });
    }));

    const response = await request(app)
      .get('/api/user');

    expect(response.body).toHaveLength(names.length);
  });

  it('should be able to get an user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get(`/api/user/${user.id}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(user.name);
  });


  it('should return 404 when trying to get an user that does not exists', async () => {
    const response = await request(app)
      .get('/api/user/3451');

    expect(response.status).toBe(404);
  });
});
