const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');
const getAuthBearer = require('../../utils/getAuthBearer');

beforeEach(async () => {
  await truncate();
});

describe('POST /api/card', () => {
  it('should be able to create a card', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to create a card with an empty name', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: '',
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card without name parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with an empty bank name', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: '',
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card without bank parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with an empty limit', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.name.findName(),
        limit: '',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card without limit parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.name.findName(),
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card without close_day parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.name.findName(),
        limit: '1.5',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with a name larger than 255 characters', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.lorem.words(255),
        bank: faker.name.findName(),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with a bank name larger than 255 characters', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '1.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with a limit smaller than 1', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '0.5',
        close_day: 1
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with a close_day smaller than 1', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
      .set('Authorization', authBearer)
      .send({
        name: faker.name.findName(),
        bank: faker.lorem.words(255),
        limit: '1.5',
        close_day: 0
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a card with a close_day larger than 28', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const authBearer = await getAuthBearer(user.email, '12345678');
    const response = await request(app)
      .post('/api/card')
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
