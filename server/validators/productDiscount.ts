import Joi from "joi";

export const productDiscount = Joi.object({
  start: Joi.string(),
  end: Joi.string(),
  type: Joi.string(),
  value: Joi.number(),
});
