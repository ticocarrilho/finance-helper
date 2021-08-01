const fs = require('fs');
const express = require('express');

const routes = express.Router();

fs.readdirSync(__dirname + '/')
  .forEach((file) => {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
      routes.use('/api', require('./' + file));
    }
  });

module.exports = routes;
