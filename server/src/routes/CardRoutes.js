const express = require('express');
const CardController = require('../app/controllers/CardController');
const auth = require('../middlewares/auth');
const { cardRequiredFieldsPatch, cardRequiredFieldsPost } = require('./validations/cardValidations');
const { returnValidation } = require('../middlewares/validation');

const routes = express.Router();

routes.use('/card*', auth);

routes.get('/card', CardController.index);
routes.get('/card/:id', CardController.show);
routes.post('/card', cardRequiredFieldsPost, returnValidation, CardController.store);
routes.patch('/card/:id', cardRequiredFieldsPatch, returnValidation, CardController.update);
routes.delete('/card/:id', CardController.delete);

module.exports = routes;
