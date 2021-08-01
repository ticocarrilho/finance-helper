const { body } = require('express-validator');

const NAME_EMPTY = 'Name field cannot be empty.';
const NAME_LENGTH = 'Name field cannot have more than 255 characters.';
const EMAIL_EMPTY = 'E-mail field cannot be empty.';
const EMAIL_LENGTH = 'E-mail field cannot have more than 255 characters.';
const EMAIL_INVALID = 'E-mail field must be a valid e-mail.';
const PASSWORD_EMPTY = 'Password field cannot be empty.';
const PASSWORD_MIN_LENGTH = 'Password field cannot have less than 8 characters.';
const PASSWORD_MAX_LENGTH = 'Password field cannot have more than 255 characters.';


module.exports = {
  userRequiredFieldsLogin: [
    body('email')
      .trim().notEmpty().withMessage(EMAIL_EMPTY)
      .bail().isEmail().withMessage(EMAIL_INVALID)
      .bail().isLength({ max: 255 }).withMessage(EMAIL_LENGTH),
    body('password')
      .trim().notEmpty().withMessage(PASSWORD_EMPTY)
      .bail().isLength({ min: 8 }).withMessage(PASSWORD_MIN_LENGTH)
      .bail().isLength({ max: 255 }).withMessage(PASSWORD_MAX_LENGTH),
  ],

  userRequiredFieldsPost: [
    body('name')
      .trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(NAME_LENGTH),
    body('email')
      .trim().notEmpty().withMessage(EMAIL_EMPTY)
      .bail().isEmail().withMessage(EMAIL_INVALID)
      .bail().isLength({ max: 255 }).withMessage(EMAIL_LENGTH),
    body('password')
      .trim().notEmpty().withMessage(PASSWORD_EMPTY)
      .bail().isLength({ min: 8 }).withMessage(PASSWORD_MIN_LENGTH)
      .bail().isLength({ max: 255 }).withMessage(PASSWORD_MAX_LENGTH),
],
  
  userRequiredFieldsPatch: [
    body('name')
      .optional().trim().notEmpty().withMessage(NAME_EMPTY)
      .bail().isLength({ max: 255 }).withMessage(NAME_LENGTH),
    body('email')
      .optional().trim().notEmpty().withMessage(EMAIL_EMPTY)
      .bail().isEmail().withMessage(EMAIL_INVALID)
      .bail().isLength({ max: 255 }).withMessage(EMAIL_LENGTH),
    body('password')
      .optional().trim().notEmpty().withMessage(PASSWORD_EMPTY)
      .bail().isLength({ min: 8 }).withMessage(PASSWORD_MIN_LENGTH)
      .bail().isLength({ max: 255 }).withMessage(PASSWORD_MAX_LENGTH),
  ],
};
