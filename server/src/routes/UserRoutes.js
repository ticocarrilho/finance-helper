const express = require('express');
const UserController = require('../app/controllers/UserController');
const { userRequiredFieldsPatch, userRequiredFieldsPost, userRequiredFieldsLogin } = require('./validations/userValidations');
const { returnValidation } = require('../middlewares/validation');

const routes = express.Router();

routes.get('/user', UserController.index);
routes.get('/user/:id', UserController.show);
routes.post('/user/login', userRequiredFieldsLogin, returnValidation, UserController.login);
routes.post('/user', userRequiredFieldsPost, returnValidation, UserController.store);
routes.patch('/user/:id', userRequiredFieldsPatch, returnValidation, UserController.update);
routes.delete('/user/:id', UserController.delete);

module.exports = routes;
