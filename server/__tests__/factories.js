const faker = require('faker');
const { factory } = require('factory-girl');
const { User, Card } = require('../src/app/models');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(10),
});

factory.define('Card', Card, {
  name: faker.name.findName(),
  bank: faker.random.word(),
  limit: 1000,
  close_day: 1
}, {
  afterCreate: (model, attrs, buildOptions) => {
    model.setUsers(attrs.user_id)
    return model;
  }
});

module.exports = factory;