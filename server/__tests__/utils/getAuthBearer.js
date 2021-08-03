const request = require('supertest');
const app = require('../../src/app');

module.exports = async (email, password) => {
  const response = await request(app)
    .post('/api/user/login')
    .send({
      email: email,
      password: password,
    });
  
  return `Bearer ${response.body.token}`;
};