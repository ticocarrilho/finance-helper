const request = require('supertest');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');
const getAuthBearer = require('../../utils/getAuthBearer');

beforeEach(async () => {
  await truncate();
});

describe('DELETE /api/card', () => {
  it('an user should be able to delete its card', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });
    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .delete(`/api/card/${card.id}`)
      .set('Authorization', authBearer);

    expect(response.status).toBe(204);
  });

  it('an user should not be able to delete another user`s card', async () => {
    const userA = await factory.create('User', {
      email: 'email@live.com',
      password: '12345678'
    });
    const userB = await factory.create('User', {
      email: 'email@gmail.com',
      password: '12345678'
    });
    const card = await factory.create('Card', {
      user_id: userA.id
    });

    const authBearer = await getAuthBearer(userB.email, '12345678');
    const response = await request(app)
      .delete(`/api/card/${card.id}`)
      .set('Authorization', authBearer);

    expect(response.status).toBe(404);
  });

  it('should return 404 when trying to delete a card that does not exists', async () => {
    const userA = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(userA.email, '12345678');
    const response = await request(app)
      .delete('/api/card/3451')
      .set('Authorization', authBearer);

    expect(response.status).toBe(404);
  });
});
