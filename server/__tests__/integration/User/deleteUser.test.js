const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('DELETE /api/user', () => {
  it('should be able to delete an user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .delete(`/api/user/${user.id}`);

    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to delete an user that does not exists', async () => {
    const response = await request(app)
      .delete('/api/user/3451');

    expect(response.status).toBe(404);
  });
});
