const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');
const getAuthBearer = require('../../utils/getAuthBearer');

beforeEach(async () => {
  await truncate();
});

describe('PATCH /api/card', () => {
  it('an user should be able to patch it`s card', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        limit: '5.5',
        close_day: 27
      });

    expect(response.status).toBe(200);
  });

  it('an user should not be able to patch another user`s card', async () => {
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
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        limit: '5.5',
        close_day: 27
      });

    expect(response.status).toBe(404);
  });

  it('should not be able to patch a card with an empty name', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: '',
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with an empty bank name', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: '',
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with an empty limit', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.name.findName(),
        limit: '',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with a name larger than 255 characters', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.lorem.words(255),
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with a bank name larger than 255 characters', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with a limit smaller than 1', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '0.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with a close_day smaller than 1', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '1.5',
        close_day: 0
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch a card with a close_day larger than 28', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const card = await factory.create('Card', {
      user_id: user.id
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .patch(`/api/card/${card.id}`)
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '1.5',
        close_day: 29
      });

    expect(response.status).toBe(400);
  });
});
