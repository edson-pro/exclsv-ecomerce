import Joi from "joi";

export const discount = Joi.object({
  code: Joi.string(),
  start: Joi.string(),
  end: Joi.string(),
  greater_than: Joi.number(),
  once_usage: Joi.boolean(),
  type: Joi.string(),
  mode: Joi.string(),
  value: Joi.number(),
});
