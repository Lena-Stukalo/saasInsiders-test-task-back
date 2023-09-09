// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('joi');

export const questionSchema = Joi.object({
  question: Joi.string().required(),
});
