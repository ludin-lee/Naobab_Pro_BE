const Joi = require('joi');

exports.loginRequestSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
