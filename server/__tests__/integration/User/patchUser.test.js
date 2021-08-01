const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('PATCH /api/user', () => {
  it('should be able to patch an user', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        name: 'user',
        email: 'email@email.com'
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('user');
    expect(response.body.email).toBe('email@email.com');
  });

  it('should not be able to patch an user with an exisiting email', async () => {
    const userA = await factory.create('User');
    const userB = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${userA.id}`)
      .send({
        email: userB.email
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an user with a name larger than 255 characters', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        name: faker.lorem.words(255),
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an user with an empty email', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        email: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an user with a invalid email', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        email: 'email'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an user with an empty password', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        password: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to patch an user with a password with less than 8 characters', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .patch(`/api/user/${user.id}`)
      .send({
        password: 'pass'
      });

    expect(response.status).toBe(400);
  });

  it('should return 404 when trying to patch an user that does not exists', async () => {
    const response = await request(app)
      .patch('/api/user/3451');

    expect(response.status).toBe(404);
  });
});
