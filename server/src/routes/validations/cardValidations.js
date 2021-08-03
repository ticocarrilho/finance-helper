const { body } = require('express-validator');

const NAME_EMPTY = 'Name field cannot be empty.';
const NAME_LENGTH = 'Name field cannot have more than 255 characters.';
const BANK_EMPTY = 'Bank name field cannot be empty.';
const BANK_LENGTH = 'Bank name field cannot have more than 255 characters.';
const LIMIT_EMPTY = 'Limit field cannot be empty.';
const LIMIT_INVALID = 'Limit field must be larger than 1,00.';
const CLOSE_DAY_EMPTY = 'Close Day field cannot be empty.';
const CLOSE_DAY_INVALID = 'Close Day field must be between 1 and 28.';

module.exports = {
  cardRequiredFieldsPost: [
    body('name')
      .trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(NAME_LENGTH),
    body('bank')
      .trim().notEmpty().withMessage(BANK_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(BANK_LENGTH),
    body('limit')
      .trim().notEmpty().withMessage(LIMIT_EMPTY)
      .bail().isFloat({ min: 1 }).withMessage(LIMIT_INVALID),
    body('close_day')
      .trim().notEmpty().withMessage(CLOSE_DAY_EMPTY)
      .bail().isInt({ min: 1, max: 28 }).withMessage(CLOSE_DAY_INVALID),
],
  
  cardRequiredFieldsPatch: [
    body('name')
      .optional().trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(NAME_LENGTH),
    body('bank')
      .optional().trim().notEmpty().withMessage(BANK_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(BANK_LENGTH),
    body('limit')
      .optional().trim().notEmpty().withMessage(LIMIT_EMPTY)
      .bail().isFloat({ min: 1 }).withMessage(LIMIT_INVALID),
    body('close_day')
      .optional().trim().notEmpty().withMessage(CLOSE_DAY_EMPTY)
      .bail().isInt({ min: 1, max: 28 }).withMessage(CLOSE_DAY_INVALID),
  ],
};
