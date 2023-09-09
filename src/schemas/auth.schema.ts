// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

export const userSchemaReg = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
export const userSchemaLog = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
