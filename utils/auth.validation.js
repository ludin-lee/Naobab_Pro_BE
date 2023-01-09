const Joi = require('joi');

exports.loginRequestSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(20).required(),
});
