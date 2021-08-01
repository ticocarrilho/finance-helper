const request = require('supertest');
const faker = require('faker');
const app = require('../../../src/app');
const truncate = require('../../utils/truncate');
const factory = require('../../factories');

beforeEach(async () => {
  await truncate();
});

describe('POST /api/user', () => {
  it('should be able to create an user', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to create an user with an existing e-mail', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: user.email,
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user with an empty name', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: '',
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user without name parameter', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user with an empty email', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: '',
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user without email parameter', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user with an empty password', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user with a password with less than 8 characters', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: 'pass'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user without password parameter', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.name.findName(),
        email: faker.internet.email(),
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create an user with a name larger than 255 characters', async () => {
    const response = await request(app)
      .post('/api/user')
      .send({
        name: faker.lorem.words(255),
        email: faker.internet.email(),
        password: faker.internet.password()
      });

    expect(response.status).toBe(400);
  });

  it('should be able to login an user with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: user.email,
        password: '12345678'
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to login an user with an invalid email credential', async () => {
    const user = await factory.create('User', {
      email: 'test@test.com',
      password: '12345678'
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: user.email + '.br',
        password: '12345678'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to login an user with an invalid password credential', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: user.email,
        password: '12345679'
      });

    expect(response.status).toBe(400);
  });


  it('should not be able to login an user with an empty email parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: '',
        password: '12345678'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to login an user without an email parameter', async () => {
    const user = await factory.create('User', {
      password: '12345678'
    });

    const response = await request(app)
      .post('/api/user/login')
      .send({
        password: '12345678'
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to login an user with an empty password parameter', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: user.email,
        password: ''
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to login an user without a password parameter', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: user.email
      });

    expect(response.status).toBe(400);
  });
});
